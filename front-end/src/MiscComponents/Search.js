/**
 * component for search form by mobile_number
 */

function Search(){

    return(
        <div className="container">
        <h1>search by phone number</h1>
        <input className="mobile_number" type="text" placeholder="012-345-6789"/>
        <button className="find">FIND</button>
        </div>
    );
}

export default Search;