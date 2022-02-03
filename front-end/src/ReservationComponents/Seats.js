/**
 * component for seating a reservation at a table
 */

import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, updateTable } from "../utils/api";
import "../CSS/Seat.css"

function Seats() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [selectValue, setSelectValue] = useState("");
  const { reservationId } = useParams();
  const history = useHistory();

  useEffect(loadTables, []);

  //displays all tables in drop down menu
  function loadTables() {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }

  const changeHandle = (e) => {
    setSelectValue({
      [e.target.name]: e.target.value,
    });
  };

  //handle submit to update table w reservation id
  const handleSubmit = (e) => {
    const abortController = new AbortController();
    e.preventDefault();
    updateTable(
      reservationId,
      Number(selectValue.table_id),
      abortController.signal
    )
      .then(() => history.push("/dashboard"))
      .catch(setError);

    return () => abortController.abort();
  };


  

  return (
    <div className="add-seat">
      <h2 className="seat-title">Seat A Reservation</h2>
      <ErrorAlert error={error}/>
      <form className="seat-form" onSubmit={handleSubmit}>
          <p className="options" >Table Name - Table Capacity</p>
        {tables && (
          <div className="form-group">
            <select name="table_id" required onChange={changeHandle}>
            <option value="">Choose Table</option>
              {tables.map((table) => (
                <option value={table.table_id} key={table.table_id}>
                  {table.table_name} - {table.capacity}
                </option>
              ))}
            </select>
          </div>
        )}
        <button className="cancel-btn" onClick={history.goBack}>CANCEL</button>
        <button type="submit" className="submit-btn">
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default Seats;