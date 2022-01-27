import { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables } from "../utils/api";
import Table from "./Table";


function TableList(){
    const [tables, setTables] = useState([]);
    const [error, setError] = useState([]);

useEffect(() => {
    setError(null);
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setError);

    return () => abortController.abort();
}, []);

const list = tables.map((table) => (
    <Table key={table.table_id} table={table}/>
))



    return (
        <main className="container">
            <ErrorAlert error={error} />
            <section>{list}</section>
        </main>
    );
}


export default TableList;