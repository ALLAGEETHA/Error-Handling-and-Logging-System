Error Handling and Logging System 

Welcome! This project is a simple Node.js and Express application that talks to the JSONPlaceholder API to perform Create, Read, Update, and Delete (CRUD) operations on posts. It’s designed to show how to handle errors gracefully (like network issues or bad responses) and keep detailed logs that help you troubleshoot problems quickly.

How It Works

- Express Server: Listens on port 3000 (by default) and exposes routes under `/posts`.
- Axios: Makes HTTP requests to the JSONPlaceholder API.
- Validation: Checks each response’s status and data format before sending it back to the client.
- Error Handling: Catches problems such as timeouts, HTTP errors, or unexpected data and returns a clear JSON error message.
- Logging: Uses Winston to record events and errors both in 

📂 Folder Structure 
├── app.js
├── logger.js
├── package.json
├── README.md
├── logs/
│   ├── error.log
│   └── combined.log
└── public/
    ├── index.html
    └── style.css

 Quick Start

1. Clone the rreport
   
   git clone https://github.com/your-username/error-handling-logging-system.git
   cd error-handling-logging-system
   
2. Install dependencies
   
   npm install
   
3. Create a `logs` folder (if it’s not already there)
   
   mkdir logs
  
4. Run the server
   
   npm start
   
5. Open your browser or API tool (Postman, cURL) and go to `http://localhost:3000/posts`.

Available Endpoints

| Method | Endpoint          | Description                     |
| ------ | ----------------- | ------------------------------- |
| GET    | `/posts`          | List all posts                  |
| GET    | `/posts/:id`      | Get a single post by its ID     |
| POST   | `/posts`          | Create a new post               |
| PUT    | `/posts/:id`      | Update an existing post         |
| DELETE | `/posts/:id`      | Delete a post by its ID         |

Example Request


curl -X POST http://localhost:3000/posts 
  -H "Content-Type: application/json" 
  -d '{"title":"Hello","body":"World","userId":1}'
```

Logging Explained

1. Console Output**: See info and error messages live while you run the server.
2. Log Files (in `logs/` folder)**:
   - `combined.log`: All application logs (info, warning, error).
   - `error.log`: Only error messages.
   - `exceptions.log`: Uncaught exceptions.
   - `rejections.log`: Unhandled promise rejections.

Why Logging Matters

- Debugging: Quickly find what went wrong and when.
- Monitoring: Keep track of application health over time.
- Postmortem: Review logs to understand and fix issues after they occur.

Contributing

Feel free to fork the project and send pull requests. If you spot a bug or have ideas for improvements, create an issue or reach out!


This project is open source under the MIT License. Enjoy and happy coding!
