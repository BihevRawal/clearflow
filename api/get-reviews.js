export default async function handler(req, res) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME || "Clearflow Reviews";

  console.log("token", !!process.env.AIRTABLE_TOKEN);
  console.log("base id", process.env.AIRTABLE_BASE_ID);
  console.log("talbe anem", process.env.AIRTABLE_TABLE_NAME);

  try {
    // Use the "Approved Reviews" view you created in Airtable
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
      console.error("Airtable error:", text);
      return res.status(500).json({ error: "Airtable fetch failed" });
    }

    const data = await response.json();
    return res.status(200).json({ records: data.records || [] });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}
