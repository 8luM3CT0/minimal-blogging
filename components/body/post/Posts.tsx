import React from 'react'

import Link from 'next/link'
import {supabase} from '../../../backend/supabase'

export const revalidate = 0

export default async function Posts() {
  const { data: neutral_posts } = await supabase.from('neutral_posts').select('id, title')

  if (!neutral_posts) {
    return <p>No posts found.</p>
  }

  return neutral_posts.map((post) => (
    <p key={post.id}>
      <Link href={`/static/${post.id}`}>{post.title}</Link>
    </p>
  ))
}
