# Real Time Chat Application 🚀

![Current Version](https://img.shields.io/badge/version-v0.1-blue)
![GitHub contributors](https://img.shields.io/github/contributors/madhur-taneja/README-Template)

Hey folks! Welcome to our Real-Time Chat App, where chatting just got a whole lot cooler. Connect instantly, enjoy smooth conversations, and dive into the chat revolution. Let's keep it simple and chat-tastic! 💬✨

## Table of Contents
- [Getting Started](#getting-started)
	- [Tools Required](#tools-required)
	- [Installation](#installation)
- [Running the App](#running-the-app)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

Project Structure:
```
	Server
	├── controller
	│    ├── conversationController
        │    ├── inboxController
        │    ├── loginController
        │    ├── userController 		
	├── middleware
        │    ├── common
        │    │    ├── errorHandler
        │    ├── users
        │        ├── fileUpload
	├── models
        │    ├── disappearingMsg
        │    ├── activeClients
        │    ├── chatRequest
        │    ├── conversations
        │    ├── message
        │    ├── passwordResetToken
        │    ├── people
        │    ├── room
        │    ├── temporaryUserData
	├── public
	│   ├── uploads
	│   	├── avatars
	│       ├── files
	└── router
        │    ├── conversationRouter
        │    ├── inboxRouter
        │    ├── loginRouter
        │    ├── usersRouter
	├── socketIO
        │    ├── eventHandler
        │    ├── eventListener
	├── utilities
        │    ├── nodemailerSetup
        │    ├── singleUploader
        ├── .gitignore
        ├── README.md
        ├── app.mjs
        ├── package.json
```

### Tools Required

You must have the followings installed on your machine

* A text editor or an IDE (like IntelliJ)
* NodeJS 

### Installation

1. Navigate to your prefered directory and type the following in the terminal:
   
   ```
   https://github.com/Imdad-Rakib/Real-Time-Chat-Server.git
   ```

2. Type the following to install all the dependencies used here:

   ```
   npm install
   ```
3. Create a .env file and add the following variables. Set the values according to your configuration
   ```
   APP_NAME = "<name>"
   MONGO_CONNECTION_STRING = "<your_connection_string>"
   COOKIE_SECRET = <your_cookie_secret> 
   JWT_SECRET = <your_jwt_secret> 
   JWT_EXPIRY= <expiry_time>
   COOKIE_NAME= <your_cookie_name>
   PORT = <port_number> 
   EMAIL = "<your_email>"
   KEY = "<your_app_password_for_google_account>" 
   ```

## Deployment

This section is completely optional. Add additional notes about how to deploy this on a live system

## Contributing

Mention what you expect from the people who want to contribute

We'd love to have your helping hand on `Project Title`! See [CONTRIBUTING.md] for more information on what we're looking for and how to get started.

## Versioning

If your project has multiple versions, include information about it here. 

For the available versions, see the [tags on this repository][tags]

## Author

#### Imdad Rakib
* [GitHub](https://github.com/Imdad-Rakib)
* [LinkedIn](https://www.linkedin.com/in/imdad-rakib-a213bb212/)

## License

`Project Title` is open source software [licensed as MIT][license].

## Acknowledgments

This section can also be called as `Resources` or `References`

* Code Honor if someone's work was referred to
* Tutorials followed
* Articles that helped
* Inspiration
* etc

