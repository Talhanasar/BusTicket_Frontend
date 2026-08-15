# Talha Paribahan / P-Ticket

A MERN stack bus ticket booking application. This project is a monorepo containing both the backend API and the frontend client.

## Project Structure

```
BusTicketBoking/
├── BusTicket_Backend/
│   ├── .env.example
│   ├── index.js
│   ├── seed.js
│   └── package.json
└── BusTicket_Frontend/
    ├── src/
    ├── public/
    ├── index.html
    ├── pnpm-lock.yaml
    └── package.json
```

## Getting Started

Follow these steps to get the application running locally.

### Backend (`BusTicket_Backend/`)

1. **Navigate to the backend directory:**
   ```bash
   cd BusTicket_Backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file by copying the example and add your MongoDB connection string.
   ```bash
   cp .env.example .env
   ```
   Your `.env` file should contain:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
   **Note:** For the booking functionality to work, this must be a connection string for a MongoDB replica set or an Atlas cluster. See [Known Limitations](#known-limitations).

4. **Seed the database (optional but recommended):**
   This will populate the database with 915 bus schedules and two sample discount coupons. The seed script is idempotent.
   ```bash
   npm run seed
   ```
   To preview the data without database changes, use the `--dry-run` flag:
   ```bash
   npm run seed -- --dry-run
   ```

5. **Start the server:**
   The backend server will run on port 3000.
   ```bash
   npm start
   ```

### Frontend (`BusTicket_Frontend/`)

1. **Navigate to the frontend directory:**
   ```bash
   cd BusTicket_Frontend
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Set up environment variables:**
   Create a `.env.local` file and specify the backend API URL. This must include the API key path segment.
   ```
   VITE_FETCH_URL=http://localhost:3000/api/<your-key>/
   ```
   The trailing slash is required. The backend guards routes with a key path segment (`:key`) — this is a simple demo guard and is **not** real authentication.

4. **Start the development server:**
   The frontend will be available at `http://localhost:5173`.
   ```bash
   pnpm dev
   ```

## Backend Details

- **Stack:** Express 4, Mongoose 8, Zod 3 (request validation), EJS (404 page), dotenv, cors
- **Port:** 3000

### Scripts

| Script                  | Description                                                      |
| :---------------------- | :--------------------------------------------------------------- |
| `npm start`             | Runs the server with `node index.js`.                            |
| `npm run seed`          | Populates the database with demo data.                           |
| `npm run seed -- --dry-run` | Validates and prints the seed dataset without DB connection. |
| `npm test`              | Unimplemented placeholder — no automated test suite exists.       |

### API Endpoints

All endpoints are prefixed with `/api/:key/`.

| Method | Endpoint                    | Description                                                                         |
| :----- | :-------------------------- | :---------------------------------------------------------------------------------- |
| `GET`  | `/availablebus`             | List all available buses.                                                           |
| `GET`  | `/availablebus/:details`    | Search buses by `way=From-To&date=YYYY-MM-DD`, or get one bus by `id=<busId>`.      |
| `POST` | `/availablebus`             | Create a new bus schedule.                                                          |
| `GET`  | `/bookedTicket`             | List all bookings.                                                                  |
| `GET`  | `/bookedTicket/:busId`      | List bookings for a specific bus.                                                   |
| `POST` | `/bookedTicket`             | Create a new booking (transactional).                                               |
| `GET`  | `/coupon`                   | List all discount coupons.                                                          |
| `POST` | `/coupon`                   | Create a new discount coupon.                                                       |

## Frontend Details

- **Stack:** React 18.3, React Router 6, Vite 5, Tailwind CSS 3, react-toastify, react-icons
- **Dev Server:** `http://localhost:5173`

### Scripts

| Script          | Description                           |
| :-------------- | :------------------------------------ |
| `pnpm dev`      | Starts the Vite development server.   |
| `pnpm build`    | Builds the application for production. |
| `pnpm lint`     | Lints the source code using ESLint.   |
| `pnpm preview`  | Serves the production build locally.   |

### Routes

| Route                 | Page                            |
| :-------------------  | :------------------------------ |
| `/`                   | Bus search (home)               |
| `/bus/:detail`        | Search results                  |
| `/bus/booking/:id`    | Seat selection and checkout     |
| `/booking-success`    | Booking confirmation            |
| `/about`              | About page                      |
| `/contact`            | Contact page                    |
| `/policies`           | Policies page                   |

## Data Models

### `availableBus`

| Field            | Type       | Description                              |
| :--------------- | :--------- | :--------------------------------------- |
| `busName`        | String     | Name of the bus service.                 |
| `busWay`         | String     | Route, e.g. `"From-To"`.                 |
| `departureDate`  | String     | Departure date in `YYYY-MM-DD` format.   |
| `departureTime`  | String     | Departure time.                          |
| `timeRequired`   | String     | Estimated travel time.                   |
| `ticketPrice`    | Number     | Price per seat.                          |
| `boardingPoint`  | String     | The boarding location.                   |
| `droppingPoint`  | String     | The dropping location.                   |
| `seatsAvailable` | Number     | Total seats available (defaults to 45).  |
| `bookedSeats`    | [String]   | Array of seat numbers that are booked.   |
| `ticketId`       | [ObjectId] | References to `Customer` documents.      |

### `Customer`

| Field         | Type       | Description                                |
| :------------ | :--------- | :----------------------------------------- |
| `busId`       | ObjectId   | Reference to the `availableBus` document.  |
| `seatBooked`  | [String]   | Array of seat numbers booked by customer.  |
| `name`        | String     | Customer's name.                           |
| `phone`       | String     | Customer's phone number.                   |
| `email`       | String     | Customer's email.                          |
| `couponUsed`  | String     | Discount coupon code used (if any).        |
| `totalMoney`  | Number     | Total amount paid.                         |
| `bookingDate` | String     | Date of booking.                           |
| `bookingTime` | String     | Time of booking.                           |

### `discountCoupon`

| Field               | Type       | Description                                     |
| :------------------ | :--------- | :---------------------------------------------- |
| `code`              | String     | The coupon code (e.g. `"NEW15"`).               |
| `discountPercentage`| Number     | Percentage of discount.                         |
| `expirationDate`    | Date       | When the coupon expires.                        |
| `minPurchaseAmount` | Number     | Minimum purchase required to use the coupon.    |
| `usageLimit`        | Number     | How many times the coupon can be used in total. |
| `isActive`          | Boolean    | Whether the coupon is currently active.         |
| `usedBy`            | [ObjectId] | List of users who have used this coupon.        |

## Booking Concurrency

The booking process is designed to prevent race conditions such as double-booking:

- **Transactions:** A new booking is committed inside a MongoDB transaction. This ensures the `Customer` record creation and the `availableBus` update happen atomically.
- **Atomic seat reservation:** Seats are reserved with a single conditional update that requires the requested seats to be absent from `bookedSeats` and enough `seatsAvailable` to remain. Two concurrent requests cannot book the same seat.
- **Server-side coupon validation:** Coupon eligibility (active, not expired, remaining usage) and the minimum purchase amount are validated on the server. The minimum purchase is computed from the server's `ticketPrice`, not the client-supplied total, preventing price tampering.

**Important limitation:** MongoDB transactions require a replica set or Atlas cluster. On a standalone `mongod` instance, the booking endpoint intentionally returns **HTTP 503** rather than risking a partial booking.

## Demo Data

Running `npm run seed` in the backend directory:

- Inserts **915 bus schedules** covering dates from **2026-08-16** through **2026-10-15**.
- Creates two discount coupons valid through **2026-10-31**:
  - `NEW15` — 15% off
  - `Couple20` — 20% off
- The seed is **idempotent**: re-running it never duplicates schedules and never resets seats already booked or coupon usage already consumed.
- `--dry-run` validates and prints the dataset without connecting to the database.

## Known Limitations

1. **Replica set required for booking** — the `POST /bookedTicket` endpoint uses MongoDB transactions, which are unavailable on standalone `mongod`. The endpoint returns HTTP 503 in that case.
2. **API key path segment is not real authentication** — the `:key` segment is a simple demo guard, not a secure auth mechanism.
3. **No automated test suite** — `npm test` is an unimplemented placeholder; there are no tests for frontend or backend.
4. **Pre-existing ESLint errors** — `pnpm lint` reports unused React imports and missing `prop-types` definitions in the current codebase.
