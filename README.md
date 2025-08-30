*********https://github.com/saib0236/api-tests-with-playwright**********


API Test Automation with Playwright and Allure Reporting(by Sai kumar)

## How to Run the Tests


########## Prerequisites for This Project#################

1. Node.js

- **Version:** Node.js v16 or above is required.
- **Download:** [https://nodejs.org/](https://nodejs.org/)

2. npm (Node Package Manager)

- Comes bundled with Node.js.
- Used to install project dependencies.

3. Git (for cloning the repository)

4. An IDE or Code Editor: VS Code, WebStorm, Atom, etc.

5. Run Book Store API on local machine after reading the Book API's own README.md file

############ Steps to Execute This Project##################

Follow these steps to set up and run the Playwright API testing project with Allure reports.

1. Clone the Repository

```sh
git clone https://github.com/saib0236/api-tests-with-playwright.git
cd api-tests-with-playwright
```
2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) (v16 or above) installed.

```sh
npm install
```
3. Install Allure Commandline and Serve (if not globally installed)

```sh
npm install -g allure-commandline serve
```
4. Configure Environment (if needed)

- Edit `config.json` to set the correct API base URLs or credentials for  environment.

5. Run the Tests and Generate Allure Report

To execute all tests in the required order and immediately view the Allure HTML report, use:

```sh
npm run test:allure:ordered
```

This will:
- Run all test files in the specified (sequential) order.
- Generate Allure results.
- Build and serve the Allure HTML report on a local web server.

6. View the Allure Report

- After the above command, open  browser and go to:
  ```
  http://localhost:3000
  ```
  (or the port specified by `serve` in  shell output)

  7. (Optional) Run Individual Tests

You can also run individual test files using Playwright CLI:

```sh
npx playwright test tests/authentication/01-server-readiness-check.spec.js
```

##########Sample Report##############
I used index.html and Allure-reports for reporting.

##################Project Structure##################

api-tests-with-playwright/
├── allure-report/        # Allure HTML reports output
|
├── config.json           # Configuration file for tests
|
├── node_modules/         # Node.js dependencies
|
├── package.json          # Project dependencies and scripts
|
├── playwright.config.js  # Playwright configuration
|
├── test-results/         # Playwright test output
|
├── tests/                # API test scripts
	|
	├── authentication/
	│   ├── 01-server-readiness-check.spec.js         # Checks API server health/readiness endpoint
	│   └── 02-authentication.spec.js                 # Tests signup, login, token generation, duplicate email, wrong credentials
	├── books/
	│   ├── 03-books_management.spec.js               # Tests CRUD operations for books (add, fetch, update, delete)
	│   └── 04-negativeToken.spec.js                  # Tests negative scenarios: invalid token and invalid book IDs

############# Project Structure Implementation Details#################

This document details the structure and purpose of each folder and file in the project's test suite.

---

## Root Directory

- **config.json**  
  Stores configuration data such as base URLs for different environments (e.g., QA, Staging, Production). It enables environment-based testing without hardcoding values in the scripts.

---

## tests/

The main directory for all test-related code, data, and utilities.

### ├── authentication/

Contains all API test scripts related to authentication and server status.

- **01-server-readiness-check.spec.js**  
  Verifies that the API server is up and running by hitting the health/status endpoint.

- **02-authentication.spec.js**  
  Covers sign-up, login, token generation, and various negative authentication scenarios (e.g., duplicate email, invalid credentials).

---

### ├── books/

Contains API test scripts for book resource management.

- **03-books_management.spec.js**  
  Tests CRUD operations for books (create, read, update, delete, list) using a valid authentication token.

- **04-negativeToken.spec.js**  
  Tests negative scenarios for the books API, including invalid token usage and invalid book IDs.

---

### ├── data/

Holds all test data files in JSON format for easy data-driven testing.

- **book.json**  
  Stores sample payloads for creating and updating books. Example keys: `CreateBook`, `UpdateBook`.

---

### ├── utils/

Contains helper modules and utility functions for use across test scripts.

- **apiendpoints.js**  
  Centralizes all API endpoint paths. Prevents hardcoding of endpoint URLs in test scripts.

- **testutils.js**  
  Provides utility functions (e.g., for generating tokens, building payloads, and other reusable operations).

---

## Implementation Summary

- **Modularity:**  
  Tests are grouped by feature/domain (authentication, books).

- **Maintainability:**  
  Test data and endpoints are externalized for easy updates.

- **Reusability:**  
  Utility functions and constants are imported wherever needed, reducing duplication.

- **Data-Driven:**  
  Test payloads are managed in JSON files, enabling scalable and flexible test coverage.

---

This structure ensures a clean separation of concerns and supports scalable, maintainable, and robust API test automation.


############## Data-Driven Testing###########
Data-driven testing in this project is handled by storing input data in JSON files (like book.json), importing this data into Playwright test scripts, and using it for API requests. This makes it easy to maintain and expand  test suite with new data scenarios.

######### Assertions#############
Assertions in  project are handled using the expect API from Playwright (@playwright/test). This API is used throughout  .spec.js files to validate both HTTP response status codes and the contents of JSON responses.

Common Assertion Patterns Used
Status Code Assertions

JavaScript
expect(response.status()).toBe(200);
expect(response.status()).toBe(400);
expect(response.status()).toBe(403);
expect(response.status()).toBe(422);
JSON Response Assertions

JavaScript
const body = await response.json();
expect(body.status).toBe('up');
expect(body.message).toContain('Book deleted successfully');
expect(body.detail).toBe('Invalid token or expired token');
expect(body.detail[0].msg).toBe('Input should be a valid integer, unable to parse string as an integer');
Token or Data Existence

JavaScript
expect(tokenResp.token).toBeTruthy();
expect(bookId).not.toBeNull();
Data Content Validation

JavaScript
expect(data.name).toContain(addBook.CreateBook.name);
expect(updatedData.name).toBe(addBook.UpdateBook.name);
expect(data.length).toBeGreaterThan(0);
How They Work
Synchronous and Asynchronous:
Assertions are placed after async API calls, often after parsing JSON responses.

Error Handling:
When assertions fail, Playwright marks the test as failed and outputs the details in the console and in Allure reports.

Coverage:
Assertions are used for both positive and negative test flows, ensuring that both success and error conditions are validated.

Summary:
Assertions in this project are consistently handled using Playwright’s built-in expect function, covering HTTP status, response body fields, and presence/validity of data to ensure robust API validation.

#################### API Test Strategy#####################

This document outlines the API test strategy for the project, including the scope, approach, and specific positive and negative test flows as implemented in the test suite.

1. Objectives

- Ensure that all critical API endpoints are functioning as expected.
- Validate authentication, authorization, and CRUD operations for resources (like Books).
- Ensure robust error handling and correct responses for invalid or unauthorized requests.

2. Scope

- **Authentication APIs**: Sign-up, login, token generation, and negative auth scenarios.
- **Book APIs**: CRUD operations on Book resources.
- **Health Check**: Server readiness/status endpoint.

3. Approach

- Automated API testing using Playwright’s API capabilities.
- Test data and endpoints are managed through utility files and configuration for maintainability and reusability.
- Test execution is ordered (using file prefixes) where dependencies exist.
- Allure is used for test reporting to provide detailed insights.

4. Test Flows

A. Positive Flows Covered

**Authentication**
- Sign up a new user.
- Login and generate a valid token for an existing user.
- Repeated sign-up attempt with an existing email (should gracefully fail—see negative flows).

**Book Management**
- Add a new book with a valid token.
- Fetch a book by valid ID.
- Update an existing book by valid ID.
- List all books.
- Delete a book by valid ID.

**Health Check**
- Confirm server readiness and status is "up".

B. Negative Flows Covered

**Authentication**
- Attempt to sign up with an already registered email (should receive appropriate error).
- Login with incorrect password (should receive error).
- Login with incorrect email (should receive error).

**Book Management**
- Add a book with an invalid token (should be forbidden).
- Delete a book with an invalid token (should be forbidden).
- Fetch a book with an invalid ID (should receive validation error).
- Attempt API actions with expired or malformed tokens.

5. Test File Mapping

| Test File                                      | Positive Flows                                      | Negative Flows                                  |
|------------------------------------------------|-----------------------------------------------------|-------------------------------------------------|
| authentication/01-server-readiness-check.spec.js| Server is up and healthy                            | –                                               |
| authentication/02-authentication.spec.js        | Signup, login with valid credentials                | Signup with existing email, wrong credentials    |
| books/03-books_management.spec.js               | Add, fetch, update, list, delete books (valid token)| –                                               |
| books/04-negativeToken.spec.js                  | –                                                   | Invalid token usage, invalid ID usage           |

6. Test Data and Utilities

- **Test data** is managed in JSON files (e.g., `tests/data/book.json`).
- **Utility functions** (e.g., token generation, endpoint management) are centrally located in `tests/utils/`.

7. Reporting

- Allure reporting provides detailed and interactive test results after each test run.

8. Summary

This strategy ensures both the happy path (positive flows) and error handling (negative flows) are robustly covered for the API, with a maintainable and scalable structure for future test cases.


################Challenges: ####################
## Sequential Test Execution in Playwright

Playwright, by default, does **not** guarantee sequential execution of test files. This means that test files may be run in parallel, and their execution order is not predictable just by their names.

### How This Project Handles Sequential Test Runs

To ensure that certain test scripts run in a specific order (for example, authentication before API resource creation), we have adopted the following convention:

- **Test files are prefixed with numbers** such as `01-`, `02-`, etc.
- Example:
  ```
  tests/
  ├── authentication/
  │   ├── 01-server-readiness-check.spec.js
  │   └── 02-authentication.spec.js
  └── books/
      ├── 03-books_management.spec.js
      └── 04-negativeToken.spec.js
  ```
- When executing with a shell command like `npx playwright test tests/**/*.spec.js`, files are run in the order they are listed. By naming files with numeric prefixes, you can control the sequence.

**Note:**  
This approach only works if you run Playwright tests by explicitly listing the files or using a shell glob pattern that respects file order. Playwright itself does not enforce this order if you use its default test runner behavior.

### Recommendation

- Use numeric prefixes consistently for any test files that need to be run sequentially.
- If true sequential execution is critical (for instance, stateful setup/teardown between files), consider combining tests into a single `.spec.js` file or use a custom test runner/script to enforce the order.


########### How to Generate and View Allure Reports#################

To generate and view Allure reports for this project, follow these steps:

1. **Run the Ordered Test Suite with Allure Reporting**

   The following npm script is used to execute all critical specs in order and generate an Allure report:

   ```json
   "test:allure:ordered": "npx playwright test tests/authentication/01-server-readiness-check.spec.js tests/authentication/02-authentication.spec.js tests/books/03-books_management.spec.js tests/books/04-negativeToken.spec.js && npx allure generate ./allure-results --clean -o ./allure-report && npx serve ./allure-report"
   ```

   This script does the following:
   - Runs the specified test files in a defined order (by listing them explicitly).
   - Generates Allure results in the `./allure-results` directory.
   - Builds an HTML Allure report in the `./allure-report` directory.
   - Serves the report locally using [serve](https://www.npmjs.com/package/serve).

2. **View the Allure Report**

   After running the command above,  Allure report will be available at [http://localhost:3000](http://localhost:3000) (or another port if specified).

---

**Summary of Steps:**

1. Make sure Allure and Serve are installed (`npm install -g allure-commandline serve`).
2. Run:
   ```sh
   npm run test:allure:ordered
   ```
3. Open the provided localhost URL in  browser to view the detailed Allure report.

**Note:**  
You must run the script exactly as described above to ensure:
- The tests are executed in the required order (for cases with dependencies between specs).
- The Allure report reflects the correct sequence and result of test execution.


Sample Allure Report for this project execution
<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/f582aad5-6304-4b24-b9a4-09c6bf52a506" />

##################### All the tools used#################

- Playwright	API/E2E test runner
- Node.js	JavaScript runtime
- Allure	Test reporting (optional, if configured)
- fs (built-in)	File operations (token, data, etc.)
- Git
- GitHub Actions: CI/CD pipeline for automated testing and deployment


