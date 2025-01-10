// import { sanityFetch } from '@/lib/live'
import { formatDate } from '@/lib/utils'
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_QUERY_BY_ID } from '@/sanity/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/Skeleton'
import View from '@/components/view'
import { client } from '@/sanity/lib/client'
import StartupCard, { StartupCardSkeleton, startupTypeCard } from '@/components/StartupCard'

const md = markdownit()


async function page({ params }: { params: { id: string } }) {

    const id = ((await params).id)

    const [post , { select: editorPosts }] = await Promise.all([client.fetch(STARTUP_QUERY_BY_ID, { id }), client.withConfig({ useCdn: false }).fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "top-picks" })]) //parallel fetching
    if (!post) return notFound()
    console.log(editorPosts.length)
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
                {editorPosts.length > 0 && (
                    <div className='max-w-4xl mx-auto '>
                        <p className='text-30-semibold'>Editor Top Picks</p>
                        <ul className='mt-7 card_grid-sm'>
                            {editorPosts.map((post: startupTypeCard, i: number) => (
                                <Suspense fallback={<StartupCardSkeleton />} key={i}>
                                    <StartupCard post={post} key={i} />
                                </Suspense>
                            ))}
                        </ul>
                    </div>
                )}

                <Suspense fallback={<Skeleton className="view_skeleton" />}>
                    <View id={id} />
                </Suspense>

            </section>
        </>
    )
}

export default page
