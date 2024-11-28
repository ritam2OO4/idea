import { title } from "process";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import img from "../../public/startup.avif";

export default async function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = (await searchParams).query || ""; // Extract the `query` parameter safely

  const posts = [{
    _createdAt: new Date(),
    views: "55",
    author: { _id: 1, name: "Raju" },
    _id: 1,
    description: "This is a description",
    image: img, 
    category: "StartUp",
    title: "We Start"
  }]

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
