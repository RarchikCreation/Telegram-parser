# Telegram-parser

This script is a Telegram message parser that logs messages from a specified channel. It allows users to log in using their Telegram credentials and automatically saves the session for future use.

## 1. Clone the Repository

To get started, clone the repository from GitHub:

```sh
git clone https://github.com/RarchikCreation/Telegram-parser.git
cd Telegram-parser
```

## 2. Install Required Packages

Make sure you have Node.js installed. Then, install the required dependencies:

```sh
npm install dotenv fs telegram input
```

## 3. Generate Your Own Hash

To generate your own `API_ID` and `API_HASH`, follow these steps:

1. Go to [my.telegram.org](https://my.telegram.org/)
2. Log in with your phone number
3. Navigate to **API Development Tools**
4. Create a new application and obtain your `API_ID` and `API_HASH`

## 4. Set Up the `.env` File

Create a `.env` file in the project root and add the following:

```sh
API_ID=your_api_id
API_HASH=your_api_hash
SESSION=
```

- Replace `your_api_id` and `your_api_hash` with the values obtained in the previous step.
- Leave `SESSION` empty; it will be filled after the first login.

## 5. Run the Bot

Start the bot using:

```sh
node script.js
```



