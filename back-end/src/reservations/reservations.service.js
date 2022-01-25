const knex = require("../db/connection");



//list of all reservations
function list() {
  return knex("reservations")
    .select("*")
    .where( "reservation_date" )
    .orderBy("reservation_time");
}

//list reservation by date
function listDate(date) {
  return knex("reservations")
  .select("*")
  .where({ reservation_date: date })
  .whereNot({ status: "finished"})
  .whereNot({ status: "cancelled"})
  .orderBy("reservation_time")
}

//create a new reservation
function create(reservation) {
  return knex("reservations")
  .insert(reservation, "*")
  then((res) => res)
}

//all reservations by id
function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .first();
}

// update status
function updateStatus(reservation_id, status){
  return knex("reservations")
  .update({ status }, "*")
  .where({ reservation_id })
  .then((res) => res[0])

}

function update(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(reservation, "*")
    .then((res) => res[0]) 
}

//search by mobile number
function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  list,
  listDate,
  create,
  read,
  update,
  updateStatus,
  search,
};
