package ua.com.juja.webinar.domain;

import org.springframework.data.annotation.Id;

/**
 * Created by den on 8/14/17.
 */

public class UserInfo {
    @Id
    private String id;
    private String username;
    private String password;
//    private String role;

    public UserInfo(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
//    public String getRole() {
//        return role;
//    }
//    public void setRole(String role) {
//        this.role = role;
//    }
}