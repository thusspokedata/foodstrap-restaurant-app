import React, { useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import tableOpen from '../../assets/open.png';
import tableClose from '../../assets/close.png';
import { getTables } from '../../api/api';
import { AuthContext } from '../../context/auth';
import useStore from '../../context/store';
import { useQuery } from '@tanstack/react-query';

function ClickablePicture({ isAssigned, onClick }) {
  return (
    <img
      src={isAssigned ? tableOpen : tableClose}
      className="figure-img img-fluid rounded bg-secondary bg-opacity-25"
      alt=""
      onClick={onClick}
    />
  );
}

function Home() {
  const navigate = useNavigate();
  const { setTables } = useStore();
  const { user } = useContext(AuthContext);
  const adminRestoId = user?._id;
  const clientIds = useStore((state) => state.clientIds);
  const { assignTable, tableAssignments } = useStore();

  const handleTableAssignment = (tableId, clientId) => {
    assignTable(tableId, clientId);
  };

  const {
    data: tablesData,
    error,
    isLoading,
  } = useQuery(['tables', adminRestoId], () => getTables(adminRestoId), {
    enabled: !!adminRestoId,
    retry: false,
  });

  useEffect(() => {
    if (tablesData) {
      setTables(tablesData);
    }
  }, [tablesData, setTables]);

  const tableCount = tablesData?.tables || 0;

  const t = useMemo(() => {
    const tablesArray = [];
    for (let i = 0; i < tableCount; i++) {
      tablesArray.push(i);
    }
    return tablesArray;
  }, [tableCount]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>An error occurred</div>;
  }

  /// creating figure tables

  const figures = t.map((table) => {
    const tableId = table + 1;
    const isIdToTableAssigned = tableAssignments[tableId];

    const handleClick = () => {
      if (isIdToTableAssigned) {
        navigate(`/orders/${tableId}?clientId=${isIdToTableAssigned}`);
      }
    };

    return (
      <div key={`${table}`}>
        <div className="pt-5">{`Table: ${tableId}`}</div>
        <figure className="figure m-2 m-sm-3 m-lg-4 col-5 col-sm-3 col-lg-2">
          <ClickablePicture isAssigned={isIdToTableAssigned} onClick={handleClick} />
        </figure>
        <select
          onChange={(e) => handleTableAssignment(tableId, e.target.value)}
          value={isIdToTableAssigned || ''}
          className="form-select"
        >
          <option value="">Select a client</option>
          {clientIds.map((id) => (
            <option key={id} value={id}>
              Client {id}
            </option>
          ))}
        </select>
      </div>
    );
  });

  return (
    <div className="card mt-5">
      <div className="card-content p-3">
        <div className="row">
          {figures.map((figure, index) => (
            <div key={index} className="col-md-3 col-sm-6">
              {figure}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
