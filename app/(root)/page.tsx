import { title } from "process";
import SearchForm from "../../components/SearchForm";
import StartupCard, { startupTypeCard } from "@/components/StartupCard";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/lib/live";
export default async function Home({
  searchParams }: {
    searchParams: { query?: string };
  }) {
  const query = (await searchParams).query || ""; // Extract the `query` parameter safely
  const params = { search: query || null }

  // const posts = await client.fetch(STARTUP_QUERY)
  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY ,params})

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br />Connect with Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, And Get Noticed In Virtual Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `search Result for "${query}"` : `All Startups`}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: startupTypeCard, index: number) => (
              <StartupCard post={post} key={post?._id} />
            ))
          ) : (
            <p className="no_results">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
