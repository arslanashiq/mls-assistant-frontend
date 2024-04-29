"use client";
import { LISTING_STATUS } from "@/utilis/constants";
import { debounce } from "@/utilis/debounce";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

const HeroContent = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(LISTING_STATUS[1]?.value);
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState([]);
  const [properties, setPoperties] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [propertyData, setPropertyData] = useState(null); // Store fetched property data
  const [isGoogleSuggestion, setIsGoogleSuggestion] = useState(false);
  const [isBridgeSuggestion, setIsBridgeSuggestion] = useState(false);
  const [newSearch, setNewSearch] = useState('');
  const [isMobile, setIsMobile] = useState(false); // State to determine if user is on mobile
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() !== "") {
      debounce(() => {
        fetchSuggestions(value);
        fetchBridgesSuggestions(value);
      }, 500);
    } else {
      setShowSuggestions(false);
    }
  };

  const fetchSuggestions = async (value) => {
    try {
      const placesService = new google.maps.places.AutocompleteService();
      placesService.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: "us" },
          types: ["(cities)"],
        },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            const cityNames = predictions.map((prediction) => {
              const [city, state] = prediction.description
                .split(", ")
                .slice(0, 2);
              return { name: `${city}, ${state}`, id: null };
            });
            setCities(cityNames);
            setShowSuggestions(true);
            setIsGoogleSuggestion(true);
          } else {
            setIsBridgeSuggestion(false)
            setIsGoogleSuggestion(false);
            fetchBridgesSuggestions(value);
          }
        }
      );
    } catch (error) {
      // console.error("Error fetching suggestions:", error);
    }
  };

  const getCitiesDataFromBridgeApiResponse = (data) => {
    //console.log(data);
    return data.map((property) => ({
      name: property.UnparsedAddress,
      id: property.ListingKey,
    }));
  };
  const fetchBridgesSuggestions = async (value) => {
    try {
      const response = await fetch(
        `https://api.bridgedataoutput.com/api/v2/mlspin/listings?access_token=23c8729a55e9986ae45ca71d18a3742c&fields=UnparsedAddress&UnparsedAddress.in=${value}`
        // `https://api.bridgedataoutput.com/api/v2/OData/mlspin/Property?access_token=23c8729a55e9986ae45ca71d18a3742c&$filter=contains(tolower(UnparsedAddress), tolower('${value}'))&$select=UnparsedAddress`
      );
      const data = await response.json();
      if (data.bundle.length > 0) {
        setIsBridgeSuggestion(true)
        getCitiesDataFromBridgeApiResponse(data.bundle)
        setCities(getCitiesDataFromBridgeApiResponse(data.bundle));
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Error fetching Bridge suggestions:", error);
    }
  };

  const handleSuggestionClick = async (city, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isGoogleSuggestion) {
      const cityNameWithoutCommas = city?.name.replace(/,/g, '');
      setSearchTerm(cityNameWithoutCommas);
    } else {
      setSearchTerm(city?.name); // Set the search term directly if it's a Bridge suggestion
    }
    setSelectedSuggestion(city); // Set the selected suggestion
    setShowSuggestions(false);
    await handleSubmit(e);
  };
  const handleGetAddress = (selectedCity = {}) => {
    if (selectedCity?.id) {
      return selectedCity?.name?.split(",")?.[1]?.replace(/,\s*/g, " ");
    }
    return selectedSuggestion?.replace(/,\s*/g, " ");
  };
  const handleGetPropertyId = (selectedCity) => {
    //console.log(selectedCity);
    if (selectedCity?.id) {
      return `&propertyId=${selectedCity.id}`;
    }
    return "";
  };
  const handleGetSearchTerm = (selectedCity) => {
    if (selectedCity?.id) {
      return selectedCity?.name?.split(",")?.[1]?.replace(/,\s*/g, " ");
    }
    return searchTerm
      .replace(/,/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic based on selected suggestion or bridge suggestion
    if (!selectedSuggestion && !isBridgeSuggestion) {
      const allCities = cities?.[0].name;
      const cityNameWithoutCommas = allCities.replace(/,/g, '');
      setSearchTerm(cityNameWithoutCommas);
      var url = `/properties?address=${encodeURIComponent(cityNameWithoutCommas)}&listingStatus=${activeTab}${handleGetPropertyId(cities?.[0].id)}`;
      router.push(url);
    }
    else if (isGoogleSuggestion) {
      const cityNameWithoutCommas = selectedSuggestion?.name.replace(/,/g, '');
      setSearchTerm(cityNameWithoutCommas);
      var url = `/properties?address=${encodeURIComponent(cityNameWithoutCommas)}&listingStatus=${activeTab}${handleGetPropertyId(cities?.[0].id)}`;
      router.push(url);
    } else if (isBridgeSuggestion && !selectedSuggestion) {
      var url = `/properties?address=${encodeURIComponent(handleGetSearchTerm(cities?.[0]))}&type=${activeTab}${handleGetPropertyId(cities?.[0])}`;
      router.push(url);
    }
  };


  useEffect(() => {
    if (showModal) {
      // When modal is visible, add styles to the body
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // When modal is hidden, remove added styles
      document.body.style.height = '';
      document.body.style.overflow = '';
    }

    // Cleanup function
    return () => {
      document.body.style.height = '';
      document.body.style.overflow = '';
    };
  }, [showModal]);
  const showSearchModal = () => {
    setShowModal(true);
  }
  const searchInputRef = useRef(null);
  useEffect(() => {
    if (showModal) {
      searchInputRef.current.focus();
    }
  }, [showModal]);
  console.log(isGoogleSuggestion, isBridgeSuggestion)
  return (
    <>
    <main className='index' role='main'>
      <div className='searchbar-index'>
        <form id='searchbar' onSubmit={handleSubmit}>
          <div className='container'>
            <div className='searchbar'>
              <div className='form'>
                <div className='fields' id='typeahead'>
                  <input type='text' className='query typeahead' placeholder='Address, City, or Zip' value={searchTerm} onChange={handleInputChange}/>
                  <select className='type'>
                    <option value='1'>Buy</option>
                    <option value='2'>Rent</option>
                  </select>
                  <button className='button theme bgColor lightFontColor'>
                    <span className='label'>Search</span>
                    <i className='glass ion-ios-search-strong'></i>
                  </button>
                  </div>
                  {showSuggestions && cities.length > 0 && (
                    <ul className="search-suggestion">
                      {cities.map((city, index) => (
                        <li
                          key={index}
                          onClick={(e) =>
                            handleSuggestionClick(city, e)
                          }
                        >
                          {city.name}
                        </li>
                      ))}
                    </ul>
                  )}
                <div className='powered-by'>
                  <a href='http://ULTRAMLS.com'>
                    Powered by <strong className='theme bgColor lightFontColor'>ULTRAMLS &trade;</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
      {showModal ? (
        <div className="search-popup">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className={`search-header ${isMobile ? 'sticky-header' : ''}`}>
                <button onClick={() => setShowModal(false)} type="button" className="btn-back">
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <input
                  className="form-control "
                  type="text"
                  name="search"
                  placeholder={`Search by City, State & Zipcode... `}
                  value={searchTerm}
                  ref={searchInputRef}
                  onChange={(e) => handleInputChange(e)}
                />
            </div>
            <div className="container mt75">
              <div className="radio-group">
                <input type="radio" id="option-one" name="selector" onClick={() => handleTabClick(LISTING_STATUS[0]?.value)} checked={activeTab === LISTING_STATUS[0]?.value} />
                <label htmlFor="option-one">{LISTING_STATUS[0]?.label}</label>
                <input type="radio" id="option-two" name="selector" onClick={() => handleTabClick(LISTING_STATUS[1]?.value)} checked={activeTab === LISTING_STATUS[1]?.value} />
                <label htmlFor="option-two">{LISTING_STATUS[1]?.label}</label>
                <input type="radio" id="option-three" name="selector" onClick={() => handleTabClick(LISTING_STATUS[2]?.value)} checked={activeTab === LISTING_STATUS[2]?.value} />
                <label htmlFor="option-three">{LISTING_STATUS[2]?.label}</label>
              </div>
            </div>

            <div className="container">
              {showSuggestions && cities.length > 0 && (
                <ul className="search-suggestion">
                  {cities.map((city, index) => (
                    <li
                      key={index}
                      onClick={(e) =>
                        handleSuggestionClick(city, e)
                      }
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </form>
        </div>
      ): null}
    </>
  );
};

export default HeroContent;
