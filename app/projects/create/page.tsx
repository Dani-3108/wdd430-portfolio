import { createProject } from '@/lib/actions';

// app/projects/create/page.tsx
export default function Page() {
    return (
        <form className="project-form" action={createProject}>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" required />

            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" required />
            <label htmlFor="type">Type</label>
            <select id="type" name="type" required defaultValue="">
                <option value="" disabled>Select a type</option>
                <option value="opensource">Open Source</option>
                <option value="school">School</option>
            </select>

            <label htmlFor="technologies">Technologies (comma-separated)</label>
            <input id="technologies" name="technologies" required />
            <label htmlFor="link">Link (optional)</label>
            <input id="link" name="link" type="url" />

            <button type="submit">Save Project</button>
        </form>
    );
}