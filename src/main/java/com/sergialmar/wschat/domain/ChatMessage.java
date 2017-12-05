package com.sergialmar.wschat.domain;

import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @author Sergi Almar
 */
public class ChatMessage {

    @Id
    private String id;
    private String username;
    private String message;
//    private Date time;
    private String time;

    public ChatMessage() {
//        time = new Date();
        time = new Date().toString();
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "ChatMessage [id=" + id + ", user=" + username + ", message=" + message + ", time=" + time + "]";
    }
}
