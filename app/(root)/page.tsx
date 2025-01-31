import { stories } from "@/data/stories";
import { StoryCardType } from "@/types/story-card-type";
import Hero from "@/components/Hero";
import StoryCard from "@/components/StoryCard";
import SearchForm from "@/components/SearchForm";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query || "";

  return (
    <div>
      <section className="primary_container">
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
