console.log("Shopping Helper is running...");

function isProductPage() {
  const allBuyButtons = ["add to cart", "buy now", "add to bag"];
  const buyText = document.body?.innerText?.toLowerCase() || "";
  const result = allBuyButtons.some((text) => buyText.includes(text));
  console.log("is product page ==> ", result);
  return result;
}

function getUserApiKey() {
  return new Promise((resolve) => {
    window.postMessage({ type: "GET_GEMINI_API_KEY" }, "*");

    const listener = (event) => {
      if (event.source !== window) return;
      if (event.data.type === "GEMINI_API_KEY") {
        window.removeEventListener("message", listener);
        resolve(event.data.payload);
      }
    };

    window.addEventListener("message", listener);
  });
}

window.addEventListener("load", (event) => {
  if (!isProductPage()) return;

  const overlay = document.createElement("div");
  overlay.innerHTML = `<button id="helper-btn" style="
    background-color: #f90;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  ">Ask Before Buying</button>`;
  overlay.style.position = "fixed";
  overlay.style.zIndex = "9999";
  overlay.style.bottom = "20px";
  overlay.style.right = "20px";
  document.body.appendChild(overlay);

  document.getElementById("helper-btn").addEventListener("click", async () => {
    console.log("🔘 Button clicked");

    let existing = document.getElementById("shopping-helper-root");
    if (existing) {
      existing.style.display = existing.style.display === "none" ? "block" : "none";
      return;
    }

    const container = document.createElement("div");
    container.id = "shopping-helper-root";
    container.style.position = "fixed";
    container.style.bottom = "80px";
    container.style.right = "20px";
    container.style.zIndex = "9999";
    container.style.width = "400px";
    container.style.background = "white";
    container.style.border = "2px solid black";
    container.style.padding = "20px";
    container.style.borderRadius = "12px";
    container.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    document.body.appendChild(container);

    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("dist/main.js");
    script.type = "module";
    document.body.appendChild(script);

    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = chrome.runtime.getURL("dist/assets/main.css");
    document.head.appendChild(cssLink);
  });

  window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    console.log("📩 content.js received:", event.data);
     // Getter
    if (event.data.type === "GET_GEMINI_API_KEY") {
      console.log("📤 Sending API_KEY_RESPONSE to window");
      chrome.storage.local.get("geminiApiKey", (result) => {
        console.log('API KEY => ', result);
        window.postMessage(
          { type: "GEMINI_API_KEY_RESPONSE", payload: result.geminiApiKey || "" },
          "*"
        );
      });
    }

    if (event.data.type === "SET_GEMINI_API_KEY") {
      chrome.storage.local.set({ geminiApiKey: event.data.payload }, () => {
        console.log("✅ Gemini API key saved to storage");
      });
    }
  });
});
