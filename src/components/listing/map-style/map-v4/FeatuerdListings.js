import PropertyCard from "@/components/common/PropertyCard";
import SharePropertyModal from "@/components/menu/SharePropertyModal";
import { useAppContext } from "@/custom-hooks/AppContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ContentLoader from 'react-content-loader'

const FeaturedListings = ({
  data,
  colstyle,
  listings,
  handleClickProperty,
  loading
}) => {
  const router = useRouter();
  const { handleGetLikedProperty } = useAppContext();
  const handleClickPropertyButton = (listing) => {
    router.replace(
      `/properties?propertyAddress=${listing.UnparsedAddress?.replaceAll(
        " ",
        "-"
      )}__${listing.ListingKey}`
    );
    handleClickProperty(listing);
  };
  return (
    <>
      {listings
        .filter((listing) => listing.Media && listing.Media.length > 0)
        .map((listing) => {
          const isLiked = handleGetLikedProperty(listing?.ListingKey);
          return (
            <div
              className={` ${
                colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-6"
              } mb-4`}
              key={listing.id} // Unique key prop added here
            > 
              {loading ? (
              <ContentLoader viewBox="0 0 500 280" speed={2} backgroundColor="#cccccc" foregroundColor="#a1a1a1" height={375} width={500}>
                <rect x="3" y="3" rx="10" ry="10" width="300" height="180" />
                <rect x="6" y="190" rx="0" ry="0" width="292" height="20" />
                <rect x="4" y="215" rx="0" ry="0" width="239" height="20" />
                <rect x="4" y="242" rx="0" ry="0" width="274" height="20" />
              </ContentLoader>
              ) : (
                <PropertyCard
                  handleClickProperty={handleClickPropertyButton}
                  listing={listing}
                />
              )}
            </div>
          );
        })}
    </>
  );
};

export default FeaturedListings;
