import { StoryCardType } from "@/types/story-card-type";
import Hero from "@/components/Hero";
import StoryCard from "@/components/StoryCard";
import SearchForm from "@/components/SearchForm";
import { STORIES_BY_SEARCH_QUERY, STORIES_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
// import { sanityFetch } from "@/sanity/lib/live";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query || "";
  const params = { search: query || null };
  let stories = [];

  if (params.search) {
    stories = await client.fetch(STORIES_BY_SEARCH_QUERY, { search: params.search });
  } else {
    stories = await client.fetch(STORIES_QUERY);
  }

  return (
    <div className="pb-10 border">
      <section className="w-full bg-gray-900 min-h-[530px] flex justify-center items-center flex-col pb-10 px-6">
        <Hero />
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <ul className="mt-7 card_grid">
          {
            stories.length > 0 ? (
              stories.map((story: StoryCardType) => (
                <StoryCard key={story._id} story={story} />
              ))
            ) : (
              <p className="no-results">
                No stories found
              </p>
            )
          }
        </ul>
      </section>
    </div>
  );
}
