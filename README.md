# AngularTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Design Choices

A module called customer is created on top of the cart and product component for scalability purposes and to allow lazy loading.

A mock-Api service is made to stimulate a http request

Local Storage is used to store the cart items

Currency pipe is used to display the price with 2 decimal places and NZD