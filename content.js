// content.js
document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString();
  if (selectedText.length > 0) {
    // Create the body for the POST request
    const requestBody = {
      prompt: selectedText, // Send the selected text as the prompt
    };

    // Make the POST request to the API
    fetch("http://localhost:3001/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json(); // Assuming the server responds with JSON
      })
      .then((data) => {
        console.log("Success:", data);
        // You can display a success message or handle the data as needed
        alert(data.response); // Optional alert for user feedback
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to send data: " + error.message); // Show error to user
      });
  }
});
