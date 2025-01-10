# Cryptocurrency Tracker

This project is a server-side application built using **Node.js** and **Fastify**, with **MongoDB** as the database. It provides functionalities to fetch, store, and analyze cryptocurrency data.

## Features

- Background job to fetch cryptocurrency data every 2 hours from the CoinGecko API.
- API to fetch the latest cryptocurrency stats directly from the CoinGecko API.
- API to calculate the standard deviation of cryptocurrency prices from the last 100 records stored in the database.

## Technologies Used

- **Node.js** with ES Modules
- **Fastify** for the server framework
- **MongoDB** for database storage
- **CoinGecko API** for cryptocurrency data
- **node-schedule** for background job scheduling

---

## Setup Instructions

### Prerequisites

- Node.js installed (v14+ recommended)
- MongoDB instance running locally or in the cloud

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rdj68/crypto-stats
   cd crypto-stats
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   MONGO_URI=mongodb://localhost:27017/crypto-tracker
   COIN_GECKO_API_URL=https://api.coingecko.com/api/v3/simple/price
   ```

4. Start the server:

   ```bash
   npm start
   ```

---

## APIs

### 1. **Fetch Latest Cryptocurrency Stats**

**Endpoint:** `GET /stats`

Fetches the latest stats (price, market cap, 24-hour change) for a cryptocurrency directly from the CoinGecko API.

**Query Parameters:**

| Parameter | Type   | Description                              |
| --------- | ------ | ---------------------------------------- |
| `coin`    | String | The cryptocurrency ID (e.g., `bitcoin`). |

**Sample Request:**

```bash
curl -X GET 'http://localhost:3000/stats?coin=bitcoin'
```

**Sample Response:**

```json
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```

### 2. **Get Price Deviation**

**Endpoint:** `GET /deviation`

Calculates the standard deviation of the cryptocurrency's price over the last 100 records stored in the database.

**Query Parameters:**

| Parameter | Type   | Description                              |
| --------- | ------ | ---------------------------------------- |
| `coin`    | String | The cryptocurrency ID (e.g., `bitcoin`). |

**Sample Request:**

```bash
curl -X GET 'http://localhost:3000/deviation?coin=bitcoin'
```

**Sample Response:**

```json
{
  "deviation": 4082.48
}
```

---

## Background Job

### Functionality

A scheduled background job runs every 2 hours to fetch and save the following details for Bitcoin, Matic, and Ethereum:

- Current price in USD
- Market cap in USD
- 24-hour change in percentage

### How it Works

1. Fetches cryptocurrency data from the CoinGecko API.
2. Maps the data to the required schema.
3. Saves the data to the MongoDB database.

### Implementation

The job is scheduled using **node-schedule** in `index.js`. The job logic is implemented in `services/cryptoService.js`.

---

## Project Structure

```plaintext
.
├── controllers
│   ├── statsController.js
│   ├── deviationController.js
├── models
│   ├── cryptoData.js
├── routes
│   ├── cryptoRoutes.js
├── services
│   ├── cryptoService.js
├── utils
│   ├── cryptoUtils.js
|   ├── mathUtils.js
├── .env
├── index.js
├── package.json
```

---

## Future Enhancements

- Add authentication for APIs.
- Extend support for additional cryptocurrencies.
