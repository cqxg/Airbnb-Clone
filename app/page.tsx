import ClientOnly from "./components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings, { IListingsParams } from "@/app/actions/getListings";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  const listingsList = listings.map((listing: any) => (
    <>
      <span>{listing.title}</span>
      <span>{listing.description}</span>
      <span>{listing.category}</span>
      <span>{listing.roomCount}</span>
      <span>{listing.bathroomCount}</span>
      <span>{listing.guestCount}</span>
      <span>{listing.locationValue}</span>
      <span>{listing.price}</span>
    </>
  ));

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            grid
            pt-24
            gap-8
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
          "
        >
          {listingsList}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
