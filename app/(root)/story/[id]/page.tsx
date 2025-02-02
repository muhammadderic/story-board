import Image from "next/image";
import { formatDate } from "@/lib/utils"
import { client } from "@/sanity/lib/client";
import { STORY_BY_ID_QUERY } from "@/sanity/lib/queries";
import markdownit from "markdown-it";

const md = markdownit();

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  const story = await client.fetch(STORY_BY_ID_QUERY, { id });

  const parsedStory = md.render(story.story || "");

  // return (
  //   <>
  //     <section className="w-full bg-primary flex justify-center items-center flex-col py-10 px-6 !min-h-[150px]">
  //       <p className="bg-secondary px-6 py-3 font-bold rounded-sm uppercase relative tag-tri">
  //         {formatDate(story?._createdAt)}
  //       </p>

  //       <h1 className="uppercase bg-black px-6 py-3 mx-auto text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
  //         {story.title}
  //       </h1>
  //     </section>

  //     <section className="px-6 py-10 max-w-7xl mx-auto">
  //       <div className="space-y-5 mt-10 max-w-4xl mx-auto">
  //         <div className="flex-between gap-5">
  //           <div className="flex gap-2 items-center mb-3">
  //             <Image
  //               src={story.author.image}
  //               alt="avatar"
  //               width={64}
  //               height={64}
  //               className="rounded-full drop-shadow-lg"
  //             />

  //             <div>
  //               <p className="text-20-medium">{story.author.name}</p>
  //               <p className="text-16-medium !text-black-300">
  //                 @{story.author.name}
  //               </p>
  //             </div>
  //           </div>

  //           <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full">{story.category}</p>
  //         </div>
  //       </div>
  //     </section>

  //     <section className="px-6 py-10 max-w-7xl mx-auto mb-10">
  //       <div className="space-y-5 mt-10 max-w-4xl mx-auto">
  //         <div className="flex flex-col gap-5">
  //           <h3 className="text-30-bold">Story</h3>

  //           {parsedStory ? (
  //             <article
  //               className="prose max-w-4xl font-work-sans break-all"
  //               dangerouslySetInnerHTML={{ __html: parsedStory }}
  //             />
  //           ) : (
  //             <p className="no-result">No story provided</p>
  //           )}
  //         </div>
  //       </div>
  //     </section>
  //   </>
  // )
  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-black flex justify-center items-center flex-col py-20 px-6">
        <p className="bg-gradient-to-r from-blue-600 to-purple-500 px-6 py-2 font-bold rounded-full uppercase text-white text-sm tracking-wide shadow-lg">
          {formatDate(story?._createdAt)}
        </p>

        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 sm:text-5xl text-3xl font-bold text-center max-w-4xl mx-auto mt-6 leading-tight">
          {story.title}
        </h1>
      </section>

      {/* Author and Category Section */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 max-w-4xl mx-auto">
          {/* Author Info */}
          <div className="flex items-center gap-4">
            <Image
              src={story.author.image}
              alt="avatar"
              width={80}
              height={80}
              className="rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <p className="text-xl font-semibold">{story.author.name}</p>
              <p className="text-gray-600">@{story.author.username}</p>
            </div>
          </div>

          {/* Category */}
          <p className="bg-primary-100 text-primary-dark font-medium text-sm px-6 py-2 rounded-full shadow-sm">
            {story.category}
          </p>
        </div>
      </section>

      {/* Story Content Section */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-8">Story</h3>

          {parsedStory ? (
            <article
              className="prose prose-lg max-w-none font-work-sans text-gray-700"
              dangerouslySetInnerHTML={{ __html: parsedStory }}
            />
          ) : (
            <p className="text-gray-500">No story provided.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Page