"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import markdownit from "markdown-it";

import { deleteStory, updateStory } from "@/lib/actions";
import { formatDate } from "@/lib/utils"

import { client } from "@/sanity/lib/client";
import { STORY_BY_ID_QUERY } from "@/sanity/lib/queries";
import { Story } from "@/sanity/types";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Spinner from "@/components/Spinner";
import { ConfirmationModal } from "@/components/ConfirmationModal";

const md = markdownit();

const Page = ({ params }: { params: { id: string } }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [storyData, setStoryData] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [editedLoading, setEditedLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Form fields state
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedStory, setUpdatedStory] = useState("");

  const router = useRouter();

  // Click handlers
  const handleEditClick = async () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async () => {
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  // Handle form submission
  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    const { id } = (await params);
    try {
      const result = await deleteStory(id);

      // Simulate a 3-second delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (result.status == "SUCCESS") {
        router.push(`/`);
      }
    } catch (error) {
      console.error("Error deleting story:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id } = (await params);

    try {
      setEditedLoading(true);

      const result = await updateStory(id, updatedTitle, updatedCategory, updatedStory);

      // Simulate a 3-second delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      alert("Story updated successfully!");
      alert("[NEED YOU] I am sorry, the data will change in 60 seconds :)!");

      if (result.status == "SUCCESS") {
        router.push(`/story/${result._id}`);
      }
    } catch (error) {
      console.error("Error updating story:", error);
      alert("Failed to update story.");
    } finally {
      setEditedLoading(false);
      setIsEditModalOpen(false);
    }
  };

  // Fetch story data and pre-fill the form
  useEffect(() => {
    const fetchStoryData = async () => {
      const { id } = (await params);
      try {
        const data: Story | null = await client
          .withConfig({ useCdn: false })
          .fetch(STORY_BY_ID_QUERY, { id });

        if (data) {
          setStoryData(data);
          setUpdatedTitle(data.title as string);
          setUpdatedCategory(data.category as string);
          setUpdatedStory(data.story as string);
        }
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setLoading(false);
        console.log(storyData);
      }
    };

    fetchStoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const parsedStory = md.render(storyData?.story || "");

  if (loading) return <p>Loading story...</p>;

  return (
    <>
      <section className="w-full bg-black py-2 px-6">
        <div className="max-w-4xl flex justify-start gap-4">
          <button
            onClick={() => router.back()}
            className="text-white px-4 py-2 rounded border border-white hover:border-blue-600 transition-colors">
            Back
          </button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="w-full bg-black flex justify-center items-center flex-col py-20 px-6">
        <p className="bg-gradient-to-r from-blue-600 to-purple-500 px-6 py-2 font-bold rounded-full uppercase text-white text-sm tracking-wide shadow-lg">
          {storyData && formatDate(storyData._createdAt)}
        </p>

        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 sm:text-5xl text-3xl font-bold text-center max-w-4xl mx-auto mt-6 leading-tight">
          {storyData && storyData.title}
        </h1>
      </section>

      {/* Author and Category Section */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 max-w-4xl mx-auto">
          {/* Author Info */}
          {
            storyData && (
              <div className="flex items-center gap-4">
                <Image
                  src={storyData.author?.image}
                  alt="avatar"
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-white shadow-lg"
                />
                <div>
                  <p className="text-xl font-semibold">{storyData.author?.name}</p>
                  <p className="text-gray-600">@{storyData.author?.username}</p>
                </div>
              </div>
            )
          }

          {/* Category */}
          <p className="bg-primary-100 text-primary-dark font-medium text-sm px-6 py-2 rounded-full shadow-sm">
            {storyData && storyData.category}
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

      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto flex justify-end gap-4 border">
          <button
            onClick={handleEditClick}
            disabled={loading} // Disable the button while loading
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            {editedLoading ? (
              <Spinner text="Loading..." />
            ) : (
              "Edit"
            )}
          </button>

          <button
            onClick={handleDeleteClick}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
            Delete
          </button>
        </div>
      </section>

      {/* Edit Modal */}
      <Dialog
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit Story
            </DialogTitle>
            <DialogDescription>
              Update your story details below and save the changes.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Input
                type="text"
                value={updatedCategory}
                onChange={(e) => setUpdatedCategory(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Story</label>
              <Textarea
                value={updatedStory}
                onChange={(e) => setUpdatedStory(e.target.value)}
                rows={5}
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>

              <Button type="submit">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal to confirm story deletion */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Story"
        description="Are you sure you want to delete this story? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        changeLoading={deleteLoading}
      />
    </>
  );
}

export default Page