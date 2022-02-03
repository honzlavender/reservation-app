/**
 * component for search form by mobile_number
 */
 import React, {useState} from "react";
 import ErrorAlert from "../layout/ErrorAlert"
 import { listReservations } from "../utils/api";
 import DetailedReservation from "../reservations/DetailedReservation";
 import "../CSS/Search.css"
 
 const Search = () => {
     const [searchMobile, setSearchMobile] = useState("");
     const [reservations, setReservations] = useState([]);
     const [errors, setErrors] = useState(false);
     const [noResults, setNoResults] = useState(false);
 
     const handleChange = (e) => {
         setSearchMobile(e.target.value);
     }
 
     async function handleSubmit(e) {
         e.preventDefault();
         const abortController = new AbortController();
         setErrors(false);
         setNoResults(false);
         try {
             if (
                 /[a-zA-Z.,]/.test(
                   searchMobile
                 ) === true
               ) {
                 throw new Error("Mobile Number must only include numbers");
               }
               const data = await listReservations(
                 { mobile_number: searchMobile },
                 abortController.signal
               );
               setReservations(data);
               setNoResults(true);
               setSearchMobile("");
             } catch (err) {
               setErrors(err);
             }
             return () => abortController.abort();
     }
     const rows = reservations.map((reservation) => (
         <DetailedReservation key={reservation.reservation_id} reservation={reservation} />
     )
     )
 
     
 
     return (
         <div className="search" onSubmit={handleSubmit}>
             <h3>Search by Phone Number</h3>
             <ErrorAlert error={errors} />
             <form className="search-form">
                 <input 
                 type="text" 
                 name="mobile_number"
                 value={searchMobile}
                 onChange={handleChange}
                 placeholder="123-456-7890" 
                 required />
                 <button className="search-button" type="submit">
           <span className="oi oi-magnifying-glass"></span>
         </button>
             </form>
             {reservations.length > 0 && (
               <div className="container-reservation">
                 {rows}
               </div>
             )}
             {noResults && reservations.length === 0 ? (
                 <h5 className="noneFound">No reservations found</h5>
             ): (
                 ""
             )}   
         </div>
     )
  }
 
  export default Search;