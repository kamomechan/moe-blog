import postgres from "postgres";

const isSSL = process.env.SSL!.includes("true") || process.env.SSL! === "";

const sql = isSSL
  ? postgres(process.env.POSTGRES_URL!, { ssl: "require" })
  : postgres(process.env.POSTGRES_URL!);

export default sql;
