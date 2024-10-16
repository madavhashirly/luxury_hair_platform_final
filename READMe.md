---

## Getting Started

### Prerequisites
- **Java 11 or higher**
- **Node.js and npm/yarn**
- **Maven**
- **MySQL** or your preferred relational database (make sure to configure the `application.properties` for database connection)

---

### Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd luxury_hair_platform/luxury_hair_platform_backend
   ```

2. Install the required dependencies and build the project using Maven:

   ```bash
   mvn clean install
   ```

3. Configure the database connection in `src/main/resources/application.properties`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/luxury_hair_db
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   ```

4. Run the Spring Boot application:

   ```bash
   mvn spring-boot:run
   ```

   The backend server should be running on `http://localhost:8080`.

---

### Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd luxury_hair_platform/luxury_hair_platform_frontend
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

   or if you are using yarn:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root of the frontend folder and add the API URL (backend address):

   ```bash
   REACT_APP_API_URL=http://localhost:8080/api
   ```

4. Run the React development server:

   ```bash
   npm start
   ```

   or if you are using yarn:

   ```bash
   yarn start
   ```

   The frontend application should now be running on `http://localhost:3000`.

---

## Running the Application

### Backend

- Ensure that you are in the `luxury_hair_platform_backend` directory and run:
  ```bash
  mvn spring-boot:run
  ```
  The backend runs on `http://localhost:8080`.

### Frontend

- Ensure that you are in the `luxury_hair_platform_frontend` directory and run:
  ```bash
  npm start
  ```
  The frontend runs on `http://localhost:3000`.

Both the frontend and backend are expected to run simultaneously, with the frontend communicating with the backend via API requests.

---

## Git Workflow

Since both the frontend and backend are part of the same Git repository, follow these guidelines when working with Git.
