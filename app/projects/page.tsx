import { fetchFilteredProjects, fetchProjectsPages } from '@/lib/projects-db';
import ProjectList from '@/components/ProjectList';
import { ProjectSearch } from '@/components/ProjectSearch';
import { Pagination } from '@/components/Pagination';

export default async function ProjectPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const [projects, totalPages] = await Promise.all([
    fetchFilteredProjects(query, currentPage),
    fetchProjectsPages(query),
  ]);

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Projects Overview</h1>
        <ProjectSearch />
      </section>
      <ProjectList projects={projects} />
      <Pagination totalPages={totalPages} />
    </main>
  );
}