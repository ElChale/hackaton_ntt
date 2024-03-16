# My Awesome App

Welcome to **My Awesome App**! This is a simple guide to get you started with the frontend and backend development environments.

## Frontend

The frontend folder contains all the necessary files and dependencies for the user interface of the application.

### Installation

To install the required dependencies, navigate to the `frontend` folder and run:

```
npm install
```

### Development

To start the development server and run the frontend application, use the following command:

```
npm run dev
```

This will start the development server and you can access the frontend of the application at `http://localhost:3000`.

## Backend

The backend folder contains all the necessary files and configurations for the server-side of the application.

### Installation

Before running the backend server, ensure you have Python installed on your system. Navigate to the `backend` folder and perform database migrations by running:

```
py manage.py migrate
```

This will apply any pending database migrations.

### Running the Server

To start the backend server, use the following command:

```
py manage.py runserver
```

This will start the server, and you can access the backend of the application at `http://localhost:8000`.

## Contributing

Thank you for considering contributing to My Awesome App! Contributions are welcome, and feel free to open issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).