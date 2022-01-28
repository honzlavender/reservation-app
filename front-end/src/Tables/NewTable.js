/**
 * form component to add a new table
 * with elements
 * table_name
 * capacity
 * 
 */

function NewTable() {
  return (
    <div className="column">
      <input 
      type="text" 
      name="table_name"
      className="form-control"
      id="table-name"
      placeholder="table name"
      />
      <input 
      type="number" 
      name="capacity"
      className="form-control"
      id="capacity"
      placeholder="capacity" />

    </div>
  );
}

export default NewTable;
