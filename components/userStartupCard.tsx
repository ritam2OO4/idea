import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard, { startupTypeCard } from './StartupCard'

async function userStartupCard({ id }: { id: string }) {
    const Startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id })
    console.log(Startups)
    return (
        <>
            {Startups.length > 0 ? (Startups.map((startup:startupTypeCard)=>(<StartupCard key={startup._id} post={startup}/>))):(<p className='no-result'>No Posts Yet!!</p>)}
        </>
    )
}

export default userStartupCard
