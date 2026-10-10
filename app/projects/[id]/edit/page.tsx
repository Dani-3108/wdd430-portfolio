import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/projects-db';
import { updateProject } from '@/lib/actions';
import type { Metadata } from 'next';

export async function generateMetadata(
    props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const { id } = await props.params;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) return { title: 'Project Not Found' };

    const project = await getProjectById(numericId);
    if (!project) return { title: 'Project Not Found' };

    return { title: `Edit ${project.title}` };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) notFound();
    const project = await getProjectById(numericId);
    if (!project) notFound();

    return (
        <form className="project-form" action={updateProject.bind(null, id)}>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" defaultValue={project.title} required />

            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" defaultValue={project.description} required />

            <label htmlFor="type">Type</label>
            <select id="type" name="type" defaultValue={project.type} required>
                <option value="opensource">Open Source</option>
                <option value="school">School</option>
            </select>
            <label htmlFor="technologies">Technologies (comma-separated)</label>
            <input id="technologies" name="technologies" defaultValue={project.technologies.join(', ')} required />

            <label htmlFor="link">Link (optional)</label>
            <input id="link" name="link" type="url" defaultValue={project.link ?? ''} />
            <label htmlFor="yearCompleted">Year Completed</label>
            <input id="yearCompleted" name="yearCompleted" type="number" min="2000" max="2099"
                defaultValue={project.year_completed ?? ''} required />
            <button type="submit">Update Project</button>
        </form>
    );
}