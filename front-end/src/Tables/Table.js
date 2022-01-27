/**
 * CARD COMPONENT
 * displays table with
 * capacity, table/bar number, and status
 * and a finish button if occupied
 */


function Table({table}){

    return(
        <section className="tableDetails">
            <h2 className="tableName">{table.table_name}</h2>
            <p>
                <strong>{table.capacity}</strong>
            </p>
            <p>
                <strong>status: if seated ? 'Occupied' : 'Free'</strong>
            </p>
        </section>
    )
}

export default Table;