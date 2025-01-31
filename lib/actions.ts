"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";

export const createStory = async (form: FormData, story: string) => {
  const session = await auth();

  console.log(session)

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    })
  }

  const { title, category } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "story"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const newStory = {
      title,
      category,
      slug: {
        _type: slug,
        current: slug,
      },
      // author: {
      //   _type: "reference",
      //   _ref: session?.id,
      // },
      story: story,
    };

    console.log(newStory);
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
}