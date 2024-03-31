import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import SharePropertyModal from "../menu/SharePropertyModal";
import { useAppContext } from "@/custom-hooks/AppContext";
import { useState } from "react";

function PropertyCard({ listing, handleClickProperty = () => {} }) {
  const {
    handleUnLikeProperty,
    handleLikeProperty,
    handleShareProperty,
    handleGetLikedProperty,
    likedProperties
  } = useAppContext();
  const handleClickLikeButton = (listing) => {
    const isLiked = handleGetLikedProperty(listing?.ListingKey);
    if (isLiked) {
      handleUnLikeProperty(isLiked);
    } else {
      handleLikeProperty(listing);
    }
  };

  const isLiked=useMemo(() => handleGetLikedProperty(listing.ListingKey)||false, [likedProperties])

  return (
    <div className="listing-style1 mb-0">
      <div className="list-thumb">
        <Image
          width={382}
          height={248}
          className="w-100 h-100 cover"
          src={listing.Media[0].MediaURL}
          alt="listings"
          onClick={() => handleClickProperty(listing)}
        />
        <button onClick={() => handleClickLikeButton(listing)} className="like-button">
          <span className={isLiked ? "fa-solid fa-heart color-red" : "flaticon-like"}/>
        </button>
      </div>
      <div className="list-content">
        <h4 onClick={() => handleClickProperty(listing)} className="mb0">
          $
          {listing.ListPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h4>
        <div className="list-meta d-flex align-items-center" onClick={() => handleClickProperty(listing)}>
          <a href="#" className="bdrr1 pr10 mr0">
            {listing.BedroomsTotal} bed
          </a>
          <a href="#" className="bdrr1 pr10 mr0 ml5">
            {listing.BathroomsFull} bath
          </a>
          <a href="#" className="pr10 mr0 ml5">
            {listing.LivingArea} sqft
          </a> -
          for{" "}
              {listing?.PropertyType === "Residential Lease" ||
              listing?.PropertyType === "Commercial Lease"
                ? "rent"
                : "sale"}
        </div>
        <p className="pb0 m-0" onClick={() => handleClickProperty(listing)}>{listing.UnparsedAddress}</p>
        <div>
        </div>
        <SharePropertyModal
          data={listing}
          shareButtonType={1}
          handleShareProperty={(inputs, setInputs, handleClose) => {
            handleShareProperty(listing, inputs, setInputs, handleClose);
          }}
        />
      </div>
    </div>
  );
}

export default PropertyCard;
