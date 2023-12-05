
# CST8334 Software Development Project

## Client
Goopter eCommerce Solutions (https://www.goopter.com/)

## Authors
Algonquin College Student Team 
23F_CST8334_310 Team 4

## Description
This project is to develop a web-based referral and sales management portal for our client, Goopter eCommerce Solutions. 
This app allows for accurate tracking of sales performance, commission calculations, and payout processing, ultimately leading to increased efficiency and reduced manual effort.

## Prerequisites
Before you begin, ensure you have met the following requirements:

- Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) for the React frontend.
- Install [Composer](https://getcomposer.org/) for PHP dependency management.
- Install [PHP](https://www.php.net/) and [Laravel](https://laravel.com/docs/8.x) for the Laravel backend.
- Set up a database server (e.g., [MySQL](https://www.mysql.com/)).

## Setting up the local environment
1. **Laravel Backend:**

    - Create a new Laravel project:
      ```bash
      composer create-project --prefer-dist laravel/laravel your-project-name
      ```
    - Navigate to the project:
      ```bash
      cd your-project-name
      ```
    - Set up the database by configuring details in the `.env` file and running migrations:
      ```bash
      php artisan migrate
      ```

2. **React Frontend:**

    - Create a new React app:
      ```bash
      npx create-react-app react-app
      ```
    - Navigate to the React app:
      ```bash
      cd react-app
      ```
    - Install Axios for API requests:
      ```bash
      npm install axios
      ```

3. **Connect React with Laravel:**

    - Install the `fruitcake/laravel-cors` package for CORS:
      ```bash
      composer require fruitcake/laravel-cors
      ```
    - Configure CORS in `config/cors.php`.
    - Define API routes in Laravel routes file (`routes/api.php`).
    - Set the base URL for Axios in your React app (e.g., `src/index.js`).

## Running the application
1. **Start Laravel Server:**
   ```bash
   php artisan serve
   
2. **Start React App**
   ```bash
   npm start
   
3. Access the Application:
Open your browser and visit http://localhost:3000 for the React app.
Laravel API endpoints will be accessible at the defined routes (e.g., http://localhost:8000/api/some-endpoint).

## Future Recommendations



## License
ReactJS is a free and open-source front-end JavaScript library for building user interfaces.(http://www.reactjs.org)
The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
