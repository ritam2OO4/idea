import { title } from "process";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import img from "../../public/startup.avif";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

export default async function Home({
searchParams}: {
  searchParams: { query?: string };
}) {
  const query = (await searchParams).query || ""; // Extract the `query` parameter safely

  const posts = await client.fetch(STARTUP_QUERY)

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
          {query ? `search Result for ${query}` : `All Startups`}
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
    </>
  );
}
