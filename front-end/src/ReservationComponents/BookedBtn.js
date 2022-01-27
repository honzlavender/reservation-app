//buttons that display on reservation card when booked but not yet seated

function BookedBtn(){
    return(
        <div className="row">
        <button>EDIT</button>
        <button>SEAT</button>
        <button>CANCEL</button>
    </div>
    )
}

export default BookedBtn;