import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import ollama
from ollama import Client

host = 'https://select-indirectly-jennet.ngrok-free.app'

# set OLLAMA_HOST=https://select-indirectly-jennet.ngrok-free.app
# host = 'http://localhost:11434'

model_en = 'llama3.2'
model_hi = 'SL-Lexicons/llama3-hindi-8b-q5_km.gguf:latest'
model_te = 'rohithbojja/llama3-telugu:latest'
model_ta = 'conceptsintamil/tamil-llama-7b-instruct-v0.2:latest'
model_fr = '7shi/llama-translate:8b-q4_K_M'
model_jp = '7shi/llama-translate:8b-q4_K_M'
model_de = 'lukasmalkmus/llama3-sauerkraut'
# model = 'llama3.3'


# ollama.pull(model)
# try:
#   ollama.chat(model)
# except ollama.ResponseError as e:
#   print('Error:', e.error)
#   if e.status_code == 404:
#     ollama.pull(model)

client = Client(
  host=host#,
#   headers={'x-some-header': 'some-value'}
)

def checkRelevance(msg,ai,model,model_lang):
    content = f"""You are an AI who checks if the answer given by the Another AI is Hallucinating with respect to the question asked.
    Check if the Answer is relevant to the question, if it is relevant return only Yes, if it is not relevant return only No.
    Also in case the answer is repetetion of the question itself, then answer Yes if it is still relevant.
    
    Question : {msg}
    Answer : {msg}
    
    Is the answer relevant to the question? (Yes/No) 
    """#Also give the reason why or why not?
    response = client.chat(model=model, messages=[
    {
        'role': 'user',
        'content': content,
    },
    ])
    relevant = f"ChatBot : {response.message.content}"
    return relevant

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
    relevant = checkRelevance(question,ai,model,model_lang)
    # if relevant=="Yes":
    #     return relevant+"\n"+ai
    # else:
    #     return "Please choose the relevant category your query belongs to"
    return ai

def answer(msg):
    global model_en, model_hi, model_hi2, model_te, model_ta
    lang="jp"
    # model_lang = "en"
    if lang=="en":
        model = model_en
        model_lang = "ENGLISH"
    elif lang=="hi":
        model = model_hi
        model_lang = "HINDI"
    elif lang=="fr":
        model = model_fr
        model_lang = "FRENCH"
    elif lang=="de":
        model = model_de
        model_lang = "GERMAN"
    elif lang=="jp":
        model = model_jp
        model_lang = "JAPANESE"
    elif lang=="te":
        model = model_te
        model_lang = "TELUGU"
        msg = answer_ai(msg,model_en,"ENGLISH")
        return "ChatBot :" + translate_en_telugu(msg,model)
    elif lang=="ta":
        model = model_ta
        model_lang = "TAMIL"
        msg = answer_ai(msg,model_en,"ENGLISH")
        return "ChatBot :" + translate_en_tamil(msg,model)
    else:
        return "Your Language is Currently not supported."
        
    return "ChatBot :" + answer_ai(msg,model,model_lang)

# print(response)

class Fruit(BaseModel):
    name: str

class Fruits(BaseModel):
    fruits: List[Fruit]
    
app = FastAPI(debug=True)

origins = [
    "http://localhost:5173",
    # Add more origins here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

memory_db = {"fruits": []}

@app.get("/fruits", response_model=Fruits)
def get_fruits():
    return Fruits(fruits=memory_db["fruits"])

@app.post("/fruits")
def add_fruit(fruit: Fruit):
    print(fruit)
    fruit.name = str(answer(str(fruit.name)))
    memory_db["fruits"].append(fruit)
    return fruit
    

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4173)