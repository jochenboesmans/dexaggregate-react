# DexAggregate

A simple explorer for aggregated market data from various decentralized exchanges. Currently the app uses data from `Ddex`, `Idex`, `Paradex`, `Kyber Network`, `Oasis Dex`, `Token Store`, `Uniswap`, and `Radar Relay`.

A live version is available at [dexaggregate.com](https://www.dexaggregate.com).

## Stack

##### Back-end

NodeJS application that fetches current market state from various decentralized exchanges and merges these into a single market data structure. Markets are rebased to DAI using a 2-layer volume-weighted deep rebasing algorithm available in `util/rebasing.js`.
This market is served via both a simple [API](#api) and a Socket.IO endpoint.

##### Front-end

React application that opens a Socket.io client that subscribes to a market broadcast on the server and displays the latest version in a user-friendly environment.
Filtering the market based on an exchange or a token symbol is possible through the search bar and clicking on a pair will disaggregate the market into exchange-specific pairs.

## Running Locally

Running the back-end locally will require you to supply your own Paradex API key through a `PARADEX_API_KEY` environment variable hosted in a `.env` file in the root directory of this project.
Other than that, you should be able to run the whole project locally through yarn (or npm after creating a package-lock.json).

For example, if you just want to run a development version of the application, you can use `yarn run dev`.
This will run a the back-end and a webpack development server that hosts the front-end concurrently.

## API

If you wish to access the market and exchanges used by the application, you can do so at the endpoints:

* `/api/market` (whole market)
* `/api/exchanges` (all exchanges included in the market)

* `/api/market/:exchangeID` (filters market by exchangeID)








