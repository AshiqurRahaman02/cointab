# Cointab SE-ASSIGNMENT

### Cointab SE-ASSIGNMENT is a react application for managing users and posts data using a SQL database. It provides RESTful API endpoints to perform CRUD operations on users and posts.

## Table of Contents

-  [Getting Started](#getting-started)
   -  [Prerequisites](#prerequisites)
   -  [Installation](#installation)
   -  [Configuration](#configuration)
-  [Usage](#usage)
-  [Presentation](#presentation)
-  [Cointab server](#cointab-server)
-  [Contributing](#contributing)
-  [License](#license)



## Getting Started

Welcome to the Cointab App! This section will guide you through the process of setting up and using the project.

### Prerequisites

To start with the Cointab App you don't need any tools but you need a deeper understanding of the [React](https://react.dev/) and [Typescript](https://www.typescriptlang.org/)

### Installation

Follow these steps to install and run the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/AshiqurRahaman02/cointab.git
   ```

2. Navigate to the project directory:

   ```bash
   cd cointab
   ```

3. Set up your environment variables by creating a `.env` file in the root directory. Example content:

   ```env
   REACT_APP_BACKEND_APP_BASE_URL=your server url
   ```

4. Start your application:

   ```bash
   npm start
   ```

5. Open the app in your browser at http://localhost:3000.

### Configuration

Before running the application, make sure to configure the necessary environment variables in the `.env` file.

## Usage

To use the project, follow these steps:

1. Open the app in your browser at http://localhost:3000.
 - **Home page:** 

    2. Click on All Users to get all users
    3. Click on Add if you want to add that user to your database 
    4. Click on Open if you want to see that user's posts 
 - **Post page:**

    5. Click on Bulk Add if you want to add that user's posts to your database
    6. Click on Download in Excel if you want to download user's posts in Excel format

## Presentation

[Google Drive](https://drive.google.com/file/d/1sF9FFjpjmf3uT9lkL-ej6UwG5Gx1ZxLy/view?usp=sharing)

## Cointab server

To use the cointab server you need to read the configuration at [cointab-server](https://github.com/AshiqurRahaman02/cointab-server.git)



## Contributing

Thank you for considering contributing to our project! Whether you're reporting a bug, proposing a feature, or submitting code changes, your contributions are highly appreciated.

## Issues

If you find a bug, have a question, or want to propose a new feature, check our issue tracker for existing topics. If not found, feel free to open a new issue and provide details such as a clear title, steps to reproduce, and your environment.

## Feature Requests

Have a feature in mind? We welcome new ideas and enhancements. Open an issue on our GitHub repository to discuss and share your thoughts with the community.

## Pull Requests

Contributions through pull requests are welcome. To contribute:

1. Fork the repository.

2. Create a new branch for your changes: git checkout -b feature/your-feature.

3. Make changes following our coding standards.

4. Push changes to your fork: git push origin feature/your-feature.

5. Open a pull request on GitHub with a clear description of your changes.

## Coding Standards

-  **Indentation and Formatting:**

   1. Use tabs for indentation.
   2. Follow the standard React formatting guidelines. You can use the Prettier extension to automatically format your code.
   3. Variable Naming:

-  **Variable Naming**

   1. Use meaningful and descriptive names for variables.
   2. Follow the camelCase naming convention for variables.

-  **Function Naming:**

   1. Use camelCase for function names.
   2. Choose function names that indicate their purpose.

-  **Comments:**

   1. Include comments to explain complex sections of code or to provide context.
   2. Write clear and concise comments.

-  **Error Handling:**

   1. Properly handle errors using the if err != nil pattern.
   2. Avoid generic error messages; provide specific details when handling errors.

-  **Testing:**

   1. Write comprehensive unit tests for your code.
   2. Ensure that tests cover different scenarios and edge cases.

-  **Documentation:**

   1. Provide documentation for public functions and packages.
   2. Use GoDoc-style comments for documenting functions and packages.

-  **Imports:**

   1. Group imports into standard library packages, third-party packages, and local packages.
   2. Avoid unused imports.

-  **Concurrency and Goroutines:**

   1. Use goroutines and channels responsibly.
   2. Ensure proper synchronization to avoid race conditions.

-  **Code Modularity:**

   1. Encapsulate functionality into modular functions and packages.
   2. Aim for a clear separation of concerns.

-  **Security:**

   1. Follow security best practices, especially when dealing with user input.
   2. Be mindful of potential vulnerabilities and address them promptly.

-  **Version Control:**

   1. Make small, meaningful commits with clear commit messages.
   2. Avoid committing large binary files or sensitive information.

## Getting Help

For questions or assistance, open an issue or join community discussions.

##

```
Thank you for contributing! Feel free to customize it based on your project's specifics.
```
