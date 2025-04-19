import { useEffect, useState } from "react";
import './style.css';
// Replace with your actual Gemini API key
const geminiApiKey = "AIzaSyBnkQ46Q0oUH4JmzxIupDAoitbszxtl1ZU"; 

export default function SimilarProductLinks({ productData }) {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarLinks = async () => {
      // Construct the prompt for the Gemini model
      const prompt = `
      Find 3–5 similar products related to "${productData.category}" that are priced around ${productData.price}. Use publicly available data from various e-commerce websites.

      Return only a JSON array of objects. Each object must include:
      - "title": the product name
      - "url": a google link which takes to the product page.

      Make sure the products are relevant and within a similar price range (±20% of the given price).

      Respond ONLY with the JSON array in this exact format:
      [
        { "title": "Product title", "url": "https://..." },
        ...
      ]`;

      console.log('prompt ', prompt);

      // Prepare the request body
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };

      try {
        // Send the request to Gemini API
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        // Handle the response
        const data = await response.json();
        const generatedText = data.candidates[0].content.parts[0].text;

        // Parse the generated response to extract product links
        let cleanedResponse = generatedText.trim();
        if (cleanedResponse.startsWith("```json")) {
          cleanedResponse = cleanedResponse.replace(/^```json/, "").replace(/```$/, "").trim();
        }

        // Try parsing the cleaned response to get actual links
        let parsed;
        try {
          parsed = JSON.parse(cleanedResponse);
          console.log("✅ Parsed product links:", parsed);
          setLinks(parsed); // Set the parsed links to state
        } catch (error) {
          console.error("❌ Error parsing JSON response:", error, cleanedResponse);
        }
      } catch (error) {
        console.error("Error fetching similar products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productData?.title && productData?.price) {
      fetchSimilarLinks();
    }
  }, [productData]);

  if (loading) return <p className="mt-4">Finding similar products...</p>;

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">AI-Suggested Similar Products</h3>
      <ul className="space-y-2">
        {links.map((item, idx) => (
          <li key={idx} style={{listStyle: 'outside'}}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="similar-products-link underline"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
