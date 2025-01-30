import { auth } from "@/auth"
import StoryForm from "@/components/StoryForm"
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) redirect('/');
  return (
    <>
      <section className="section_container !min-h-[230px]">
        <h1 className="heading">Submit Your Story</h1>
      </section>

      <StoryForm />
    </>
  )
}

export default Page
