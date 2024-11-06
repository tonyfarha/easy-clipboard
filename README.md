# Easy Clipboard

Easy Clipboard is a lightweight, real-time clipboard-sharing app. It allows users to share text between multiple browsers instantly.

## Features

- **Real-Time Sharing**: Share text instantly between multiple clients in real time.
- **No Data Storage**: All data is handled in memory, ensuring nothing is stored permanently.
- **Unique Session IDs**: Each session generates a unique ID, so users can easily access their shared clipboard on different devices.
- **Socket.io Powered**: Enables instant, bi-directional communication between clients.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

- Node.js
- npm

### Installation

1. Clone this repository to your local machine.
2. Navigate into the project root directory:
   ```bash
   cd easy-clipboard
   ```
3. Install the root dependencies:
   ```bash
   npm install
   ```
4. Go to the `backend` directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
5. Go to the `frontend` directory and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
6. Duplicate the `.env.example` to `.env` in both the frontend and backend directories and configure variables as needed:
   ```bash
   cp .env.example .env
   ```
   Update any environment variables in the `.env` file to match your setup.

7. Return to the root directory and start the development server:
   ```bash
   cd ..
   npm run dev
   ```
8. Open the URL shown in the terminal to access the app.

### How It Works

- When a user opens Easy Clipboard, a unique session ID is generated.
- Text shared in the clipboard is sent to all clients connected to the same session via Socket.io.
- Since everything happens in memory, closing the app or disconnecting will clear all data.
