import { useEffect, useState } from "react";
import './App.css';
import SimilarProductLinks from "./components/SimilarProducts/SimilarProductLinks";

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [productData, setProductData] = useState(null);
  const questions = [
    "Ask yourself: What is the need? Can it be replaced with something you already have?",
    "Ask yourself: Is this a good future investment?",
    "Would you like to compare prices?"
  ];

 // Request the product data
  useEffect(() => {
    window.postMessage({ type: "GET_PRODUCT_DATA" }, "*");

    const handleMessage = (event) => {
      if (event.source !== window) return;
      if (event.data.type === "PRODUCT_DATA") {
        console.log("🎁 Got productData:", event.data.payload);
        // Do something with productData, like set state
        setProductData(event.data.payload);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="question-container">
      <h2 className="text-lg font-bold mb-2">Shopping Helper</h2>
      <p>{questions[questionIndex]}</p>
      <button
        onClick={() => setQuestionIndex((prev) => (prev + 1) % questions.length)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
      {productData && questionIndex === 2 && (
        <SimilarProductLinks productData={productData} />
      )}
    </div>
  );
}

export default App;
