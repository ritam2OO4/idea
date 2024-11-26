import SearchForm from "../../components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = (await searchParams).query || ""; // Extract the `query` parameter safely
  
  return (
    <>2
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br />Connect with Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, And Get Noticed In Virtual Competitions.
        </p>
        <SearchForm query={query} />
      </section>
    </>
  );
}