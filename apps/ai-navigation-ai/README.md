# AI Navigation AI Service

Python FastAPI service for AI/LLM operations using Ollama.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Install and start Ollama:
```bash
# Install Ollama from https://ollama.ai
# Then pull a model:
ollama pull llama2
# Or for better performance:
ollama pull mistral
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your settings
```

4. Run the service:
```bash
python main.py
# Or with uvicorn:
uvicorn main:app --reload --port 8001
```

## API Endpoints

### Health Check
```
GET /health
```

### Detect Intent
```
POST /detect-intent
Body: {
  "input": "user query text",
  "tenant_id": "tenant1",
  "available_intents": ["contact_support", "find_information"],
  "content_index": [...],
  "user_context": {...}
}
```

### Generate Response
```
POST /generate-response
Body: {
  "intent": "find_information",
  "current_step": {...},
  "flow": {...},
  "user_context": {...},
  "content_index": [...]
}
```

## Integration with TypeScript API

The TypeScript API (`ai-navigation-api`) calls this Python service via HTTP.

