import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/projects-db';
import { updateProject } from '@/lib/actions';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    const project = await getProjectById(Number(id));
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

            <button type="submit">Update Project</button>
        </form>
    );
}