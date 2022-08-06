import React, { useState, useContext, useEffect } from "react";
import tableopen from "../assets/open.png";
import tableclose from "../assets/close.png";
import ClickablePicture from "./ClickablePicture";
import axios from "axios";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get("/api/restaurants", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setRestaurants(response.data);
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, []);

  /// creating figure tables
  let t = [];
  if (restaurants[0]) {
    for (let i = 0; i < restaurants[0].tables; i++) {
      t.push(i);
    }
  }

  const figures = t.map((table, i) => {
    return (
      <a href={`/${i}`} key={`${i}`}>
        <figure className="figure m-2 m-sm-3 m-lg-4 col-5 col-sm-3 col-lg-2">
          <ClickablePicture img={tableopen} imgClicked={tableclose} />
        </figure>
      </a>
    );
  });

  return (
    <div className="card mt-5">
      <div className="card-content p-3">
        <div className="col-12">{figures}</div>
      </div>
    </div>
  );
}

export default Home;
