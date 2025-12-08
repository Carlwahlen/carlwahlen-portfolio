"""
AI Navigation AI Service
FastAPI service for AI/LLM operations using Ollama
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Navigation AI Service")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama2")  # Default model, can be customized per tenant


class IntentDetectionRequest(BaseModel):
    input: str
    tenant_id: str
    available_intents: List[str]
    content_index: List[Dict[str, Any]]
    user_context: Dict[str, Any]


class IntentDetectionResponse(BaseModel):
    intent: str
    confidence: float
    reasoning: Optional[str] = None


class GenerateResponseRequest(BaseModel):
    intent: str
    current_step: Optional[Dict[str, Any]] = None
    flow: Dict[str, Any]
    user_context: Dict[str, Any]
    content_index: List[Dict[str, Any]]


class GenerateResponseResponse(BaseModel):
    message: str
    suggested_actions: Optional[List[str]] = None


def get_model_for_tenant(tenant_id: str) -> str:
    """Get the appropriate model for a tenant (can be customized per tenant)"""
    # In the future, this could fetch from a database
    # For now, use default or tenant-specific model from env
    tenant_model = os.getenv(f"OLLAMA_MODEL_{tenant_id.upper()}", OLLAMA_MODEL)
    return tenant_model


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test Ollama connection
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
            if response.status_code == 200:
                models_data = response.json()
                return {
                    "status": "healthy",
                    "ollama_connected": True,
                    "available_models": [model["name"] for model in models_data.get("models", [])]
                }
            else:
                return {
                    "status": "unhealthy",
                    "ollama_connected": False,
                    "error": f"Ollama returned status {response.status_code}"
                }
    except Exception as e:
        return {
            "status": "unhealthy",
            "ollama_connected": False,
            "error": str(e)
        }


@app.post("/detect-intent", response_model=IntentDetectionResponse)
async def detect_intent(request: IntentDetectionRequest):
    """
    Detect user intent from natural language input using Ollama
    """
    try:
        model = get_model_for_tenant(request.tenant_id)
        
        # Build context for the LLM
        available_intents_str = ", ".join(request.available_intents)
        content_summary = "\n".join([
            f"- {item.get('title', 'Unknown')}: {item.get('description', '')[:100]}"
            for item in request.content_index[:10]  # Limit to first 10 for context
        ])
        
        prompt = f"""You are an AI assistant that helps users navigate complex websites by understanding their intent.

Available intents: {available_intents_str}

User query: "{request.input}"

Based on the user's query, determine their intent. Respond with ONLY one of these intents: {available_intents_str}

If the user wants to contact someone or get contact information, respond with: contact_support
If the user wants to find information, read about something, or explore content, respond with: find_information

Respond with ONLY the intent name, nothing else."""

        # Call Ollama via HTTP API
        async with httpx.AsyncClient(timeout=30.0) as client:
            ollama_response = await client.post(
                f"{OLLAMA_BASE_URL}/api/generate",
                json={
                    "model": model,
                    "prompt": prompt,
                    "options": {
                        "temperature": 0.3,  # Lower temperature for more deterministic intent detection
                        "top_p": 0.9,
                    },
                    "stream": False,
                }
            )
            ollama_response.raise_for_status()
            response_data = ollama_response.json()
        
        detected_intent = response_data.get("response", "").strip().lower()
        
        # Validate intent
        if detected_intent not in request.available_intents:
            # Fallback to find_information if intent not recognized
            detected_intent = "find_information"
            confidence = 0.5
        else:
            confidence = 0.85  # High confidence when intent is recognized
        
        return IntentDetectionResponse(
            intent=detected_intent,
            confidence=confidence,
            reasoning=response_data.get("response", "")[:200] if len(response_data.get("response", "")) > 50 else None
        )
        
    except Exception as e:
        # Fallback to find_information on error
        return IntentDetectionResponse(
            intent="find_information",
            confidence=0.5,
            reasoning=f"Error: {str(e)}"
        )


@app.post("/generate-response", response_model=GenerateResponseResponse)
async def generate_response(request: GenerateResponseRequest):
    """
    Generate a natural language response based on intent and context
    """
    try:
        model = get_model_for_tenant(request.user_context.get("tenant_id", "default"))
        
        # Build context
        step_info = ""
        if request.current_step:
            step_info = f"Current step: {request.current_step.get('title', '')} - {request.current_step.get('description', '')}"
        
        flow_info = f"Flow: {request.flow.get('title', 'Unknown flow')}"
        
        prompt = f"""You are a helpful AI assistant guiding users through a website navigation system.

{flow_info}
{step_info}

User intent: {request.intent}

Generate a friendly, concise message (1-2 sentences) that guides the user to their destination. Be natural and helpful.

Response:"""

        # Call Ollama via HTTP API
        async with httpx.AsyncClient(timeout=30.0) as client:
            ollama_response = await client.post(
                f"{OLLAMA_BASE_URL}/api/generate",
                json={
                    "model": model,
                    "prompt": prompt,
                    "options": {
                        "temperature": 0.7,  # Slightly higher for more natural responses
                        "top_p": 0.9,
                    },
                    "stream": False,
                }
            )
            ollama_response.raise_for_status()
            response_data = ollama_response.json()
        
        message = response_data.get("response", "").strip()
        
        # Clean up the message
        if message.startswith('"') and message.endswith('"'):
            message = message[1:-1]
        
        suggested_actions = None
        if request.current_step:
            suggested_actions = ["Continue", "Skip"]
        
        return GenerateResponseResponse(
            message=message,
            suggested_actions=suggested_actions
        )
        
    except Exception as e:
        # Fallback response
        return GenerateResponseResponse(
            message="I'll help you navigate. Let me guide you to the right page.",
            suggested_actions=request.current_step and ["Continue", "Skip"]
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

