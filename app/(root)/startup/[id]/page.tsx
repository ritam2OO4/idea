// import { sanityFetch } from '@/lib/live'
import { formatDate } from '@/lib/utils'
import { STARTUP_QUERY_BY_ID } from '@/sanity/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/Skeleton'
import View from '@/components/view'
import { client } from '@/sanity/lib/client'

const md = markdownit()

export const experimental_ppr = true

async function page({ params }: { params: { id: string } }) {

    const id = ((await params).id)

    // const { data: post } = await sanityFetch({ query: STARTUP_QUERY_BY_ID, params: { id } })
    const post = await client.fetch(STARTUP_QUERY_BY_ID, { id })  // fetching with client despites of sanityFetch tu cache the data for 60 sec rather than extracting it live

    if (!post) return notFound()

    const parseContent = md.render(post?.pitch || null);
    return (
        <>
            <section className='pink_container !min-h-[230px]'>
                <p className='tag'>{formatDate(post?._createdAt)}</p>
                <h1 className='heading'>{post.title}</h1>
                <p className='sub-heading !max-w5xl'>{post.description}</p>
            </section>
            <section className='section_container !min-h-screen'>
                <img src={post.image} alt={"startup_img"} className='w-full h-auto rounded-xl' />
                <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
                    <div className='flex-between gap-5'>
                        <Link href={`/user/${post.author?._id}`}
                            className='flex gap-2 items-center mb-3'>
                            <Image
                                src={post.author?.image}
                                alt='list'
                                width={64}
                                height={64}
                                className='rounded-full drop-shadow-lg object-cover !h-[64px]'
                            />
                            <div>
                                <p className='text-20-medium'>{post.author?.name}</p>
                                <p className='text-16-medium !text-black-300'>{post.author?.username}</p>
                            </div>
                        </Link>
                        <p className='category-tag'>{post.category}</p>
                    </div>
                    <h3 className='text-30-bold'>Pitch Details!! </h3>
                    {parseContent ? (
                        <article
                            className='porse max-w-4xl font-work-sans break-all'
                            dangerouslySetInnerHTML={{ __html: parseContent }} />

                    ) : (<p className='no-result'>No Details Provided</p>)}
                </div>
                <hr className='divider' />
                {/* {editor seltected startup} */}

                <Suspense fallback={<Skeleton className="view_skeleton" />}>
                    <View id={id} />
                </Suspense>

            </section>
        </>
    )
}

export default page
