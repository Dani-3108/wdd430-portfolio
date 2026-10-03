import { deleteProject } from '@/lib/actions';

interface ProjectCardProps {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
}

export default function ProjectCard({ id, title, description, technologies, link }: ProjectCardProps) {
    return (
        <article className="p-4 border-l-4 border-[#043063] bg-gray-50 rounded">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700 mb-3">{description}</p>
            <p className="text-sm text-gray-600">
                <strong>Technologies:</strong> {technologies.join(', ')}
            </p>
            {link && (
                <p className="mt-2">
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-[#043063] hover:underline">View Project</a>
                </p>
            )}
            <form action={deleteProject.bind(null, String(id))}>
                <button type="submit" className="mt-3 text-red-700 hover:underline">Delete</button>
            </form>
        </article>
  );
}