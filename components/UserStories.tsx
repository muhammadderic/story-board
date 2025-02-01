import { client } from "@/sanity/lib/client"
import { STORIES_BY_AUTHOR_QUERY } from "@/sanity/lib/queries"
import { StoryCardType } from "@/types/story-card-type";
import StoryCard from "./StoryCard";

const UserStories = async ({ id }: { id: string }) => {
  const stories = await client.fetch(STORIES_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {
        stories.length > 0 ? (
          stories.map((story: StoryCardType) => (
            <StoryCard key={story._id} story={story} />
          ))
        ) : (
          <p className="no-result">No stories found</p>
        )
      }
    </>
  )
}

export default UserStories
