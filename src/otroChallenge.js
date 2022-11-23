import React, { useState, useEffect } from "react";
import { useFetch } from "./hooks/useFetch";

export default function OtroChallenge() {
  // For the test
  // 1. fetch "https://dummyjson.com/products" endpoint from the API.
  // 2. Render the products with the data coming from the endpoint.
  // 3. Create a button to delete a product.

  const { data, isLoading, error } = useFetch("https://dummyjson.com/products");

  function deleteProduct(id) {
    data.filter((product) => product.id !== id);
  }
  
  return (
    <div className="App">
      <h1>Products</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data?.products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <img src={product.images[0]} alt={product.name} />
          <p>{product.description}</p>
          <button onClick={() => deleteProduct(product.id)}>Delete</button>
        </div>
      ))};
    </div>
  );
}