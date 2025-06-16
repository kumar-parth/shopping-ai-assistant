import { useEffect, useState } from "react";
import '../../App.css';
import SimilarProductLinks from "../SimilarProducts";
import { extractProductDetails } from '../../utils';

function Questions(props) {
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = props.apiKey;

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
        <SimilarProductLinks productData={productData} apiKey={apiKey} />
    </div>
  );
}

export default Questions;
