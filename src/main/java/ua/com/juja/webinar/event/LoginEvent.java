package ua.com.juja.webinar.event;

import org.springframework.data.annotation.Id;

import java.util.Date;

/**
 * @author Sergi Almar
 */
public class LoginEvent {

    @Id
    private String id;
    private String username;
    private Date time;

    public LoginEvent(String username) {
        this.username = username;
        time = new Date();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "LoginEvent [username=" + username + ", time=" + time + "]";
    }
}
