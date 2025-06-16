import { useEffect, useState } from "react";
import './style.css';

export default function SimilarProductLinks({ productData, apiKey }) {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const geminiApiKey = apiKey;

  const fetchSimilarLinks = async () => {
    if (!productData?.title || !productData?.price) return;

    setLoading(true);

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

    const requestBody = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;

      let cleanedResponse = generatedText.trim();
      if (cleanedResponse.startsWith("```json")) {
        cleanedResponse = cleanedResponse.replace(/^```json/, "").replace(/```$/, "").trim();
      }

      const parsed = JSON.parse(cleanedResponse);
      console.log("✅ Parsed product links:", parsed);
      setLinks(parsed);
    } catch (error) {
      console.error("❌ Error fetching or parsing product links:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchSimilarLinks();
  }, [productData]);

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">AI-Suggested Similar Products</h3>
      <button className="refreshBtn" onClick={fetchSimilarLinks}>
        🔄 Refresh
      </button>

      {loading && <p className="mt-2">Refreshing recommendations...</p>}

      <ul className="space-y-2 mt-2">
        {links.map((item, idx) => (
          <li key={idx} style={{ listStyle: 'outside' }}>
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
