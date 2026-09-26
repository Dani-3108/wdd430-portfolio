// lib/projects-db.ts
import { sql } from '@vercel/postgres';

export interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

export async function getProjects(type?: string | null): Promise<Project[]> {
    if (type) {
        const { rows } = await sql<Project>`
      SELECT * FROM projects WHERE type = ${type} ORDER BY id
    `;
        return rows;
    }
    const { rows } = await sql<Project>`SELECT * FROM projects ORDER BY id`;
    return rows;
}

export async function getProjectById(id: number): Promise<Project | null> {
    const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE id = ${id}
  `;
    return rows[0] ?? null;
}


/*export const projects: Project[] = [
{
    id: 1,
        title: 'Service Organization Manager',
            description: 'A full-stack web app for managing organizations, projects, and categories, with role-based authentication and CRUD operations.',
                type: 'school',
                    technologies: ['Node.js', 'Express', 'EJS', 'PostgreSQL'],
                        link: 'https://daniel-osorio-cse-340.onrender.com/'
},
{
    id: 2,
        title: 'AI Vision project',
            description: 'A website that contains information about vision systems, currency calculator, forms and dynamic interaction.',
                type: 'school',
                    technologies: ['JavaScript', 'HTML', 'CSS'],
                        link: 'https://dani-3108.github.io/WDD330--DO--finalproject/quote.html'
}
];*/