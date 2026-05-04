import { NextResponse } from "next/server";

const VALORANT_API_KEY = "HDEV-5a480044-19b0-4fb3-aa50-a577875dadb1";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.henrikdev.xyz/valorant/v1/mmr/eu/TnMorty/Akali",
      {
        headers: {
          Authorization: VALORANT_API_KEY,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch Valorant data");
    }

    const data = await response.json();
    return NextResponse.json(data.data);
  } catch (error) {
    console.error("Valorant API Error:", error);
    return NextResponse.json({ error: "Failed to fetch Valorant data" }, { status: 500 });
  }
}
