import { useEffect, useState } from "react";
import '../../App.css';
import SimilarProductLinks from "../SimilarProducts";
import { extractProductDetails } from '../../utils';

function Questions(props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = props.apiKey;
  const questions = [
    "Ask yourself: What is the need? Can it be replaced with something you already have?",
    "Ask yourself: Is this a good future investment?",
    "Would you like to compare prices?"
  ];

 // Request the product data
  useEffect(async () => {
    setIsLoading(true);
    const productData = await extractProductDetails(apiKey);
    console.log("🎁 Got productData:", productData);
    setIsLoading(false);
    setProductData(productData);
  }, []);

  if (isLoading) {
    return (
        <div className="question-container">
            Please wait while we load the product details
        </div>
    )
  }
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
        <SimilarProductLinks productData={productData} apiKey={apiKey} />
      )}
    </div>
  );
}

export default Questions;
