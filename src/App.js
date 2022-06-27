import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [newQuote, setNewQuote] = useState("");

  useEffect(() => {
    fetchQuote();
  });

  const fetchQuote = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const quote = response.data.slip.advice;

        //console.log(response);
        //console.log(response.data.slip.advice);

        setNewQuote(quote);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="heading">{newQuote}</h1>
        <button className="button" onClick={fetchQuote}>
          <span>Get some motivation!</span>
        </button>
      </div>
    </div>
  );
}

export default App;
