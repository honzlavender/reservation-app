//map through of reservation list that will display according 

import { useEffect, useState } from "react";
import DetailedReservation from "./DetailedReservation";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function DetailReservationList(){
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        setError(null);
        const abortController = new AbortController();
        listReservations(abortController.signal).then(setReservations).catch(setError);

        return () => abortController.abort();
    }, []);


    const list = reservations.map((reservation) =>(
        <DetailedReservation key={reservation.reservation_id} reservation={reservation} />
    ));



    return (
        <main className="container">
            <ErrorAlert error={error} />
            <section>{list}</section>
        </main>
    );
}


export default DetailReservationList;