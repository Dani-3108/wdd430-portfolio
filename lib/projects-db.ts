export interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

export const projects: Project[] = [
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
];

export function getProjects(type?: string | null): Project[] {
    if (type) return projects.filter(p => p.type === type);
    return projects;
}

export function getProjectById(id: number): Project | null {
    return projects.find(p => p.id === id) ?? null;
}