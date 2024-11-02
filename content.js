document.addEventListener("mouseover", (event) => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    chrome.runtime.sendMessage(
      { action: "getExplanation", text: selectedText },
      (response) => {
        showTooltip(event, response.explanation);
      }
    );
  }
});

function showTooltip(event, text) {
  const tooltip = document.createElement("div");
  tooltip.innerText = text;
  tooltip.style.position = "fixed";
  tooltip.style.backgroundColor = "#333";
  tooltip.style.color = "#fff";
  tooltip.style.padding = "8px";
  tooltip.style.borderRadius = "5px";
  tooltip.style.top = `${event.pageY + 10}px`;
  tooltip.style.left = `${event.pageX + 10}px`;
  tooltip.style.zIndex = 1000;
  document.body.appendChild(tooltip);

  event.target.addEventListener("mouseleave", () => {
    tooltip.remove();
  });
}
