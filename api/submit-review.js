export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, rating, review_text } = req.body || {};

  if (!name || !review_text) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME;

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            customer_name: name,
            rating: Number(rating),
            review_text,
            approved: false,
          },
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Airtable error:", text);
      return res.status(500).json({ error: "Airtable insert failed" });
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}
