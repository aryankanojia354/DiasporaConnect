from fastapi import FastAPI
from fastapi.responses import JSONResponse
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

# Initialize FastAPI app
app = FastAPI()

# Endpoint to calculate predictions and send them
@app.get("/predictions")
async def get_predictions():
    # Load dataset
    data = pd.read_csv('datasets/Indian_Artisan_Data.csv', low_memory=False)

    # Preprocessing
    data['Date'] = pd.to_datetime(data['Date'], errors='coerce')
    data = data.dropna(subset=['Date', 'Quantity'])

    # Aggregate data by month and Product Name
    monthly_data = data.groupby([data['Date'].dt.to_period('M'), 'Product Name']).agg(
        total_quantity=('Quantity', 'sum')
    ).reset_index()
    monthly_data['Date'] = monthly_data['Date'].dt.to_timestamp()

    # One-hot encode the 'Product Name' column
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

    # Return predictions as JSON
    return JSONResponse(content=predictions_dict)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5173)