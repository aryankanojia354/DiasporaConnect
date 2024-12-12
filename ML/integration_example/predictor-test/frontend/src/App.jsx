import React, { useState, useEffect } from "react";
import axios from "axios";

const PredictionsTable = () => {
  const [predictions, setPredictions] = useState({});

  // Fetch predictions from FastAPI
  useEffect(() => {
    axios.get("http://127.0.0.1:5159/predictions")
      .then((response) => {
        setPredictions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching predictions:", error);
      });
  }, []);

  return (
    <div>
      <h1>Predicted Sales Quantities</h1>
      <table border="1" style={{ width: "50%", margin: "auto", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Predicted Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(predictions).map(([product, quantity]) => (
            <tr key={product}>
              <td>{product}</td>
              <td>{quantity.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionsTable;