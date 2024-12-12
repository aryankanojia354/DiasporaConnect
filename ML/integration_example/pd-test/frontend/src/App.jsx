import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [predictions, setPredictions] = useState({});

  // Fetch predictions from FastAPI
  useEffect(() => {
    fetch("http://127.0.0.1:5173/predictions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch predictions");
        }
        return response.json();
      })
      .then((data) => setPredictions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <h1>Predicted Sales Quantities</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Predicted Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(predictions).length > 0 ? (
            Object.entries(predictions).map(([product, quantity]) => (
              <tr key={product}>
                <td>{product}</td>
                <td>{quantity.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;