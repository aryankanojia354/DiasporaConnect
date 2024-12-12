import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
from ollama import Client

# Ollama client setup
# client = Client(host='http://localhost:11434')
client = Client(host='https://winning-sparrow-gently.ngrok-free.app')

model_en = 'llama3.2'
model_hi = 'SL-Lexicons/llama3-hindi-8b-q5_km.gguf:latest'
model_te = 'rohithbojja/llama3-telugu:latest'
model_ta = 'conceptsintamil/tamil-llama-7b-instruct-v0.2:latest'
model_fr = 'jpacifico/french-alpaca-3b'
model_jp = '7shi/llama-translate:8b-q4_K_M'
model_de = 'lukasmalkmus/llama3-sauerkraut'

def translate_en_tamil(msg,model):
    msg = f"""Translate "{msg}" into tamil and give answer in tamil. GIVE TRANSLATED ANSWER ONLY."""
    response = client.chat(model=model, messages=[
    {
        'role': 'user',
        'content': msg,
    },
    ])
    translated = f"ChatBot : {response.message.content}"
    return translated

def translate_en_telugu(msg,model):
    msg = f"""Translate "{msg}" into telugu and give answer in telugu script. GIVE TRANSLATED ANSWER ONLY."""
    response = client.chat(model=model, messages=[
    {
        'role': 'user',
        'content': msg,
    },
    ])
    translated = f"{response.message.content}"
    return translated

def answer_ai(msg,model,model_lang):
    question = msg
    msg = f"""Answer the following question in 10-30 words, in {model_lang} ONLY, (dont give answers that are duplicate of the question itself, and don't provide an explanation):
    Question: {msg}
    REMEMBER! ANSWER IN {model_lang} LANGUAGE ONLY!!!
    AND GIVE ANSWER ONLY IRRESPECTIVE OF THE RECEIVED LANGUAGE."""
    response = client.chat(model=model, messages=[
    {
        'role': 'user',
        'content': msg,
    },
    ])
    ai = f"{response.message.content}"
    # relevant = checkRelevance(question,ai,model,model_lang)
    return ai

# Models for different languages
model_mapping = {
    "English": "llama3.2",
    "Hindi": "SL-Lexicons/llama3-hindi-8b-q5_km.gguf:latest",
    "Tamil": "conceptsintamil/tamil-llama-7b-instruct-v0.2:latest",
    "Telugu": "rohithbojja/llama3-telugu:latest",
    "French": "jpacifico/french-alpaca-3b",
    "German": "lukasmalkmus/llama3-sauerkraut",
    "Japanese": "7shi/llama-translate:8b-q4_K_M",
}

app = FastAPI(debug=True)

# CORS Middleware setup
origins = [
    "http://localhost:5173", 
    "http://localhost:5174", 
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
async def chat(request: ChatRequest) -> Dict[str, str]:
    # Debug logging to check the incoming data
    print(f"Received message: {request.message}")
    print(f"Selected language: {request.language}")

    message = request.message.strip()
    language = request.language

    # Default to English if the selected language is not supported
    model = model_mapping.get(language, model_mapping["English"])

    try:
        response = client.chat(model=model, messages=[{"role": "user", "content": message}])
        return {"reply": response.message.content}
    except Exception as e:
        print(f"Error processing the request: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4173)
