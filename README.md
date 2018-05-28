JuJa Webinar Room
=====================

This JuJa Webinar Chat is based on [https://github.com/salmar/spring-websocket-chat](https://github.com/salmar/spring-websocket-chat)

###How to run app
#####Frontend
First, install dependencies:
```
cd src/main/frontend
npm install
```
To run development-mode app:
```
npm run start
```
Now you can access your app at [localhost:4200](localhost:4200), backend must be running for properly work.

Build production app:

```
npm run build
```
Application will be copied to `resources/static/chat automatically` and can be served by Tomcat now at [localhost:8080](localhost:8080)

#####Backend
Just run as usual Spring Boot Application. Application will be accessible at [localhost:8080](localhost:8080), all static content will be served from `resources/static`
