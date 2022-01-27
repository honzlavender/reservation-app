import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";
//reservation Details.js
import DetailReservationList from "../reservations/DetailReservationList";
import TableList from "../Tables/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  //date must show whichever date the user chooses
  //i.e. today, previous, next, or chosen date from calendar
  //selectedDate variable
  //conditional: if today, if previous, if tomorrow, if
  const stringDate = today()
console.log(stringDate)
 
function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }



  return (
    <main>
      <h1>All Reservations</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">{date}</h4>
      </div>
      {/* <Details /> */}
      <DetailReservationList/>
      <TableList/>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
