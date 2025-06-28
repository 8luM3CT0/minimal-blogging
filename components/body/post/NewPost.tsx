import React from 'react'

import {supabase} from '../../../backend/supabase'
import { notFound } from 'next/navigation'

export const revalidate = 0

export async function generateStaticParams() {
  const { data: neutral_posts } = await supabase.from('neutral_posts').select('id')

  return neutral_posts?.map(({ id }) => ({
    id,
  }))
}

export default async function NewPost({ params: { id } }: { params: { id: string } }) {
  const { data: neutral_post } = await supabase.from('neutral_posts').select().match({ id }).single()

  if (!neutral_post) {
    notFound()
  }

  return <pre>{JSON.stringify(neutral_post, null, 2)}</pre>
}
