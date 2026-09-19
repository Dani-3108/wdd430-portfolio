export default async function OpenSourcePage() {
    const res = await fetch('http://localhost:3000/api/projects?type=opensource');
    const projects = await res.json();

    return (
        <main className="container mx-auto px-4 py-12">
            <section className="text-center py-12">
                <h1 className="text-4xl font-bold mb-4">Open Source Projects</h1>
            </section>
        </main>
    );
}