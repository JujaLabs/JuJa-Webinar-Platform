spring-websocket-chat
=====================

This JuJa chat is based on https://github.com/salmar/spring-websocket-chat
Changes: added basic Spring Security authentication, MongoDB for store messages, interface changes, webinar functionality (YT-frame, advertising), extended admin page (message remove)


Chat application using AngularJS and Spring WebSockets (STOMP over WebSockets)


![Spring WebSocket Chat](http://www.sergialmar.com/wp-content/uploads/2014/09/spring-websocket-chat-room.png "Spring WebSocket Chat")
## Features
- Built with Spring Boot
- User login
- Chat message broadcasting and private messages (filtering profanities)
- Presence tracking sending notifications when users join / leave
- Broadcast notifications when users are typing
- WebSockets stats exposed at /stats
- WebSocket security with Spring Security
- Spring Session integration

## Running the app
gradle bootRun
