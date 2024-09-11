# Bus Ticket Booking - Frontend

This is the frontend part of the Bus Ticket Booking website, where users can search for buses based on departure city, destination city, and date.

Visit the live website: [Talha Paribahan](https://talha-paribahan.vercel.app/)

This project is my first full-stack web design where I learned about data management and how to use data for specific needs.

## Features

- **City Search with Suggestions**: Users can select departure and destination cities with an auto-suggestion dropdown.
- **Date Picker**: Users can select the travel date.
- **Form Validation**: Input fields are validated before searching for available buses.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Talhanasar/BusTicket_Frontend.git
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
