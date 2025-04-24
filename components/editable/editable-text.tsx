"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface EditableTextProps {
  value: string
  onSave: (value: string) => Promise<void> | void
  className?: string
  multiline?: boolean
}

export function EditableText({ value, onSave, className = "", multiline = false }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    setText(value)
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = async () => {
    setIsEditing(false)
    if (text !== value) {
      await onSave(text)
    }
  }

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault()
      setIsEditing(false)
      if (text !== value) {
        await onSave(text)
      }
    }
    if (e.key === "Escape") {
      setIsEditing(false)
      setText(value)
    }
  }

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`w-full p-2 border rounded ${className}`}
          rows={5}
        />
      )
    }
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full p-2 border rounded ${className}`}
      />
    )
  }

  return (
    <span onDoubleClick={handleDoubleClick} className={`cursor-pointer ${className}`}>
      {text}
    </span>
  )
}
