package com.sergialmar.wschat.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import java.util.List;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(1)
public class WebSecurityAdminConfig extends WebSecurityConfigurerAdapter {

	private static final String SECURE_ADMIN_PASSWORD = "********";
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.antMatcher("/admin*")
			.csrf().disable()
			.formLogin()
				.loginPage("/admin_index.html")
				.loginProcessingUrl("/admin_login")
				.defaultSuccessUrl("/admin.html")
//				.permitAll()
				.and()
			.logout()
				.logoutSuccessUrl("/admin_index.html")
				.permitAll()
				.and()
			.authorizeRequests()
//				.antMatchers("/js/**", "/lib/**", "/images/**", "/css/**", "/index.html", "/").permitAll()
				.antMatchers("/js/**", "/lib/**", "/images/**", "/css/**", "/index.html", "/").hasRole("ADMIN")
				.antMatchers("/websocket").hasRole("ADMIN")
				.antMatchers("/admin*").hasRole("ADMIN")
				.anyRequest().authenticated();
				
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication()
				.withUser("ADMIN")
				.password("*********")
				.roles("ADMIN");
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		
		auth.authenticationProvider(new AuthenticationProvider() {
			
			@Override
			public boolean supports(Class<?> authentication) {
				return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
			}
			
			@Override
			public Authentication authenticate(Authentication authentication) throws AuthenticationException {
				UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) authentication;
				
				List<GrantedAuthority> authorities = SECURE_ADMIN_PASSWORD.equals(token.getCredentials()) ? 
														AuthorityUtils.createAuthorityList("ROLE_ADMIN") : null;
														
				return new UsernamePasswordAuthenticationToken(token.getName(), token.getCredentials(), authorities);
			}
		});
	}
}
