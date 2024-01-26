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
```

### Tools Required

You must have the followings installed on your machine

* A text editor or an IDE (like IntelliJ)
* NodeJS 

### Installation

All installation steps go here.

* Installing a particular tool
  * Steps to complete it
  
* Installing another tool

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

