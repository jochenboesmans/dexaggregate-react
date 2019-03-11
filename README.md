# DexAggregate

A simple explorer for aggregated market data from various decentralized exchanges. Currently the app uses data from `Ddex`, `Idex`, `Paradex`, `Kyber Network`, `Oasis Dex`, `Token Store`, `Uniswap`, and `Radar Relay`.

A live version is available at [dexaggregate.com](http://www.dexaggregate.com).

## Stack

##### Back-end

NodeJS application that fetches current market state from various decentralized exchanges and merges these into a single market data structure. Markets are rebased to DAI using a 2-layer volume-weighted deep rebasing algorithm available in `util/rebasing.js`.
This market is served via both a simple [API](#api) and a Socket.IO endpoint.

##### Front-end

React application that opens a Socket.io client that subscribes to a market broadcast on the server and displays the latest version in a user-friendly environment.
Filtering the market based on an exchange or a token symbol is possible through the search bar and clicking on a pair will disaggregate the market into exchange-specific pairs.

## Running Locally

##### Back-end

Running the back-end locally will require you to supply your own Paradex API key through a `PARADEX_API_KEY` environment variable hosted in a `.env` file in the root directory of this project.
Other than that, you should be able to run it locally through yarn (or npm after creating a package-lock.json).

Available scripts are:
* `build`: runs ESLint and Babel across the code and puts output in `/build`
* `start`: runs `yarn run build` and executes the outputted code (starting the server)

You can replace `yarn` with `npm` in `package.json` to use the `start` script with `npm`, or you can just make your own script.

##### Front-end

Available scripts are:
* `start`: runs a webpack-dev-server simulating `serve`
* `build`: runs the production webpack build which it outputs in `/build`
* `serve`: runs `yarn run build` and runs a node process serving these static files

You can replace `yarn` with `npm` in `package.json` to use the `serve` script with `npm`, or you can just make your own script.

## Back-end API

If you wish to access the market and exchanges used by the application, you can do so at these endpoints on a running back-end instance:

* `/api/market` (whole market)
* `/api/exchanges` (all exchanges included in the market)

* `/api/market/:exchangeID` (filters market by exchangeID)









