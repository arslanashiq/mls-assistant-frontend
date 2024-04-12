import {
  add_customer_property,
  delete_customer_property,
  get_customer_property,
  share_property_via_email,
} from "@/DAL/save-property";
import { change_password } from "@/DAL/user";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { createContext, useState, useEffect, useContext } from "react";
import domainsData from "@/data/domains.json";

const MyContext = createContext();
export const useAppContext = () => useContext(MyContext);
function AppContext({ children }) {
  // ==========================hooks=========================//

  const router = useRouter();

  // ======================states==============================//
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [likedProperties, setLikedProperties] = useState([]);
  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);
  const [currentDomain, setCurrentDomain] = useState("");
  const [isDomainAvailable, setIsDomainAvailable] = useState(false);
  const [proUsername, setProUsername] = useState("");
  const [isProUser, setIsProUser] = useState(false);
  const [matchedJsonObject, setMatchedJsonObject] = useState({});
  // ================================handlers and functions===============//
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setisLoggedIn(false);
  };

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };
  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const fetchLikedProperties = async () => {
    const response = await get_customer_property();
    if (response.code === 200) {
      setLikedProperties(response?.customer_property?.property_data);
    }
  };


  const checkDomainAvailability = (domain) => {
    return domainsData.domains.some((item) => item.domain === domain);
  };

  const extractUsernameFromPath = (path) => {
    const parts = path.split('/pro/');
    if (parts.length === 2) {
      return parts[1].split('/')[0];
    }
    return null;
  };

  const checkProSlugAvailability = (username) => {
    return domainsData.domains.some((item) => item.slug === username);
  };

useEffect(() => {
  const currentDomain = window.location.hostname;
  setCurrentDomain(currentDomain);

  const isDomainAvailable = checkDomainAvailability(currentDomain);
  setIsDomainAvailable(isDomainAvailable);

  // Check if pro username is set in localStorage
  const proUsernameLocalStorage = localStorage.getItem('proUsername');
  if (proUsernameLocalStorage) {
    setProUsername(proUsernameLocalStorage);

    // Check if the pro username is available
    const isProUser = checkProSlugAvailability(proUsernameLocalStorage);
    setIsProUser(isProUser);

    // Find and set the matched JSON object
    const matchedObject = domainsData.domains.find(item => {
      console.log("Domain:", item.domain, "ProUsername:", item.slug);
      return item.domain === currentDomain || item.slug === proUsernameLocalStorage;
    });
    console.log("Matched Object:", matchedObject);
    setMatchedJsonObject(matchedObject);
  } else {
    // If pro username is not set in localStorage, proceed with extracting it from the URL path
    const proUsername = extractUsernameFromPath(window.location.pathname);
    setProUsername(proUsername);

    const isProUser = checkProSlugAvailability(proUsername);
    setIsProUser(isProUser);

    // Find and set the matched JSON object
    const matchedObject = domainsData.domains.find(item => {
      console.log("Domain:", item.domain, "ProUsername:", item.slug);
      return item.domain === currentDomain && item.slug === proUsername;
    });
    console.log("Matched Object:", matchedObject);
    setMatchedJsonObject(matchedObject);
  }

  localStorage.setItem('currentDomain', currentDomain);
  localStorage.setItem('isDomainAvailable', isDomainAvailable.toString());

  const userExist =
    localStorage.getItem("token") && localStorage.getItem("user");
  if (userExist) {
    setisLoggedIn(true);
    fetchLikedProperties();
  } else {
    setLikedProperties([]);
  }
}, []);




  const handleGetLikedProperty = (ListingKey) =>
    likedProperties?.find(
      (property) => property?.data?.ListingKey == ListingKey
    );

  const handleLikeProperty = async (property) => {
    try {
      if (!isLoggedIn) {
        handleOpenLoginModal();
        return;
      }
      if (!property) return;
      delete property["@odata.id"];
      console.log(property, "asaasaa");
      const payload = {
        property_data: {
          data: property,
        },
      };
      setLikedProperties([...likedProperties, { data: property }]);
      const response = await add_customer_property(payload);

      if (response.code == 200) {
        enqueueSnackbar("Property added to save list", { variant: "success" });
      }
      fetchLikedProperties();
    } catch (error) {
      console.log("Somthing Went Wrong");
    }
  };
  const handleUnLikeProperty = async (property) => {
    if (!isLoggedIn) {
      handleOpenLoginModal();
      return;
    }
    likedProperties.splice(likedProperties.length - 1, 1);
    setLikedProperties([...likedProperties]);
    const response = await delete_customer_property(property._id);
    if (response.code == 200) {
      enqueueSnackbar("Property removed from saved list", {
        variant: "success",
      });
    }
    fetchLikedProperties();
  };
  const handleShareProperty = async (
    listing,
    inputs,
    setInputs,
    handleClose
  ) => {
    // if (!isLoggedIn) {
    //   handleOpenLoginModal();
    //   return;
    // }
    try {
      const data = { ...listing };
      delete data?.["@odata.id"];
      const payload = {
        ...inputs,
        property_object: data,
      };
      const response = await share_property_via_email(payload);
      if (response.code == 200) {
        enqueueSnackbar(`Property shared to ${payload?.receiver_email}`, {
          variant: "success",
        });
        setInputs({ sender_email: "", receiver_email: "" });
        handleClose();
      }
    } catch (error) {
      console.log("Error while sharing property");
    }
  };
  const getPropertyAddress = ({ UnparsedAddress, ListingKey }) => {
    return `${"/properties"}?propertyAddress=${UnparsedAddress?.replaceAll(
      " ",
      "-"
    )}__${ListingKey}`;
  };
  const handleClickProperty = (listing) => {
    router.push(getPropertyAddress(listing));
  };
  const handleChangePassword = async (inputs, handleClose) => {
    const payload = {
      old_password: inputs.old_password,
      new_password: inputs.new_password,
      confirm_password: inputs.confirm_password,
    };
    const respone = await change_password(payload);
    if (respone.code == 200) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setisLoggedIn(false);
      handleClose();
      enqueueSnackbar(respone.message, { variant: "success" });
      return;
    }
    enqueueSnackbar(respone.message, { variant: "error" });
  };
  const handleCloseResetPasswordModal = (setInputs, defaultInputValues) => {
    if (setInputs) {
      setInputs(defaultInputValues);
    }
    setOpenResetPasswordModal(false);
  };

  // ======================= useeffects==============================//
  useEffect(() => {
    const userExist =
      localStorage.getItem("token") && localStorage.getItem("user");
    if (userExist) {
      setisLoggedIn(true);
      fetchLikedProperties();
    } else {
      setLikedProperties([]);
    }
  }, [isLoggedIn]);

  const collection = {
    openLoginModal,
    setOpenLoginModal,
    isLoggedIn,
    setisLoggedIn,
    likedProperties,
    setLikedProperties,
    openResetPasswordModal,
    setOpenResetPasswordModal,
    handleLogout,
    getPropertyAddress,
    handleLikeProperty,
    handleOpenLoginModal,
    handleCloseLoginModal,
    handleGetLikedProperty,
    handleUnLikeProperty,
    handleShareProperty,
    handleClickProperty,
    handleChangePassword,
    handleCloseResetPasswordModal,
    currentDomain,
    isDomainAvailable,
    proUsername,
    isProUser,
    matchedJsonObject,
  };
  return <MyContext.Provider value={collection}>{children}</MyContext.Provider>;
}

export default AppContext;
