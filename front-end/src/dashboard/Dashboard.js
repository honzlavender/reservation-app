import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, next, previous } from "../utils/date-time";

import { useHistory } from "react-router";
import useQuery from "../utils/useQuery";
import DetailedReservation from "../reservations/DetailedReservation";
import Table from "../Tables/Table";
import { formatDate } from "../utils/FormatDate";
import "../CSS/Dashboard.css"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const query = useQuery();
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(query.get("date") || today());
  const history = useHistory();

  useEffect(loadDashboard, [date]);
  useEffect(loadTables, []);

  useEffect(() => {
    history.push(`dashboard?date=${date}`);
  }, [date, history]);
  //date must show whichever date the user chooses
  //i.e. today, previous, next, or chosen date from calendar


  
  //displays reservations depending on date selected
  function loadDashboard() {
    const abortController = new AbortController();
    setError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    return () => abortController.abort();
  }
  


  //displays all tables
  function loadTables() {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }
  

  const reservationList = reservations.map((reservation) => (
    <DetailedReservation
      key={reservation.reservation_id}
      reservation={reservation}
    />
  ))
  // console.log(reservationList)

  const tableList = tables.map((table) => (
    <Table
    key={table.table_id}
    table={table}
    />
))

  //handles calender pick
  const handleDateChange = (e) => { 
    setDate(e.target.value);
  };

  //handles TODAY button
  function handleDate() {
    history.push(`dashboard?date=${date}`);
  }

  //handles NEXT button
  function handleNext() {
    setDate(next(date));
    history.push(`dashboard?date=${next(date)}`);
  }

  //handles PREVIOUS button
  function handlePrevious() {
    setDate(previous(date));
    history.push(`dashboard?date=${previous(date)}`);
  }

  return (
    <main>
      <div className="main">
      <h1 className="title">All Reservations</h1>
      <h4 className="date-format">{formatDate(date)}</h4>
      <div className="date-buttons">
        <button className="prev" onClick={() => handlePrevious(date)}>PREVIOUS</button>
        <button className="today"
          onClick={() => {
            setDate(today());
            handleDate(date);
          }}
        >
          TODAY
        </button>
        <button className="next" onClick={() => handleNext(date)}>NEXT</button>
        <ErrorAlert error={error} />
      </div>
      <input className="calendar" type="date" onChange={handleDateChange} value={date}/>
      {/* status */}
      </div>
      {reservationList}
      <div className="tables-container">
        {tableList}
      </div>
    </main>
  );
}

export default Dashboard;