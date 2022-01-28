const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

//CRUD
//LIST
async function list(req, res) {
  const { date, mobile_number } = req.query;

  if (date) {
    res.json({ data: await reservationsService.listDate(date) });
  } else if (mobile_number) {
    res.json({ data: await reservationsService.search(mobile_number) });
  } else {
    res.json({ data: await reservationsService.list() });
  }
}

//CREATE
async function create(req, res, next) {
  const newReservation = await reservationsService.create(req.body.data);
  res.status(201).json({ data: newReservation[0] });
}

//READ
async function read(req, res) {
  const { reservation } = res.locals;
  const data = await reservationsService.read(reservation.reservation_id);
  res.json({ data });
}

//UPDATE - updates status
async function updateStatus(req, res, next) {
  const { reservation_id } = res.locals.reservation;
  const { status } = req.body.data;

  const data = await reservationsService.update(reservation_id, status);
  res.status(200).json({ data });
}

//update reservation
async function update(req, res) {
  const { reservation_id } = res.locals.reservation;
  const updatedRes = {
    ...req.body.data,
    reservation_id,
  };
  const data = await reservationsService.updateRes(updatedRes);
  res.json({ data });
}

//VALIDATE EXIST
async function reservationExists(req, res, next) {
  const foundReservation = await reservationsService.read(
    req.params.reservation_id
  );
  if (foundReservation) {
    res.locals.reservation = foundReservation;
    return next();
  }
  next({ status: 404, message: `Oops! ${reservation_id} doesn't exist!` });
}

//does this even work
function hasPeople(req, res, next) {
  const { people } = req.body.data;
  const validNumber = Number.isInteger(people);
  if (!validNumber || people <= 0) {
    return next({
      status: 400,
      message: "You cannot make a reservation for 0 people.",
    });
  }
  next();
}

function hasValidDateTime(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  let today = new Date();
  let day = `${reservation_date}  ${reservation_time}`;
  let resAsDate = new Date(day);

  const now = Date.now();
  const pastReservation = new Date(reservation_date);

  const timeReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  const dateReg = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

  if (reservation_time.match(timeReg) === null) {
    return next({
      status: 400,
      message: `Oops! Your reservation_time is not a valid time.`,
    });
  }

  if (!reservation_date.match(dateReg)) {
    return next({
      status: 400,
      message: `Oops! Your reservation_date is not a valid date.`,
    });
  }
  if (resAsDate.getDay() === 2) {
    return next({
      status: 400,
      message: `Sorry! We're closed on Tuesdays.`,
    });
  }
  if (resAsDate < today) {
    return next({
      status: 400,
      message: "Reservation must be booked for future date.",
    });
  }
  if (reservation_time < "10:30" || reservation_time > "21:30") {
    return next({
      status: 400,
      message: "Reservation must be between 10:30AM and 9:30PM.",
    });
  }
  next();
}

//VALIDATE STATUS OF RESERVATION
function reservationStatus(req, res, next) {
  const { status } = req.body.data;

  if (status === "seated") {
    return next({
      status: 400,
      message: `reservation is seated`,
    });
  }

  if (status === "finished") {
    return next({
      status: 400,
      message: `reservation is finished`,
    });
  }
  next();
}

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  //
  res.locals.reservation = req.body.data;
  //
  const invalidFields = Object.keys(data).filter((field) => {
    !VALID_PROPERTIES.includes(field);
  });
  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(",")}`,
    });
  next();
}

//handle error badRequest.js (REQUIRED)
const isMissing = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

//valid data
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
  "reservation_id",
  "created_at",
  "updated_at",
];

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    isMissing,
    hasPeople,
    hasValidDateTime,
    hasOnlyValidProperties,
    reservationStatus,
    asyncErrorBoundary(create),
  ],
  update: [
    isMissing,
    hasValidDateTime,
    reservationExists,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(updateStatus),
  ],
};
