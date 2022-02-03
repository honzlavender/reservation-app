/**
 * form component to add a new table
 * with elements
 * table_name
 * capacity
 *
 */

import { useHistory, useParams } from "react-router";
import { useState, useEffect } from "react";
import { createTable, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import "../CSS/NewTable.css"

function NewTable() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const { tableId } = useParams()

  const initialFormState = {
    table_name: "",
    capacity: "",
  };


  useEffect(() => {
    const abortController = new AbortController();

    async function loadTable() {
      try {
        if (tableId) {
          
          const resResponse = await listTables(
            tableId,
            abortController.signal
          );
          setFormData(resResponse);
        } else {
          setFormData({ ...initialFormState })
        }
      } catch (err) {
        setError(err);
      }
    }
    loadTable();

    return () => abortController.abort();
    // eslint-disable-next-line
  }, [tableId]);
  

  const [formData, setFormData] = useState({ ...initialFormState });

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

  //submit button for new table
  async function handleSubmit(e) {
    e.preventDefault();
    const abortController = new AbortController();
    try {
      await createTable(formData, abortController.signal);
      history.push(`/`);
      setFormData({ ...initialFormState });
    } catch (err) {
      setError(err);
    }
    return () => abortController.abort();
  }


  return (
    <div className="new-table">
    <form onSubmit={handleSubmit}>

      <h2 className="newTable-title" >Create a New Table</h2>

      <ErrorAlert error={error}/>

      <label>Table Name</label>
      <input
        type="text"
        name="table_name"
        className="form-control"
        id="table_name"
        placeholder="table name"
        value={formData.table_name}
        onChange={handleChange}
        required
      />
      <label>Capacity</label>
      <input
        type="number"
        name="capacity"
        className="form-control"
        id="capacity"
        placeholder="capacity"
        value={formData.capacity}
        onChange={handleNumberChange}
        required
      />
      <div className="table-btns">
      <button type="submit" className="submit-btn">
        SUBMIT
      </button>
      <button className="cancel-btn" onClick={history.goBack}>CANCEL</button>
      </div>
    </form>
    </div>
  );
}

export default NewTable;
