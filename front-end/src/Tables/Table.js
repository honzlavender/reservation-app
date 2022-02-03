/**
 * CARD COMPONENT
 * displays table with
 * capacity, table/bar number, and status
 * and a finish button if occupied
 */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { closeTable, listReservations } from "../utils/api";
import "../CSS/Table.css";

const Table = ({ table }) => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();
  useEffect(() => {
    listReservations().then(setReservations);
  }, []);

  async function handleFinish(tableId) {
    if (
      window.confirm(
        "Is this table ready to seat new guests?  This cannot be undone."
      )
    ) {
      try {
        await closeTable(tableId);
        history.go();
      } catch (err) {
        setError(err);
      }
    }
  }

  const foundRes = reservations.find(
    (reservation) =>
      Number(reservation.reservation_id) === Number(table.reservation_id)
  );

  return (
    <>
      <div className="table">
        <div className="row-cards">
          <div className="card">
            <ErrorAlert error={error} />
            <h5 className="table-name">{table.table_name}</h5>
            <p className="capacity">Capacity: {table.capacity}</p>
            <p className="status" data-table-id-status={`${table.table_id}`}>
              Status:{" "}
              {table.reservation_id ? (
                <span className="text-danger">Occupied by </span>
              ) : (
                <span>Free</span>
              )}
              {foundRes && (
                <span className="text-danger">
                  {foundRes.first_name} {foundRes.last_name}
                </span>
              )}
            </p>

            {table.reservation_id && (
              <button
              className="finish"
                type="submit"
                variant="contained"
                color="warning"
                data-table-id-finish={`${table.table_id}`}
                onClick={() => handleFinish(table.table_id)}
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
