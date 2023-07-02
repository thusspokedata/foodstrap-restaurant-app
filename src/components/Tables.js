import React, { useState, useEffect, useContext } from "react";
import tableopen from "../assets/open.png";
import tableclose from "../assets/close.png";
import ClickablePicture from "../components/ClickablePicture";
import axios from "axios";
import { AuthContext } from "../context/auth";

function Home() {
  const { user } = useContext(AuthContext);
  console.log(user)
  const adminRestoId = user?._id
  console.log("adminRestoId", adminRestoId)

  const [tables, setTables] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    if (adminRestoId) {
      const storedToken = localStorage.getItem("authToken");
      axios
        .get(
          `/api/resto/restaurant/admin/${adminRestoId}?timestamp=${Date.now()}`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        )
        .then((response) => {
          console.log(response.data);
          setTables(response.data.tables);
        })
        .catch((err) => {
          const errorDescription = err.response.data.message;
          setErrorMessage(errorDescription);
        });
    }
  }, [adminRestoId]);


  console.log("esto es restaurant", tables)

  /// creating figure tables
  let t = [];
  for (let i = 0; i < tables; i++) {
    t.push(i);
  }

  const figures = t.map((table, i) => {
    return (
      <a href={`/orders/${i+1}`} key={`${i}`}>
        <figure className="figure m-2 m-sm-3 m-lg-4 col-5 col-sm-3 col-lg-2">
          <div>{`Table: ${i+1}`} </div>
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
