package ua.com.juja.webinar.event;

import java.util.Optional;

import ua.com.juja.webinar.data.LoginEventRepository;
import ua.com.juja.webinar.data.LogoutEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

/**
 * Listener to track user presence. 
 * Sends notifications to the login destination when a connected event is received
 * and notifications to the logout destination when a disconnect event is received
 * 
 * @author Sergi Almar
 */
public class PresenceEventListener {
	
	private ParticipantRepository participantRepository;
	
	private SimpMessagingTemplate messagingTemplate;
	
	private String loginDestination;
	
	private String logoutDestination;

	@Autowired
	private LoginEventRepository loginEventRepository;

	@Autowired
	private LogoutEventRepository logoutEventRepository;
	
	public PresenceEventListener(SimpMessagingTemplate messagingTemplate, ParticipantRepository participantRepository) {
		this.messagingTemplate = messagingTemplate;
		this.participantRepository = participantRepository;
	}
		
	@EventListener
	private void handleSessionConnected(SessionConnectEvent event) {
		SimpMessageHeaderAccessor headers = SimpMessageHeaderAccessor.wrap(event.getMessage());
		String username = headers.getUser().getName();

		LoginEvent loginEvent = new LoginEvent(username);
		messagingTemplate.convertAndSend(loginDestination, loginEvent);
		
		// We store the session as we need to be idempotent in the disconnect event processing
		participantRepository.add(headers.getSessionId(), loginEvent);
		loginEventRepository.save(loginEvent);
	}
	
	@EventListener
	private void handleSessionDisconnect(SessionDisconnectEvent event) {
		
		Optional.ofNullable(participantRepository.getParticipant(event.getSessionId()))
//				.ifPresent(login -> {
//					messagingTemplate.convertAndSend(logoutDestination, new LogoutEvent(login.getUsername()));
//					participantRepository.removeParticipant(event.getSessionId());
//				});
				.ifPresent(login -> {
					LogoutEvent logoutEvent = new LogoutEvent(login.getUsername());
					messagingTemplate.convertAndSend(logoutDestination, logoutEvent);
					participantRepository.removeParticipant(event.getSessionId());
					logoutEventRepository.save(logoutEvent);
				});
	}

	public void setLoginDestination(String loginDestination) {
		this.loginDestination = loginDestination;
	}

	public void setLogoutDestination(String logoutDestination) {
		this.logoutDestination = logoutDestination;
	}
}
