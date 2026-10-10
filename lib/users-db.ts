// lib/users-db.ts
import { sql } from '@vercel/postgres';

export interface User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const { rows } = await sql<User>`
    SELECT id::text AS id, name, email, password_hash AS "passwordHash"
    FROM users WHERE email = ${email}
  `;
    return rows[0] ?? null;
}