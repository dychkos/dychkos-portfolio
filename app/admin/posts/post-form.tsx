"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { createPost, updatePost } from "./actions"
import type { Post } from "@prisma/client"

interface PostFormProps {
  post?: Post
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditing = !!post

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrors(null)
    setFormError(null)

    const formData = new FormData(event.currentTarget)

    try {
      const result = isEditing ? await updatePost(post.id, formData) : await createPost(formData)

      if (result?.error) {
        setErrors(result.error as Record<string, string[]>)
        setIsSubmitting(false)
      }
    } catch (error) {
      setFormError("An unexpected error occurred. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {formError && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{formError}</div>}

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Content
            </label>
            <Textarea
              id="content"
              name="content"
              rows={10}
              defaultValue={post?.content || ""}
              className={errors?.content ? "border-red-500" : ""}
            />
            {errors?.content && <p className="text-sm text-red-500">{errors.content[0]}</p>}
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/posts")} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

