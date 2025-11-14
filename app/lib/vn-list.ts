import type { VNDBType } from "@/app/lib/definitions";

export default async function getVNList() {
  const body = {
    user: process.env.VNDB_USER_ID,
    fields:
      "id, vote, vn{title,alttitle,description,released,developers{name,original,id},image{url,sexual,violence,dims}}",
    filters: ["label", "=", "7"],
    sort: "vote",
    reverse: true,
    results: 10,
  };

  try {
    const response = await fetch("https://api.vndb.org/kana/ulist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    const data: VNDBType = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch failed", error);
  }
}
