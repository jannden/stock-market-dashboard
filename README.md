# Stock Market Dashboard

[Open live](https://jannden.github.io/stock-market-dashboard)

A stock market dashboard built with React-Redux to visualize a predefined set of stock market indexes.

Tech stack:
- [Firebase Auth and Firestore](https://firebase.google.com/)
- [Material UI](https://mui.com/material-ui/)
- [Apex Charts](https://apexcharts.com/)
- Data from [Alpha Vantage](https://www.alphavantage.co/)
- Husky for pre-commit linting
- E2E tests with Cypress
- Unit tests with Jest with Enzyme

## How to


1. Run Project Locally
      - `npm i` to install dependencies
      - `npm run build` to build the project (necessary for serving static files even if you want to run the project locally)
      - `npm run start` to run the project locally

2. Husky
    - `npm i -g husky` to install Husky
    - `npm run prepare` to install Git hooks with Husky

3. Cypress
    - `npm i -g cypress` to install Cypress
    - Make sure to run the project locally before running Cypress.
    - `npm run cypress` to run Cypress
    - `npm run cypress:open` to open Cypress

4. Jest
    - `npm run test` to run Jest
    - `npm run test:watch` to run Jest in watch mode
    - `npm run test:coverage` to run Jest with coverage
