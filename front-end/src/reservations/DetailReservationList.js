//map through of reservation list that will display according
import DetailedReservation from "./DetailedReservation";

function DetailReservationList({ reservations }) {

  return (
    <main className="container">
      {reservations.map((reservation) => (
        <DetailedReservation
          key={reservation.reservation_id}
          reservation={reservation}
        />
      ))}
    </main>
  );
}

export default DetailReservationList;
