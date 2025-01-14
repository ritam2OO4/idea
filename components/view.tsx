import React from 'react'
import Ping from "@/components/ping"
import { sanityFetch } from '@/lib/live'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'
import { after } from 'next/server'
import { client } from '@/sanity/lib/client'
async function view({ id }: { id: string }) {
    const { views } = await client.withConfig({useCdn:false}).fetch(STARTUP_VIEWS_QUERY ,{ id })
    // const {views} = TotalViews
    after(async () =>
        await writeClient
        .patch(id)
        .set({ views: views + 1 })
        .commit())
    return (
        <div className='view-container'>
            <div className='absolute -top-2 -right-2'>
                <Ping />
            </div>
            <p className='view-text'>
                <span className='font-black'>{views} {views > 1 ? ("views") : ("view")}</span>
            </p>
        </div>
    )
}

export default view
