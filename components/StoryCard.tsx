import Image from "next/image";
import Link from "next/link";
import { StoryCardType } from "@/types/story-card-type"
import { formatDate } from "@/lib/utils"

const StoryCard = ({ story }: { story: StoryCardType }) => {
  const {
    title,
    description,
    author,
    image,
    views,
    category,
    _createdAt,
  } = story;

  return (
    <li className="story-card group">
      {/* Story Date and Views */}
      <div className="flex-between">
        <p className="story_card_date">
          {formatDate(_createdAt)}
        </p>

        <div className="flex gap-1.5">
          <span className="text-16-medium">
            {views}
          </span>
        </div>
      </div>

      {/* Story Title and Author */}
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <p className="text-16-medium line-clamp-1">
            {author?.name}
          </p>

          <h3 className="text-26-semibold line-clamp-1">
            {title}
          </h3>
        </div>

        <Image
          src={author?.image}
          alt={author?.name}
          width={48}
          height={48}
          className="rounded-full"
        />
      </div>

      {/* Story Description and Image */}
      <div>
        <p className="story-card_desc">
          {description}
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt="placeholder"
          className="story-card_img"
        />
      </div>

      <div className="flex-between gap-3 mt-5">
        <p className="text-16-medium">{category}</p>

        <button className="story-card_btn">
          <Link href={`/story/${story._id}`}>
            Details
          </Link>
        </button>
      </div>
    </li>
  )
}

export default StoryCard
