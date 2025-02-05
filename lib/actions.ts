"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createStory = async (form: FormData, story: string) => {
  const session = await auth();

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
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      story: story,
    };

    const result = await writeClient.create({ _type: "story", ...newStory });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
}

export const updateStory = async (
  id: string,
  updatedTitle: string,
  updatedCategory: string,
  updatedStory: string
) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  const slug = slugify(updatedTitle as string, { lower: true, strict: true });

  try {
    const updatedStoryObject = {
      _type: "story",
      title: updatedTitle,
      category: updatedCategory,
      slug: {
        _type: "slug",
        current: slug,
      },
      story: updatedStory,
    };

    const result = await writeClient
      .withConfig({ useCdn: false })
      .patch(id) // Target the document by its ID
      .set(updatedStoryObject) // Update with new data
      .commit(); // Apply changes

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const deleteStory = async (id: string) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  try {
    // Delete the document by its ID
    const result = await writeClient
      .withConfig({ useCdn: false })
      .delete(id) // Target the document by its ID

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};