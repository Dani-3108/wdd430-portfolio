export default async function ProjectPage() {
  const res = await fetch('http://localhost:3000/api/projects');
  const projects = await res.json();

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Projects Overview</h1>
      </section>
    </main>
  );
}