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
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";

function NewReservation() {
  const history = useHistory();
  const [error, setError] = useState(null);

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  //handles changes to each input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

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
        <input
          type="text"
          name="first_name"
          placeholder="Syndey"
          value={formData.first_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="last name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mobile_number"
          placeholder="phone number"
          value={formData.mobile_number}
          onChange={handleChange}
        />
        <input
          type="text"
          name="reservation_date"
          placeholder="reservation date"
          value={formData.reservation_date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="reservation_time"
          placeholder="reservation time"
          value={formData.reservation_time}
          onChange={handleChange}
        />
        <input
          type="text"
          name="people"
          placeholder="people in party"
          value={formData.people}
          onChange={handleChange}
        />
        <button type="submit">SUBMIT</button>
        <button onClick={history.goBack}>CANCEL</button>
      </form>
    </div>
  );
}

export default NewReservation;
