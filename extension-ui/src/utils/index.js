export const extractProductDetails = async (apiKey)  => {
    const prompt = `
        Go through the below URL: ${window.location.href} and get me the object containing the title, price, image URL, and the category of the product.
    
    Respond with only a JSON object like:
    {
        "title": "Product title",
        "price": "₹12345",
        "category": "Mobile",
        "image": "https://example.com/image.jpg"
    }
    `;

    try {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [
            {
                parts: [{ text: prompt }],
            },
            ],
        }),
        }
    );

    const json = await response.json();
    const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    let cleaned = rawText.trim();
    if (cleaned.startsWith("```json")) {
        cleaned = cleaned.replace(/^```json/, "").replace(/```$/, "").trim();
    }

    const parsed = JSON.parse(cleaned);
    return parsed;
    } catch (error) {
    console.error("❌ Failed to extract using Gemini:", error);
    return { title: "Not found", price: "Not found", description: "Not found", image: "" };
    }
}