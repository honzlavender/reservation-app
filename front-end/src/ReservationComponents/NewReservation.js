/**
 * component form
 * form that has inputs for
 *first_name
 *last_name
 *mobile_number
 *reservation_date
 *reservation_time
 *people
 */
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation, readReservation } from "../utils/api";

function NewReservation() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const { reservationId } = useParams()

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  //useEffect
  useEffect(() => {
      const abortController = new AbortController();

      async function loadReservation(){
          try {
              if(reservationId) {
                  const resResponse = await readReservation(
                      reservationId,
                      abortController.signal
                  );
                  setFormData(resResponse);
              }else{
                  setFormData({ ...initialFormState })
              }
          } catch (err) {
              setError(err);
          }

      }
      loadReservation();
      return () => abortController.abort();
      // eslint-disable-next-line
  }, [reservationId]);

  //handles changes to each input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleNumberChange = (e) => {
      setFormData({
          ...formData,
          [e.target.id]: Number(e.target.value),
      });
  }

  //submit button function for new reservation
  async function handleSubmit(e) {
    e.preventDefault();
    const abortController = new AbortController();
    try {
      await createReservation(formData, abortController.signal);
      history.push(`/dashboard?date=${formData.reservation_date}`);
      setFormData({ ...initialFormState });
    } catch (err) {
      setError(err);
    }
    return () => abortController.abort();
  }

  return (
    <div>
        <ErrorAlert error={error} />


      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        {/* form-control is specific to input styling without additional css etc */}
        <input
          type="text"
          name="first_name"
          className="form-control"
          id="first_name"
          placeholder="Syndey"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <label>Last Name</label>
        <input
          type="text"
          name="last_name"
          className="form-control"
          id="last_name"
          placeholder="Sweeney"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <label>Phone Number</label>
        <input
          type="text"
          name="mobile_number"
          className="form-control"
          id="mobile_number"
          placeholder="phone number"
          value={formData.mobile_number}
          onChange={handleChange}
          required
        />
        <label>Date</label>
        <input
          type="date"
          name="reservation_date"
          className="form-control"
          id="reservation_date"
          placeholder="reservation date"
          value={formData.reservation_date}
          onChange={handleChange}
          required
        />
        <label>Time</label>
        <input
          type="time"
          name="reservation_time"
          className="form-control"
          id="reservation_time"
          placeholder="reservation time"
          value={formData.reservation_time}
          onChange={handleChange}
          required
        />
        <label>People in Party</label>
        <input
          type="number"
          name="people"
          className="form-control"
          id="people"
          placeholder="people in party"
          value={formData.people}
          onChange={handleNumberChange}
          required
        />
        <button type="submit" className="submit-btn">SUBMIT</button>
        <button onClick={history.goBack}>CANCEL</button>
      </form>
    </div>
  );
}

export default NewReservation;
