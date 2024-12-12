import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
from ollama import Client

# Ollama client setup
client = Client(host='http://localhost:11434')  # Replace with your Ollama server URL if different

# Models for different languages
model_mapping = {
    "English": "llama3.2",
    "Hindi": "SL-Lexicons/llama3-hindi-8b-q5_km.gguf:latest",
    "Tamil": "conceptsintamil/tamil-llama-7b-instruct-v0.2:latest",
    "Telugu": "rohithbojja/llama3-telugu:latest",
    "French": "7shi/llama-translate:8b-q4_K_M",
    "German": "lukasmalkmus/llama3-sauerkraut",
    "Japanese": "7shi/llama-translate:8b-q4_K_M",
}

app = FastAPI(debug=True)

# CORS Middleware setup
origins = [
    "http://localhost:5173",  # Your frontend URL
    "http://localhost:4173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for incoming chat messages
class ChatRequest(BaseModel):
    message: str
    language: str

@app.post("/chat")
def chat(request: ChatRequest) -> Dict[str, str]:
    message = request.message.strip()
    language = request.language

    # Default to English if the selected language is not supported
    model = model_mapping.get(language, model_mapping["English"])

    try:
        response = client.chat(model=model, messages=[
            {"role": "user", "content": message}
        ])
        return {"reply": response.message.content}
    except Exception as e:
        return {"reply": "I'm sorry, there was an error processing your request."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4173)
