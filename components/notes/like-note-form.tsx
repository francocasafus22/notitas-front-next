"use client"

import React, { useActionState } from 'react'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import { likeNoteAction } from '@/actions/notes/like-action'

export default function LikeNoteForm({post}: {post: any}) {
  
  const likeNoteWithNoteId = likeNoteAction.bind(null, post._id)  

  const [ state, dispatch, isPending ] = useActionState(likeNoteWithNoteId ,{ 
    errors: [],
    success: ""
  })

  return (
    <form action={dispatch}>
        <Button 
        className={`hover:bg-destructive transition-all duration-300 cursor-pointer ${post.likedByUser && "bg-destructive"}`}
        onClick={(e)=>e.stopPropagation()}
        >
            {
              isPending ? <p>...</p> : <><Heart/>{post.likesCount || 0}</>
            }
      </Button>
    </form>
  )
}
