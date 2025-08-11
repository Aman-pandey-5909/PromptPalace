'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function WritePost({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prompt: '',
    tags: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    } else {
      console.log(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[30%] bg-white rounded-3xl p-4">
      <Input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <Textarea
        name="description"
        placeholder="Description"
        rows={3}
        value={formData.description}
        onChange={handleChange}
        required
      />

      <Textarea
        name="prompt"
        placeholder="Prompt"
        rows={4}
        value={formData.prompt}
        onChange={handleChange}
        required
      />

      <Input
        name="tags"
        placeholder="Tags (comma separated)"
        value={formData.tags}
        onChange={handleChange}
      />

      <div className="flex justify-end gap-2">
        <Button variant="outline" type="reset" onClick={() => setFormData({ title: '', description: '', prompt: '', tags: '' })}>
          Clear
        </Button>
        <Button type="submit">Post</Button>
      </div>
    </form>
  )
}
