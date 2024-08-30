![image](https://github.com/user-attachments/assets/7631e484-3a79-4bec-827d-3d7e07cc3c58)

---

# Contributing to Tic Tac Toe

First off, thank you for considering contributing to this project! Your contributions are highly valued and appreciated.

## How to Contribute

### 1. Fork the Repository

1. Fork the repository by clicking the "Fork" button at the top right of the project page.
2. Clone your fork to your local machine:

   ```bash
   git clone https://github.com/ashkarim/tic-tac-toe.git
   cd tic-tac-toe
   ```

### 2. Set Up the Development Environment

#### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd client
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run start
   ```

#### Backend

1. Navigate to the backend directory:

   ```bash
   cd server
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Set up MongoDB:
   - Make sure MongoDB is running locally or set up a cloud instance.
   - Create a `.env` file in the backend directory and add your MongoDB connection string:

     ```bash
     MONGO_URI=mongodb://localhost:27017/tictactoe
     ```

4. Start the backend server:

   ```bash
   npm start
   ```

### 3. Make Changes

- **Create a new branch**: Always create a new branch for your work to keep your changes organized and isolated.

  ```bash
  git checkout -b feature/your-awesome-feature-name
  ```

- **Make your changes**: Implement the new feature, fix a bug, or improve the documentation.

- **Commit your changes**: Write clear and concise commit messages.

  ```bash
  git add .
  git commit -m "Add feature: description of your feature"
  ```

### 4. Test Your Changes

Before submitting your changes, ensure that everything works as expected:

- **Run tests**: If you’ve added new functionality, make sure to write and run tests to verify your changes.

  ```bash
  # Run frontend tests
  cd client
  npm run test

  # Run backend tests
  cd ../server
  npm run test
  ```

### 5. Submit a Pull Request

1. Push your branch to your fork:

   ```bash
   git push origin feature/your-awesome-feature-name
   ```

2. Go to the original repository on GitHub and submit a pull request.
3. Provide a detailed description of your changes, including the motivation and context.

### 6. Code Review

Your pull request will be reviewed by one of the project maintainers. Please be responsive to any feedback or requests for changes.

## Coding Standards

- **JavaScript/React:** Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for writing clean and consistent code.
- **CSS/TailwindCSS:** Adhere to [TailwindCSS best practices](https://tailwindcss.com/docs/utility-first).
- **Commit Messages:** Use meaningful commit messages that describe what your changes do.

## Issue Reporting

If you find a bug or have a feature request, please open an issue on GitHub. Make sure to provide detailed information about the problem, how to reproduce it, and your environment (OS, browser, etc.).
