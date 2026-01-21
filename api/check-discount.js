export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME;

  if (!token || !baseId || !table) {
    return res.status(500).json({ error: "Server not configured" });
  }

  const { code } = req.body || {};

  if (!code || typeof code !== "string") {
    return res.status(400).json({ error: "Missing code" });
  }

  const normalizedCode = code.trim().toUpperCase();

  const filterFormula = `AND({approved}=TRUE(), {coupon_code}='${normalizedCode}')`;

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
    table
  )}?filterByFormula=${encodeURIComponent(filterFormula)}&maxRecords=1`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Airtable discount error:", data);
      return res.status(500).json({ error: "Airtable error" });
    }

    if (!data.records || data.records.length === 0) {
      return res.status(200).json({
        valid: false,
        message: "Code not found or not eligible",
      });
    }

    return res.status(200).json({
      valid: true,
      message: "Code valid! You’ve unlocked 5% off.",
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
