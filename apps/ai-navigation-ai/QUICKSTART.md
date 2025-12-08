# Quick Start Guide - AI Navigation AI Service

## 1. Install Ollama

Download and install from: https://ollama.ai

```bash
# After installation, pull a model:
ollama pull llama2

# Or for better performance (requires more RAM):
ollama pull mistral
ollama pull llama2:13b
```

## 2. Install Python Dependencies

```bash
cd apps/ai-navigation-ai
pip install -r requirements.txt
```

Or with virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2
```

## 4. Start the Service

```bash
python main.py
```

Or with auto-reload:
```bash
uvicorn main:app --reload --port 8001
```

## 5. Test the Service

```bash
# Health check
curl http://localhost:8001/health

# Test intent detection
curl -X POST http://localhost:8001/detect-intent \
  -H "Content-Type: application/json" \
  -d '{
    "input": "I want to contact you",
    "tenant_id": "test",
    "available_intents": ["contact_support", "find_information"],
    "content_index": [],
    "user_context": {}
  }'
```

## 6. Configure TypeScript API

In `apps/ai-navigation-api/.env`:
```env
AI_SERVICE_URL=http://localhost:8001
USE_AI_SERVICE=true
```

## Troubleshooting

### Ollama not found
- Make sure Ollama is installed and running
- Check `ollama list` works in terminal
- Verify `OLLAMA_BASE_URL` in `.env`

### Model not found
- Pull the model: `ollama pull llama2`
- Check available models: `ollama list`
- Update `OLLAMA_MODEL` in `.env`

### Service won't start
- Check Python version: `python --version` (needs 3.9+)
- Check dependencies: `pip list`
- Check port 8001 is available

