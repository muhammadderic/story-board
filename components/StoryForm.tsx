"use client"

import { useActionState, useState } from "react";
import { Input } from "./ui/input"
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import MDEditor from "@uiw/react-md-editor";
import { formSchema } from "@/lib/validation";
import { createStory } from "@/lib/actions";

const StoryForm = () => {
  const [errors, setErrors] = useState("");
  const [story, setStory] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmitStory = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get('title') as string,
        category: formData.get('category') as string,
        story,
      }

      await formSchema.parseAsync(formValues);

      await createStory(formData, story);
      // console.log(formData);
    } catch (error) {
      console.log(error);
      setErrors('An unexpected error has occurred');
    }

    return {
      ...prevState,
      error: "An unexpected error has occurred",
      status: "ERROR",
    };
  }

  const [, formAction, isPending] = useActionState(handleSubmitStory, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="story-form">
      {/* Input Story Title */}
      <div>
        <label htmlFor="title" className="story-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="story-form_input"
          required
          placeholder="Story Title"
        />

        {errors && <p className="story-form_error">Title error</p>}
      </div>

      <div>
        <label htmlFor="category" className="story-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="story-form_input"
          required
          placeholder="Story Category (Fiction, Sci-Fi, Reality...)"
        />
      </div>

      <div>
        <label htmlFor="story" className="story-form_label">
          Your Story
        </label>

        <MDEditor
          value={story}
          onChange={(value) => setStory(value as string)}
          id="story"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Share your story with the world, start writing your journey here!",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors && <p className="story-form_error">Error story</p>}
      </div>

      <Button
        type="submit"
        className="story-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Story"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  )
}

export default StoryForm
