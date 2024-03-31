import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const conversionList = [
  "itemsPerPage",
  "pageNumber",
  "currentSortingOption",
  "listingStatus",
  "activeStatus",
  "minPriceRange",
  "maxPriceRange",
  "bedrooms",
  "bathroms",
  "address",
  "currentSortingOption",
];
function usePropertySearchParams() {
  const searchParams = useSearchParams();

  const getParamsObject = () => ({
    itemsPerPage: searchParams.get("itemsPerPage") || 10,
    pageNumber: searchParams.get("pageNumber") || 1,
    orderby: searchParams.get("orderby") || "Newest",
    listingStatus: searchParams.get("listingStatus") || "All",
    activeStatus: searchParams.get("activeStatus") || "Active",
    minPriceRange: searchParams.get("minPriceRange") || 0,
    maxPriceRange: searchParams.get("maxPriceRange") || 1000000,
    bedrooms: searchParams.get("bedrooms") || 0,
    bathroms: searchParams.get("bathroms") || 0,
    propertyAddress: searchParams.get("propertyAddress") || "",
    address: searchParams.get("address") || "",
    propertyId: searchParams.get("propertyId") || "",
    currentSortingOption: searchParams.get("currentSortingOption") || "Newest",
  });
  const [paramsObject, setParamsObject] = useState(getParamsObject());

  const convertParamsObjectToString = (incomingObject = paramsObject) => {
    const newObject = {
      ...paramsObject,
      ...incomingObject,
    };

    let string = "";
    let isFirstKey = true;

    conversionList.map((item) => {
      if (isFirstKey) {
        isFirstKey = false;
        string += `${item}=${newObject[item]}`;
      } else {
        string += `&${item}=${newObject[item]}`;
      }
    });
    return string;
  };
  const splitPropertyAddress = (name) => {
    if (name == 0) {
      return paramsObject?.propertyAddress
        ?.split("__")?.[0]
        ?.split(",")?.[1]
        ?.replaceAll("-", " ")
        ?.trim();
    }
    if (name == 1) {
      return paramsObject?.propertyAddress?.split("__")?.[1];
    }
  };

  useEffect(() => {
    setParamsObject(getParamsObject());
  }, [searchParams]);

  return {
    splitPropertyAddress,
    convertParamsObjectToString,
    conversionList,
    paramsObject: { ...paramsObject },
  };
}

export default usePropertySearchParams;
