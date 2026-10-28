import { buildChangelog } from "./content";

const changelogFiles = import.meta.glob("/src/content/changelog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const changelogEntries = buildChangelog(Object.entries(changelogFiles), {
  includeDrafts: !import.meta.env.PROD,
});

// Só a entrada mais recente — usada no ChangelogPreview da sidebar.
export function getLatestChangelogEntry() {
  return changelogEntries[0] ?? null;
}
