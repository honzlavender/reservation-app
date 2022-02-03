/* //CARD COMPONENT displays all details about the reservation as props

"first_name": "Rick",
"last_name": "Sanchez",
"mobile_number": "202-555-0164",
"reservation_date": "2020-12-31",
"reservation_time": "20:00:00",
"people": 6,
*/

import { useHistory } from "react-router";
import { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { cancelReservation } from "../utils/api";
// import { Link } from "react-router-dom";
import "../CSS/Reservation.css";
import { formatDate } from "../utils/FormatDate";
import { formatTime } from "../utils/date-time"

// //will use {reservation} prop from ReservationList.js
function DetailedReservation({ reservation }) {
  const [error, setError] = useState(null);
  const history = useHistory();
 
  const handleCancel = async (event) => {
    try {
      if (window.confirm("Do you want to cancel this reservation?")) {
        await cancelReservation(reservation.reservation_id);
        history.go(0);
      }
    } catch (error) {
      setError(error);
    }
  };
  if (reservation.status === "cancelled") {
    return null;
  }

  const reservation_id = reservation.reservation_id;

  return (
    <div className="container-reservation">
        <div className="col-res">
            <ErrorAlert error={error} />
            <div className="card-header">
              <h5 className="name">
                {reservation.first_name} {reservation.last_name}
                {/* Party of{" "} {reservation.people} */}
              </h5>
            </div>
            <div className="card-body">
              <p className="card-title">
                Name: {reservation.first_name} {reservation.last_name}
              </p>
              <p className="card-title">
                Date: {formatDate(reservation.reservation_date)}</p>
              <p className="card-title">
                Reservation Time: {formatTime(reservation.reservation_time)}
              </p>
              <p className="card-title">
                Mobile Number: {reservation.mobile_number}
              </p>
              <p className="card-title">
                Party of: {reservation.people}
              </p>
              <p
                className="card-title"
                data-reservation-id-status={reservation.reservation_id}
              >
                Status: {reservation.status}
              </p>
              <div className="buttons">
                {reservation.status === "seated" ? null : (
                  <a
                    href={`/reservations/${reservation.reservation_id}/seat`}
                    className="btn btn-seat m-1"
                  >
                    Seat
                  </a>
                )}
                <a
                  href={`/reservations/${reservation_id}/edit`}
                  className="btn btn-edit m-1"
                >
                  {" "}
                  Edit
                </a>
                <button
                  data-reservation-id-cancel={reservation.reservation_id}
                  onClick={handleCancel}
                  className="btn btn-cancel m-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
    </div>
  );
}

export default DetailedReservation;
