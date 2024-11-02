import React, { useState } from "react";
import axios from "axios";

function App() {
  const [inputText, setInputText] = useState("");
  const [explanation, setExplanation] = useState("");

  const fetchExplanation = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: `Explain: ${inputText}` }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api_key}`,
          },
        }
      );
      console.log("response", response);

      setExplanation(response.data.choices[0].message.content);
    } catch (error) {
      setExplanation("Error fetching explanation.");
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h3>Hover Explain</h3>
      <input
        type="text"
        placeholder="Enter text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={fetchExplanation}>Get Explanation</button>
      <p>{explanation}</p>
    </div>
  );
}

export default App;
