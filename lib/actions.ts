// lib/actions.ts
'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const currentYear = new Date().getFullYear();

const ProjectFormSchema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters.'),
    description: z.string().min(10, 'Description must be at least 10 characters.'),
    type: z.enum(['opensource', 'school']),
    technologies: z.string().min(2, 'Add at least one technology.'),
    link: z.string().url('Enter a valid URL.').optional().or(z.literal('')),
    yearCompleted: z.coerce
        .number()
        .int('Year must be a whole number.')
        .gte(2000, 'Year must be 2000 or later.')
        .lte(currentYear, `Year cannot be greater than ${currentYear}.`),
});

function toPgArray(items: string[]) {
    return `{${items.map((t) => `"${t.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`).join(',')}}`;
}

export type State = {
    errors?: {
        title?: string[];
        description?: string[];
        type?: string[];
        technologies?: string[];
        link?: string[];
        yearCompleted?: string[];
    };
    message?: string | null;
};

export async function createProject(prevState: State, formData: FormData): Promise<State> {
    const parsed = ProjectFormSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
        return {
            errors: z.flattenError(parsed.error).fieldErrors,
            message: 'Missing or invalid fields. Failed to create project.',
        };
    }
    const { title, description, type, technologies, link, yearCompleted } = parsed.data;
    const techArray = technologies
        .split(',')
        .map((t) => t.trim());
    const pgArray = `{${techArray
        .map((t) => `"${t.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`)
        .join(',')}}`;
    try {
        await sql`
      INSERT INTO projects (title, description, type, technologies, link, year_completed)
      VALUES (${title}, ${description}, ${type}, ${pgArray}::text[], ${link || null}, ${yearCompleted})
    `;
    } catch (error) {
        console.error('Error creating project:', error);
        return { message: 'Database Error: Failed to create project.' };
    }

    revalidatePath('/projects');
    redirect('/projects');
}

export async function updateProject(id: string, formData: FormData) {
    const parsed = ProjectFormSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) throw new Error('Invalid project input.');

    const { title, description, type, technologies, link, yearCompleted } = parsed.data;
    const techArray = technologies.split(',').map((t) => t.trim());

    await sql`
    UPDATE projects
    SET title = ${title}, description = ${description}, type = ${type},
        technologies = ${toPgArray(techArray)}::text[], link = ${link || null},
        year_completed = ${yearCompleted}
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