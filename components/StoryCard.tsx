import Image from "next/image";
import Link from "next/link";
import { StoryCardType } from "@/types/story-card-type"
import { formatDate } from "@/lib/utils"

const StoryCard = ({ story }: { story: StoryCardType }) => {
  const { title, author, views, category, _createdAt } = story;

  return (
    <li className="cursor-pointer story-card group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Story Date and Views */}
      <div className="flex-between p-4 border-b border-gray-100">
        <p className="text-sm text-gray-500">
          {formatDate(_createdAt)}
        </p>

        <div className="flex items-center gap-1.5">
          <span className="text-sm text-gray-500">{views} views</span>
        </div>
      </div>

      {/* Story Title and Author */}
      <div className="flex-between p-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>

          <p className="text-sm text-gray-600 mt-1 line-clamp-1">
            by {author?.name}
          </p>
        </div>
        <div className="ml-4">
          <Image
            src={author?.image}
            alt={author?.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </div>
      </div>

      {/* Category and Details Button */}
      <div className="flex-between p-4 border-t border-gray-100">
        <p className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
          {category}
        </p>

        <button className="story-card_btn bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
          <Link href={`/story/${story._id}`}>
            <span className="text-sm font-medium">Details</span>
          </Link>
        </button>
      </div>
    </li>
  );
};


export default StoryCard
