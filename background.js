chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension Installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getExplanation") {
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Explain: ${request.text}` }],
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        sendResponse({ explanation: data.choices[0].message.content })
      )
      .catch((error) =>
        sendResponse({ explanation: "Error fetching explanation." })
      );
    return true; // Ensures async response
  }
});
