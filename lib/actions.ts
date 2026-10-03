// lib/actions.ts
'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const ProjectFormSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(10),
    type: z.enum(['opensource', 'school']),
    technologies: z.string().min(2),
    link: z.string().url().optional().or(z.literal('')),
});

function toPgArray(items: string[]) {
    return `{${items.map((t) => `"${t.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`).join(',')}}`;
}

export async function createProject(formData: FormData) {
    const raw = {
        title: formData.get('title'),
        description: formData.get('description'),
        type: formData.get('type'),
        technologies: formData.get('technologies'),
        link: formData.get('link'),
    };
    const parsed = ProjectFormSchema.safeParse(raw);
    if (!parsed.success) {
        throw new Error('Invalid project input.');
    }
    const { title, description, type, technologies, link } = parsed.data;
    const techArray = technologies
        .split(',')
        .map((t) => t.trim());
    const pgArray = `{${techArray
        .map((t) => `"${t.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`)
        .join(',')}}`;
    await sql`
    INSERT INTO projects (title, description, type, technologies, link)
    VALUES (${title}, ${description}, ${type}, ${pgArray}::text[], ${link || null})
  `;

    revalidatePath('/projects');
    redirect('/projects');
}

export async function updateProject(id: string, formData: FormData) {
    const parsed = ProjectFormSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) throw new Error('Invalid project input.');

    const { title, description, type, technologies, link } = parsed.data;
    const techArray = technologies.split(',').map((t) => t.trim());

    await sql`
    UPDATE projects
    SET title = ${title}, description = ${description}, type = ${type},
        technologies = ${toPgArray(techArray)}::text[], link = ${link || null}
    WHERE id = ${id}
  `;
    revalidatePath('/projects');
    redirect('/projects');
}

export async function deleteProject(id: string) {
    try {
        await sql`DELETE FROM projects WHERE id = ${id}`;
    } catch (error) {
        console.error('Error deleting project:', error);
        throw new Error('Failed to delete project. Please try again later.');
    }
    revalidatePath('/projects');
}