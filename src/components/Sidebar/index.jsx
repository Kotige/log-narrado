import AuthorBio from "./AuthorBio";
import Newsletter from "./Newsletter";
import TagCloud from "./TagCloud";
import ChangelogPreview from "./ChangelogPreview";

export default function Sidebar() {
  return (
    <aside aria-label="Sobre o blog" className="flex w-full flex-col gap-8">
      <AuthorBio />
      <Newsletter />
      <TagCloud />
      <ChangelogPreview />
    </aside>
  );
}
