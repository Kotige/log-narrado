import AuthorBio from "./AuthorBio";
import Newsletter from "./Newsletter";
import TagCloud from "./TagCloud";
import ChangelogPreview from "./ChangelogPreview";
// import SocialLinks from "./SocialLinks";

export default function Sidebar() {
  return (
    <aside className="flex w-full flex-col gap-8">
      <AuthorBio />
      <Newsletter />
      <TagCloud />
      <ChangelogPreview />
      {/* <SocialLinks /> */}
    </aside>
  );
}
