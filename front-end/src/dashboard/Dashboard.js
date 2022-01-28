import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";
//reservation Details.js
import DetailReservationList from "../reservations/DetailReservationList";
import TableList from "../Tables/TableList";
import { useHistory } from "react-router";
import useQuery from "../utils/useQuery";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const query = useQuery();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [date, setDate] = useState(query.get("date"));
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  useEffect(() => {
    history.push(`dashboard?date=${date}`);
  }, [date, history]);
  //date must show whichever date the user chooses
  //i.e. today, previous, next, or chosen date from calendar
  //selectedDate variable
  //conditional: if today, if previous, if tomorrow, if
  const stringDate = today();
  console.log(stringDate);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <main>
      <h1>All Reservations</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">{date}</h4>
        <input
          type="date"
          // value={formData}
          onChange={handleDateChange}
        />
      </div>
      {/* <Details /> */}
      <DetailReservationList reservations={reservations} />
      <TableList />
      <ErrorAlert error={reservationsError} />
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
