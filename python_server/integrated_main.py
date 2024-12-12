from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import uvicorn
from ollama import Client

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
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

# Global variables for chatbot
host = 'https://select-indirectly-jennet.ngrok-free.app'
model_en = 'llama3.2'
model_hi = 'SL-Lexicons/llama3-hindi-8b-q5_km.gguf:latest'
model_te = 'rohithbojja/llama3-telugu:latest'
model_ta = 'conceptsintamil/tamil-llama-7b-instruct-v0.2:latest'
client = Client(host=host)

memory_db = []

# Chatbot utilities
def translate(msg, model, language):
    msg = f"Translate '{msg}' into {language} and provide the translation in {language}."
    response = client.chat(model=model, messages=[{'role': 'user', 'content': msg}])
    return response.message.content

def answer_ai(msg, model, language):
    query = f"Answer the question in {language} only. Do not repeat the question. Question: {msg}"
    response = client.chat(model=model, messages=[{'role': 'user', 'content': query}])
    return response.message.content

def answer(msg, lang):
    if lang == "en":
        model = model_en
        language = "English"
    elif lang == "hi":
        model = model_hi
        language = "Hindi"
    elif lang == "te":
        model = model_te
        language = "Telugu"
    elif lang == "ta":
        model = model_ta
        language = "Tamil"
    else:
        return "Your language is currently not supported."

    return answer_ai(msg, model, language)

# Endpoint for predictions
@app.get("/predictions")
async def get_predictions():
    data = pd.read_csv('datasets/Indian_Artisan_Data.csv', low_memory=False)

    # Preprocessing
    data['Date'] = pd.to_datetime(data['Date'], errors='coerce')
    data = data.dropna(subset=['Date', 'Quantity'])

    # Aggregate data
    monthly_data = data.groupby([data['Date'].dt.to_period('M'), 'Product Name']).agg(
        total_quantity=('Quantity', 'sum')
    ).reset_index()
    monthly_data['Date'] = monthly_data['Date'].dt.to_timestamp()

    # One-hot encoding
    data_encoded = pd.get_dummies(monthly_data, columns=['Product Name'], drop_first=True)
    X = data_encoded.drop(columns=['total_quantity', 'Date'])
    y = data_encoded['total_quantity']

    # Train-test split and model training
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(random_state=42, n_estimators=100)
    model.fit(X_train, y_train)

    # Forecast for the next month
    latest_data = monthly_data[monthly_data['Date'] == monthly_data['Date'].max()]
    latest_encoded = pd.get_dummies(latest_data, columns=['Product Name'], drop_first=True).drop(columns=['total_quantity', 'Date'])
    missing_cols = set(X.columns) - set(latest_encoded.columns)
    for col in missing_cols:
        latest_encoded[col] = 0
    latest_encoded = latest_encoded[X.columns]

    # Predictions
    next_month_prediction = model.predict(latest_encoded)
    predictions_dict = {product_name: predicted_qty for product_name, predicted_qty in zip(latest_data['Product Name'], next_month_prediction)}

    return JSONResponse(content=predictions_dict)

# Endpoint for chatbot
@app.post("/chats")
def add_chat(chat: str, lang: str = "en"):
    response = answer(chat, lang)
    memory_db.append(response)
    return response

# Endpoint to retrieve chats
@app.get("/chats")
def get_chats():
    return memory_db[-1] if memory_db else "No chats available."

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5173)
