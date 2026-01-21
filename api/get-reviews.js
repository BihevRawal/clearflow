export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME;

  if (!token || !baseId || !table) {
    return res.status(500).json({ error: "Server not configured" });
  }

  try {
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
      table
    )}?view=${encodeURIComponent("Approved Reviews")}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Airtable fetch error:", text);
      return res.status(500).json({ error: "Airtable fetch failed" });
    }

    const data = await response.json();
    return res.status(200).json({ records: data.records || [] });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
