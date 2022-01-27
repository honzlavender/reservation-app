/**
 * form component to add a new table
 * with elements
 * table_name
 * capacity
 * 
 */

function NewTable() {
  return (
    <div className="colomn">
      <input type="text" className="table_name" placeholder="table name" />
      <input type="text" className="capacity" placeholder="capacity" />

    </div>
  );
}

export default NewTable;
