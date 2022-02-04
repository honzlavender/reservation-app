# Capstone: Restaurant Reservation System

[Deployed Application]

## Installation

1. Run npm install to install project dependencies.
2. Run npm run start:dev to start the server in development mode.
3. Run the full test suite with npm run test.
4. To run frontend and backend tests separately run npm run test:frontend or npm run test:backend

Use `npm start` to run the application.


## App Summary

•Allows users to create, edit, and delete reservations. <br/>
•Allows for users to create tables. <br/>
•Reservations can be sat at the tables and finished when they are done. <br/>
•Allows for users to search for existing reservations by phone number. <br/>

## API Documentation
API Path	Method(s)<br/>
/reservations	GET: List all reservations<br/>
/reservations	POST: Create a new reservation.<br/>
/reservations/?date='YYYY-MM-DD'	GET: List all reservations by date.<br/>
/reservations/:reservation_id	GET: Read a single reservation by 'reservation_id'.<br/>
/reservations/:reservation_id	PUT: Update a reservation by 'reservation_id'.<br/>
/reservations/:reservation_id	DELETE: Delete a reservation by 'reservation_id'.<br/>
/reservations/:reservation_id/status	PUT: Update a reservation's status. Options being "booked", "seated", or "finished".<br/>
/tables	GET: List all tables.<br/>
/tables	POST: Create a new table.<br/>
/tables/:table_id	GET: Read a single table by 'table_id'.<br/>
/tables/:table_id	DELETE: Delete a table by 'table_id'.<br/>
/tables/:table_id/seat	PUT: Update a table's status to "occupied".<br/>
/tables/:table_id/seat	DELETE: Update a table's status to "free".<br/>

## Project Tech Stack

# Frontend

Bootstrap<br/>
CSS<br/>
HTML<br/>
JavaScript<br/>
React<br/>

# Backend

Express<br/>
JavaScript<br/>
Knex<br/>
Node.js<br/>

# Database

PostgreSQL<br/>
Production Site Through Heroku<br/>


## app screenshots
<img width="766" alt="Screen Shot 2022-02-01 at 8 44 44 PM" src="https://user-images.githubusercontent.com/88463344/152082500-21d4a9f0-d0fe-498a-b05a-90cbe4cafccc.png">
<img width="776" alt="Screen Shot 2022-02-01 at 8 44 57 PM" src="https://user-images.githubusercontent.com/88463344/152082503-2ef62f86-e0a1-4c15-8317-179b971e1201.png">
<img width="769" alt="Screen Shot 2022-02-01 at 8 45 07 PM" src="https://user-images.githubusercontent.com/88463344/152082504-5f18c654-a963-4f53-b70a-b79993f42d69.png">
<img width="785" alt="Screen Shot 2022-02-01 at 8 46 35 PM" src="https://user-images.githubusercontent.com/88463344/152082506-c763760b-9263-45a2-87f0-f6b12b56fcc7.png">
