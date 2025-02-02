"use client"

import { useActionState, useState } from "react";
import { Input } from "./ui/input"
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import MDEditor from "@uiw/react-md-editor";
import { formSchema } from "@/lib/validation";
import { createStory } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";

const StoryForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [story, setStory] = useState("");

  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmitStory = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get('title') as string,
        category: formData.get('category') as string,
        story,
      }

      await formSchema.parseAsync(formValues);

      const result = await createStory(formData, story);

      if (result.status == "SUCCESS") {
        router.push(`/story/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof ZodError) {
        // Convert Zod errors to a key-value pair object
        const newErrors: Record<string, string> = {};

        error.errors.forEach((err) => {
          const field = err.path[0];
          newErrors[field] = err.message;
        });

        setErrors(newErrors);
      } else {
        console.error("An unexpected error occurred:", error);
      }
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

        {errors.title && <p className="story-form_error">{errors.title}</p>}
      </div>

      {/* Input Story Category */}
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

        {errors.category && <p className="story-form_error">{errors.category}</p>}
      </div>

      {/* Input Story Content */}
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

        {errors.story && <p className="story-form_error">{errors.story}</p>}
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
