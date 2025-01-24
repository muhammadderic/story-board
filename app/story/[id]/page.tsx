import Image from "next/image";
import { stories } from "@/data/stories"
import { formatDate } from "@/lib/utils"

const Page = () => {
  const story = stories[0];

  return (
    <>
      <section className="primary_container !min-h-[230px]">
        <p className="tag">
          {formatDate(story?._createdAt)}
        </p>

        <h1 className="heading">
          {story.title}
        </h1>

        <p className="sub-heading !max-w-5xl">
          {story.description}
        </p>
      </section>

      <section className="section_container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={story.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <div className="flex gap-2 items-center mb-3">
              <Image
                src={story.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{story.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{story.author.name}
                </p>
              </div>
            </div>

            <p className="category-tag">{story.category}</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Page
