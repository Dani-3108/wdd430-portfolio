import ProjectList from '@/components/ProjectList';

const projects = [
  {
    title: 'Service Organization Manager',
    description: 'A full-stack web app for managing organizations, projects, and categories, with role-based authentication and CRUD operations.',
    technologies: ['Node.js', 'Express', 'EJS', 'PostgreSQL'],
    link: 'https://daniel-osorio-cse-340.onrender.com/'
  },
  {
    title: 'AI Vision project',
    description: 'A website that contains information about vision systems, currency calculator, forms and dynamic interaction.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    link: 'https://dani-3108.github.io/WDD330--DO--finalproject/quote.html'
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-700">
          I'm a full-stack developer learning Next.js and React. Here are some of my recent projects.
        </p>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
}