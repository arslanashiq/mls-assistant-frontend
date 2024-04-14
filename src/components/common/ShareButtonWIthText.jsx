import React from "react";

function ShareButtonWIthText({ open, handleClick }) {
  return (
    <button
      className="icon icon-custom"
      onClick={handleClick}
      type="button"
    >
      <i class="fa-solid fa-arrow-up-from-bracket me-2"></i>
      Share
    </button>
  );
}

export default ShareButtonWIthText;
