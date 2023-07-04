import React, { useContext, useEffect } from 'react';
import tableopen from '../assets/open.png';
import tableclose from '../assets/close.png';
import ClickablePicture from '../components/ClickablePicture';
import { getTables } from '../api/api';
import { AuthContext } from '../context/auth';
import useStore from '../context/store';
import { useQuery } from '@tanstack/react-query';

function Home() {
  const { setTables } = useStore();
  const { user } = useContext(AuthContext);
  console.log(user);
  const adminRestoId = user?._id;
  console.log('adminRestoId', adminRestoId);

  const {
    data: tablesData,
    error,
    isLoading,
  } = useQuery(
    ['tables', adminRestoId], // un array único como key de la query
    () => getTables(adminRestoId), // nuestra función que devuelve una promesa
    {
      enabled: !!adminRestoId, // la consulta se ejecuta sólo si adminRestoId existe
      retry: false, // no intentar de nuevo automáticamente si la consulta falla
    },
  );

  useEffect(() => {
    if (tablesData) {
      setTables(tablesData);
    }
  }, [tablesData, setTables]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>An error occurred</div>;
  }

  /// creating figure tables
  let t = [];
  for (let i = 0; i < tablesData?.tables; i++) {
    t.push(i);
  }

  const figures = t.map((table, i) => {
    return (
      <a href={`/orders/${i + 1}`} key={`${i}`}>
        <figure className="figure m-2 m-sm-3 m-lg-4 col-5 col-sm-3 col-lg-2">
          <div>{`Table: ${i + 1}`} </div>
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
