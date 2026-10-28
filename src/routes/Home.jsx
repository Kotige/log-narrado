import Layout from "../components/Layout";
import Hero from "../components/Hero";
import RecentPosts from "../components/RecentPosts";
import ProjectsCategories from "../components/ProjectsCategories";
import Sidebar from "../components/Sidebar";
import useDocumentMeta from "../hooks/useDocumentMeta";

export default function Home() {
  useDocumentMeta();

  return (
    <Layout className="flex flex-col">
      <Hero />

      <section className="flex w-full flex-col px-8 py-16 md:flex-row md:gap-12">
        <div className="w-full md:w-2/3 flex flex-col gap-20">
          <RecentPosts />
          <ProjectsCategories />
        </div>
        <div className="w-full md:w-1/3">
          <Sidebar />
        </div>
      </section>
    </Layout>
  );
}
