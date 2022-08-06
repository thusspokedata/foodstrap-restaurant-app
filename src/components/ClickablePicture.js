import React from "react";
import { useState } from "react";

export default function ClickablePicture({ img, imgClicked }) {
  const [image, setImage] = useState(true);
  function handleClick() {
    setImage(!image);
  }

  return (
    <img
      onClick={handleClick}
      src={image ? img : imgClicked}
      className="figure-img img-fluid rounded bg-secondary bg-opacity-25"
      alt=""
    />
  );
}
