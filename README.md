# Tic-Tac-Toe Multiplayer Game

## Project Overview

This project is a real-time multiplayer Tic-Tac-Toe game built using modern web technologies. It features a client-server architecture, allowing players to compete against each other online.

## Technology Stack

### Frontend
- React
- TypeScript
- Vite (for fast development and building)

### Backend
- Node.js
- Express.js
- Socket.IO (for real-time communication)
- MongoDB (for data persistence)

## Key Features

1. **Real-time Gameplay**: Utilizes Socket.IO for instant updates during matches.
2. **User Authentication**: Supports user signup, signin, and session management.
3. **Multiple Game Rooms**: Players can join different game rooms for concurrent matches.
4. **Responsive Design**: Built with React for a smooth, responsive user interface.

## Project Structure

The project is divided into two main parts:

1. **Client**: Located in the `client/` directory, built with React, TypeScript, and Vite.
2. **Server**: Located in the `server/` directory, built with Node.js and Express.

### Server Structure
- `src/app.ts`: Main application file, sets up Express and Socket.IO
- `src/routes/users.ts`: Handles user-related routes
- `src/controllers/AuthController.ts`: Manages authentication logic
- `src/Models/User.ts`: Defines the User model for MongoDB
- `src/engine/db.ts`: Manages database connection

## Setup and Installation

1. Clone the repository
2. Install dependencies for both client and server:
   ```
   cd client && npm install
   cd ../server && npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the server directory
   - Add necessary variables (e.g., `MONGO_USERNAME`, `MONGO_PASSWORD`, `SERVER_PORT`, `SERVER_HOST`)

4. Start the server:
   ```
   cd server && npm start
   ```
5. Start the client:
   ```
   cd client && npm run dev
   ```

## API Endpoints

- `POST /signup`: Register a new user
- `POST /signin`: Authenticate a user
- `GET /@me`: Get current user information
- `GET /status`: Check server status

## Socket Events

- Connection handling
- Game room management
- Game state updates

## Future Enhancements

- Implement game history tracking
- Add player rankings and leaderboards
- Introduce different game modes or board sizes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).



