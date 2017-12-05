package com.sergialmar.wschat.data;

import com.sergialmar.wschat.domain.Token;
import com.sergialmar.wschat.domain.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;

/**
 * Created by den on 8/14/17.
 */
@Service
public class AuthenticationService implements UserDetailsService {
    @Autowired
    private TokenRepository tokenRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        Token token = tokenRepository.findByUsername(username);
        UserInfo userInfo = new UserInfo(token.getUsername(), "!!!!!!!!!!");
//        GrantedAuthority authority = new SimpleGrantedAuthority(userInfo.getRole());
//        UserDetails userDetails = (UserDetails) new User(userInfo.getUsername(),
//                userInfo.getPassword(), Arrays.asList(authority));
        GrantedAuthority authority = new SimpleGrantedAuthority("User");
        UserDetails userDetails = (UserDetails) new User(userInfo.getUsername(),
                userInfo.getPassword(), Arrays.asList(authority));
        return userDetails;
    }
}