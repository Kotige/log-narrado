import Header from "../components/Header";
import Hero from "../components/Hero";
import RecentPosts from "../components/RecentPosts";
import ProjectsCategories from "../components/ProjectsCategories";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <section className="flex w-full md:min-h-screen flex-1 items-center flex-col md:flex-row">
        <div className="w-full md:w-2/3">
          <Hero />
        </div>
        <div className="hidden md:block md:w-1/3"></div>
      </section>

      <section className="flex w-full flex-col px-8 py-16 md:flex-row md:gap-12">
        <div className="w-full md:w-2/3 flex flex-col gap-20">
          <RecentPosts />
          <ProjectsCategories />
        </div>
        <div className="w-full md:w-1/3">
          <Sidebar />
        </div>
      </section>
      <Footer />
    </div>
  );
}
