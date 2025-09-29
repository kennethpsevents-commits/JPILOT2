import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import YAML from "yaml";

export async function GET(
  req: Request,
  { params }: { params: { country: string } }
) {
  try {
    const { country } = params;
    const filePath = path.join(process.cwd(), "legal/packs", `${country.toUpperCase()}.yml`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Legal pack not found" }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = YAML.parse(fileContents);

    // TTL check
    const lastUpdated = new Date(data.meta.last_updated);
    const ttlDays = data.meta.ttl_days || 30;
    const expiresAt = new Date(lastUpdated.getTime() + ttlDays * 24 * 60 * 60 * 1000);
    const now = new Date();

    if (now > expiresAt) {
      data.meta.status = "[UNCERTAIN]";
      data.meta.expired = true;
      data.meta.expired_at = expiresAt.toISOString();
    } else {
      data.meta.status = "CURRENT";
      data.meta.expired = false;
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error reading legal pack:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
