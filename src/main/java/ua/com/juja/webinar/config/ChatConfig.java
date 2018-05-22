package ua.com.juja.webinar.config;

import redis.embedded.RedisServer;
import ua.com.juja.webinar.util.MessageChecker;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import ua.com.juja.webinar.domain.SessionProfanity;
import ua.com.juja.webinar.event.ParticipantRepository;
import ua.com.juja.webinar.event.PresenceEventListener;
import ua.com.juja.webinar.util.ProfanityChecker;


@Configuration
@EnableConfigurationProperties(ChatProperties.class)
public class ChatConfig {

    @Autowired
    private ChatProperties chatProperties;

    @Bean
    @Description("Tracks user presence (join / leave) and broacasts it to all connected users")
    public PresenceEventListener presenceEventListener(SimpMessagingTemplate messagingTemplate) {
        PresenceEventListener presence = new PresenceEventListener(messagingTemplate, participantRepository());
        presence.setLoginDestination(chatProperties.getDestinations().getLogin());
        presence.setLogoutDestination(chatProperties.getDestinations().getLogout());
        return presence;
    }

    @Bean
    @Description("Keeps connected users")
    public ParticipantRepository participantRepository() {
        return new ParticipantRepository();
    }

    @Bean
    @Scope(value = "websocket", proxyMode = ScopedProxyMode.TARGET_CLASS)
    @Description("Keeps track of the level of profanity of a websocket session")
    public SessionProfanity sessionProfanity() {
        return new SessionProfanity(chatProperties.getMaxProfanityLevel());
    }

    @Bean
    @Description("Utility class to check the number of profanities and filter them")
    public ProfanityChecker profanityFilter() {
        ProfanityChecker checker = new ProfanityChecker();
        checker.setProfanities(chatProperties.getDisallowedWords());
        return checker;
    }

    @Bean(initMethod = "start", destroyMethod = "stop")
    @Description("Embedded Redis used by Spring Session")
    public RedisServer redisServer(@Value("${redis.embedded.port}") int port)  throws IOException {
        return new RedisServer(port);
    }

    @Bean
    @Description("Utility class to find links in message and wrap it with html")
    public MessageChecker messageFilter() {
        MessageChecker checker = new MessageChecker();
//		checker.setProfanities(chatProperties.getDisallowedWords());
        return checker;
    }
}