export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME || "reviews";

  if (!token || !baseId) {
    console.error("Missing Airtable env vars");
    return res.status(500).json({ error: "Server not configured" });
  }

  const body = req.body || {};
  const rawCode = body.code;

  if (!rawCode || typeof rawCode !== "string") {
    return res.status(400).json({ error: "Missing code" });
  }

  // Normalise (we generated coupon_code in uppercase)
  const code = rawCode.trim().toUpperCase();

  // Filter: approved = TRUE and coupon_code matches
  const filterFormula = `AND({approved}=TRUE(), {coupon_code}='${code}')`;

  const url =
    `https://api.airtable.com/v0/` +
    `${baseId}/` +
    `${encodeURIComponent(table)}` +
    `?filterByFormula=${encodeURIComponent(filterFormula)}` +
    `&maxRecords=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Airtable error (check-discount):", data);
      return res.status(500).json({ error: "Airtable error" });
    }

    const records = data.records || [];

    if (records.length === 0) {
      // No approved review with that code
      return res.status(200).json({
        valid: false,
        message: "Code not found or not eligible. Please check and try again.",
      });
    }

    // ✅ Valid code
    return res.status(200).json({
      valid: true,
      message: "Code valid! You’ve unlocked 5% off your next service.",
    });
  } catch (err) {
    console.error("Server error (check-discount):", err);
    return res.status(500).json({ error: "Server error" });
  }
}
