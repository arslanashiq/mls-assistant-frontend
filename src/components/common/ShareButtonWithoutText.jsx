import React from "react";

function ShareButtonWithoutText({ open, handleClick }) {
  return (
    <button onClick={handleClick} className="share-button">
      <i class="fa-solid fa-arrow-up-from-bracket me-1"></i>
    </button>
  );
}

export default ShareButtonWithoutText;
