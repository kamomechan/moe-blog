// import sql from "@/app/lib/db";
// import { comments } from "../lib/placeholder-data";
// import bcrypt from "bcrypt";

// async function seedComments() {
//   await sql`
//     DROP TABLE IF EXISTS comments
//   `;

//   await sql`
//     CREATE TABLE IF NOT EXISTS comments (
//       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//       post_id VARCHAR(255) NOT NULL,
//       parent_id UUID DEFAULT NULL REFERENCES comments(id) ON DELETE CASCADE,
//       author BOOLEAN NOT NULL,
//       content TEXT NOT NULL,
//       created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
//     );
//     `;
// }

// async function seedData() {
//   // Insert parents_id first
//   await Promise.all(
//     comments
//       .filter((item) => !item.parent_id)
//       .map((comment) => {
//         return sql`
//       INSERT INTO comments (id,post_id,parent_id,author,content,created_at)
//       VALUES (${comment.id},${comment.post_id},${comment.parent_id},${comment.author},${comment.content},${comment.created_at})
//       ON CONFLICT (id) DO NOTHING;
//       `;
//       })
//   );
//   await Promise.all(
//     comments
//       .filter((item) => item.parent_id)
//       .map((comment) => {
//         return sql`
//       INSERT INTO comments (id,post_id,parent_id,author,content,created_at)
//       VALUES (${comment.id},${comment.post_id},${comment.parent_id},${comment.author},${comment.content},${comment.created_at})
//       ON CONFLICT (id) DO NOTHING;
//       `;
//       })
//   );
// }

// async function seedUsers() {
//   await sql`
//     DROP TABLE IF EXISTS users
//   `;

//   await sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//       username VARCHAR(255) NOT NULL UNIQUE,
//       password TEXT NOT NULL
//     )
//   `;

//   const hashPassword = await bcrypt.hash(process.env.PASSWORD!, 10);
//   await sql`
//     INSERT INTO users (username,password)
//     VALUES (${process.env.USERNAME!},${hashPassword})
//   `;
// }

export async function GET() {
  // try {
  //   await sql.begin(async (sql) => {
  //     await seedComments();
  //     await seedUsers();
  //   });
  //   return Response.json({ message: "Database seeded successfully" });
  // } catch (error) {
  //   return Response.json({ error }, { status: 500 });
  // }
  return Response.json({ message: "dev..." });
}
