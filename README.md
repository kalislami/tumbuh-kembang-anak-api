# Web API - Data Tumbuh Kembang Anak

This Web API provides various services to support the management of child growth and development data, such as storing physical, mental, and other developmental information. This API is built using Node.js and MongoDB as the database.

## Key Features
- Store child growth and development data
- Display child development history
- Provide an endpoint to search child data by ID
- Add, update, and delete child data

## Technologies Used
- **Node.js** - A runtime environment to run JavaScript on the server.
- **Express** - A framework for building web applications with Node.js.
- **MongoDB** - A NoSQL database to store data flexibly.
- **Mongoose** - An ODM (Object Data Modeling) library for MongoDB and Node.js.

## Prerequisites
Before running the API, make sure you have installed the following:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) or use a cloud MongoDB service like MongoDB Atlas

## Installation

**Follow these steps to set up this project locally:**

   ```bash
   git clone https://github.com/kalislami/tumbuh-kembang-anak-api.git
   cd tumbuh-kembang-anak-api
   npm install
   ```

## Directory Structure
#### /tumbuh-kembang-anak-api
├── /__ test __       => Unit test directory.  
├── /helpers          => For functions helper.  
├── /models           => MongoDB models for child data.  
├── /routes           => API route definitions.  
├── index.js          => Main file to run the server.  
└── package.json      => Dependencies and scripts for the project.  

## Running Unit Test
**Run the command below, and it will display all test cases and coverage:**

   ```bash
   npm run test
   ```

## API Endpoints
#### The list of API endpoints can be checked in the Postman collection in this repository.

## Running the Application

#### 1. Manually

- **Make sure there is a connection to MongoDB in MongoDB Atlas.**
- **Create .env file alongside index.js, then set the MONGO_URI environment variable, for example:**
```bash
MONGO_URI = 'mongodb+srv://user:password@cluster.id.mongodb.net'
   ```
- **Run the command below:**

```bash
npm run dev
   ```
- **The API can be accessed at localhost:3000.**

#### 2. Using Docker

- **Ensure Docker is installed.**
- **Run the following commands:**

```bash
docker build --no-cache -t tumbuh-kembang-anak-api .
docker run -d -p 3000:3000 --name tumbuh-kembang-anak-api tumbuh-kembang-anak-api
   ```
- **The API can be accessed at localhost:3000.**

## Licence
#### This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing
#### Please fork the repo and submit pull requests for contributions.

## Contact
#### For questions, contact me at [email](mailto:kamalgoritm@gmail.com).
