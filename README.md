# BusTicket_Frontend

This is the frontend of a bus ticket booking system that allows users to search for available buses by entering departure and arrival cities, along with the travel date. The frontend is built using React and communicates with the backend API to fetch bus details.

## Features

- Dynamic search with city suggestions
- Date selection for travel
- Form validation for input fields
- Fetches available buses from the backend API

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/)

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/BusTicket_Frontend.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd BusTicket_Frontend
    ```

3. **Install the necessary dependencies:**

    ```bash
    npm install
    ```

4. **Start the development server:**

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## Usage

- Enter your departure city, destination city, and the date of travel.
- Use the auto-suggestion dropdown for city selection.
- Submit the form to see available bus results fetched from the backend.

## Folder Structure

```plaintext
BusTicket_Frontend/
├── public/
├── src/
│   ├── components/
│   │   └── LandingForm.jsx
│   ├── Functions/
│   │   └── handleSearchInput.js
│   ├── App.jsx
│   └── index.js
├── index.css
├── package.json
└── README.md
