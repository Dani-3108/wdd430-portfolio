import { getProjects } from '@/lib/projects-db';

export default async function ProjectPage() {
  const projects = await getProjects();

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Projects Overview</h1>
        <pre>{JSON.stringify(projects, null, 2)}</pre>
      </section>
    </main>
  );
}