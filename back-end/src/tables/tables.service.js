const knex = require("../db/connection");

//LIST - table sorted by name
function list() {
  return knex("tables").select("*").orderBy("table_name");
}

//CREATE - insert a new table
function create(table) {
  return knex("tables").insert(table).returning("*").then((tables) => tables[0]);
}

//READ - table_id
function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

//update
function update(reservation_id, table_id) {
  return knex("reservations")
    .where({ reservation_id })
    .update({status: "seated"})
    .then(() => {
        return knex("tables")
        .where({ table_id })
        .update({ reservation_id })
        .returning("*")
    })
}

//delete
function destroy(reservation_id, table_id) {
    return knex("reservations")
      .where({ reservation_id })
      .update({status: "finished"})
      .returning("*")
      .then(() => {
          return knex("tables")
          .where({ table_id })
          .update({ reservation_id: null })
          .returning("*")
      })
  }



module.exports = {
  list,
  create,
  read,
  update,
  destroy
};
