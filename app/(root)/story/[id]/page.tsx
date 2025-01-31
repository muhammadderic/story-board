import Image from "next/image";
import { stories } from "@/data/stories"
import { formatDate } from "@/lib/utils"

const Page = () => {
  const story = stories[0];

  return (
    <>
      {/* <section className="w-full bg-primary min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6 !min-h-[230px]"> */}
      <section className="w-full bg-primary flex justify-center items-center flex-col py-10 px-6 !min-h-[150px]">
        <p className="bg-secondary px-6 py-3 font-bold rounded-sm uppercase relative tag-tri">
          {formatDate(story?._createdAt)}
        </p>

        <h1 className="uppercase bg-black px-6 py-3 mx-auto text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
          {story.title}
        </h1>

        {/* <p className="font-medium text-[20px] text-white max-w-2xl text-center break-words !max-w-5xl"> */}
        <p className="font-medium text-[20px] text-white text-center break-words !max-w-5xl">
          {story.description}
        </p>
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto">
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

            <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full">{story.category}</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Page