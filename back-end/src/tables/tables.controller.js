const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

//LIST
async function list(req, res) {
  const data = await tablesService.list();
  res.json({ data });
}

//CREATE
async function create(req, res, next) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

//UPDATE
async function update(req, res) {
  const { reservation_id } = req.body.data;
  const table_id = Number(req.params.table_id);
  const data = await tablesService.update(reservation_id, table_id);
  res.status(200).json({ data });
}

//DESTROY
async function destroy(req, res) {
  const { table_id } = req.params;
  const { table } = res.locals;
  await tablesService.destroy(table_id, table.reservation_id);
  res.sendStatus(200).json({});
}

//VALIDATE bad request error
function tableNameAndCapacity(req, res, next) {
  // const { table_name, capacity } = req.body.data;
  const data = req.body.data;
  if (!data) {
    return next({
      status: 400,
      message: `missing data`,
    });
  }
  if (data.table_name.length <= 1) {
    return next({
      status: 400,
      message: `Your table_name must be at least 2 letters - sorry A`,
    });
  }
  if (typeof data.capacity !== "number") {
    return next({
      status: 400,
      message: `Sorry, capacity must be a numerical digit`,
    });
  }
  next();
}



//Table exists validator
async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const foundTable = await tablesService.read(table_id);

  if (foundTable) {
    res.locals.table = foundTable;
    return next();
  } else {
   return next({ 
       status: 404, 
       message: `${table_id} not found :/`,
    });
  }
}

//VALIDATE reservation_id exist
async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  if (!reservation_id) {
    return next({
      status: 400,
      message: `Oops! You gotta have a reservation_id`,
    });
  }

  const foundReservation = await reservationsService.read(reservation_id);
  if (foundReservation) {
    res.locals.reservation = foundReservation;
    return next();
  }
  next({ status: 404, message: `Oops! ${reservation_id} doesn't exist!` });
}

function hasData(req, res, next) {
  const data = req.body.data;
  if (data) {
    next();
  } else {
    next({
      status: 400,
      message: `Request is missing 'data'.`,
    });
  }
}

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(req.body.data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(",")}`,
    });
  }
  next();
}

function validateTableSeating(req, res, next) {
  const people = res.locals.reservation.people;
  const capacity = res.locals.table.capacity;
  const seatsTaken = res.locals.table.reservation_id;
  if (people > capacity) {
    return next({
      status: 400,
      message: `The party size is greater than the table capacity. Please select another table.`,
    });
  }
  if (seatsTaken) {
    return next({
      status: 400,
      message: `Sorry, seats taken..occupied`,
    });
  }
  next();
}

//not occupied
function available(req, res, next) {
  const { table } = res.locals;
  if (table.reservation_id === null) {
    return next({
      status: 400,
      message: `table is not occupied`,
    });
  }
  next();
}

const isMissing = hasProperties("table_name", "capacity");
const isUpdated = hasProperties("reservation_id");

const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id"];

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    isMissing,
    tableNameAndCapacity,
    hasOnlyValidProperties,
    asyncErrorBoundary(create),
  ],
  update: [
    hasData,
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(reservationExists),
    isUpdated,
    validateTableSeating,
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(tableExists),
    available,
    asyncErrorBoundary(destroy),
  ],
};
