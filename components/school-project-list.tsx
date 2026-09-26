import { getProjects } from "@/lib/projects-db";

export default async function SchoolProjectList() {
    const projects = await getProjects('school');

    return (
        <ul className="space-y-2">
            {projects.map(project => (
                <li key={project.id}>{project.title}</li>
            ))}
        </ul>
    );
}