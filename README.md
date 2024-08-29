


# Tic Tac Toe Online

![image](https://github.com/user-attachments/assets/463aa34a-5007-4925-a9ed-bef6f4a327a0)

---
## Overview

This project is a **Tic Tac Toe** game that can be played in two modes:
- **Single Player:** Play against a CPU with adjustable difficulty levels.
- **Online Multiplayer:** Compete against friends or other players over the internet.

The game is built using **React** for the frontend, styled with **TailwindCSS**, and powered by an **Express.js** server. **Socket.IO** is used for real-time online multiplayer functionality, and **MongoDB** serves as the database to store game states and player data.

## Features

- **Single Player Mode:** Play against an AI with varying difficulty levels.
- **Online Multiplayer:** Challenge friends or random opponents in real-time.
- **Responsive Design:** Enjoy the game on any device, thanks to TailwindCSS.
- **Persistent Data:** Game states and player statistics are stored in MongoDB.
- **Smooth Animations:** Experience seamless and visually appealing transitions.

## Tech Stack

- **Frontend:**
  - [React](https://reactjs.org/): A JavaScript library for building user interfaces.
  - [TailwindCSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.

- **Backend:**
  - [Express.js](https://expressjs.com/): A minimal and flexible Node.js web application framework.
  - [Socket.IO](https://socket.io/): A library for enabling real-time, bidirectional communication between web clients and servers.
  - [MongoDB](https://www.mongodb.com/): A NoSQL database for storing game data and player information.

## Installation

To run the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ashtkarim/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. **Install dependencies for both frontend and backend:**

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set up MongoDB:**
   - Ensure you have MongoDB installed and running locally or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create a `.env` file in the backend directory and add your MongoDB connection string:

   ```bash
   MONGO_URI=mongodb://localhost:27017/tictactoe
   ```

4. **Start the development server:**

   ```bash
   # Start backend server
   cd server
   npm start
   
   # Start frontend
   cd ../client
   npm run start
   ```

5. **Access the application:**

   Open your browser and navigate to `http://localhost:5000`.

## Usage

- **Single Player Mode:** Play against the CPU.
- **Multiplayer Mode:** Enter the lobby, invite a friend or join an available room, and start playing.

## Contributing

If you'd like to contribute, please read [CONTRIBUTIONS](./CONTRIBUTING.md), Contributions are warmly welcome.


## Authors

- [Ali JBARI](https://github.com/ila36IX)
- [Badr ANNABI](https://github.com/Badr-Annabi)
- [Karim ASSIHOUT](https://github.com/ashtkarim)
- [Oumaima NAANAA](https://github.com/naanaa59)
- [Radouane ABOUNOUAS](https://github.com/RadouaneAbn)
- [Zidane ZAOUI](https://github.com/matsadura)

---
