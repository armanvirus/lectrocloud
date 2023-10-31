# Acawave - Empowering Education Through Collaboration

 Acawave is an innovative platform designed to connect university students, foster collaboration, and provide access to valuable resources. This repository serves as the hub for the development and enhancement of the acawave platform.

![Acawave Logo](/assets/logo.png)

## Table of Contents

- [About Acawave](#about-connectix)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
- [Tech Stack](#tech-stack)
- [File Upload with Cloudinary](#file-upload-with-cloudinary)
- [Contributing](#contributing)
  - [Code Contribution](#code-contribution)
  - [Bug Reports and Feature Requests](#bug-reports-and-feature-requests)
- [License](#license)

## About Acawave

Acawave aims to revolutionize the way university students collaborate, learn, and share knowledge. With personalized newsfeeds, discussion forums, resource sharing, and expert insights, acawave empowers students to excel academically.

## Getting Started
## App overview
![demo image 1](./imgs/mobile.gif)
![demo image 1](./imgs/mobile(1).gif)
![demo image 1](./imgs/mobile(2).gif)
### Installation

1. Clone this repository:
git clone https://github.com/mufteem-ibrahim/acawave.git

2. Navigate to the project directory:
cd acawave

3. Install the required dependencies:
npm install

### Running the Development Server

1. Start the development server:
npm start

2. Open your browser and navigate to `http://localhost:3000` to see Acawave in action.

## Tech Stack

Acawave is built using the following technologies:

- Frontend: React, Redux
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## File Upload with Cloudinary

Acawave leverages [Cloudinary](https://cloudinary.com/) for seamless file uploads. Cloudinary provides an easy-to-use platform for managing and serving media files. To implement file uploads, follow these steps:

1. Sign up for a Cloudinary account.
2. Retrieve your API credentials from the Cloudinary dashboard.
3. Integrate the Cloudinary SDK in your backend for file uploads.
4. Update the frontend to handle file selection and submission.
5. Store the Cloudinary URLs in the database for resource sharing.

For detailed instructions, refer to the [Cloudinary documentation](https://cloudinary.com/documentation).

## Contributing

### Code Contribution
####The codebase is consisting of both the backend and frontend


We welcome contributions from developers like you! To contribute code, follow these steps:

1. Fork this repository.

2. Create a new branch for your feature/fix:
git checkout -b feature/awesome-feature

3. Make your changes and commit them:
git commit -m "Add awesome feature"

5. Create a pull request here on the `acawave` repository.

### Bug Reports and Feature Requests

If you find a bug or have a feature request, please create an issue on the GitHub repository. Your feedback is crucial to improving acawave.

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for details.
