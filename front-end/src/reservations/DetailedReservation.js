/* //CARD COMPONENT displays all details about the reservation as props

"first_name": "Rick",
"last_name": "Sanchez",
"mobile_number": "202-555-0164",
"reservation_date": "2020-12-31",
"reservation_time": "20:00:00",
"people": 6,
*/

import BookedBtn from "../ReservationComponents/BookedBtn";
import SeatedBtn from "../ReservationComponents/SeatedBtn";

//will use {reservation} prop from ReservationList.js
function Details({reservation}) {
  return (
    <section className="reservationDetails">
      <h2 className="reservationName">{`${reservation.first_name} ${reservation.last_name}`}</h2>
      <p>
        <strong>Number:</strong> {reservation.mobile_number}
      </p>
      <p>
        <strong>Date:</strong> {reservation.reservation_date}
      </p>
      <p>
        <strong>Time:</strong> {reservation.reservation_time}
      </p>
      <p>
        <strong>People:</strong> {reservation.people}
      </p>
      <p>
        <strong>Status:</strong> {reservation.status}
      </p>
      <div className="column">
          <p>if reservation is booked but not seated show <BookedBtn/></p>
          <p>if reservation is booked but not seated show <SeatedBtn/></p>
      </div>
    </section>
  );
}

export default Details;
