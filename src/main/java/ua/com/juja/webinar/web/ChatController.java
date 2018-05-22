package ua.com.juja.webinar.web;

import java.security.Principal;
import java.util.Collection;

//import ua.com.juja.webinar.data.*;
import ua.com.juja.webinar.data.OptionsRepository;
import ua.com.juja.webinar.domain.Options;
import ua.com.juja.webinar.util.MessageChecker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import ua.com.juja.webinar.domain.ChatMessage;
import ua.com.juja.webinar.domain.SessionProfanity;
import ua.com.juja.webinar.event.LoginEvent;
import ua.com.juja.webinar.event.ParticipantRepository;
import ua.com.juja.webinar.exception.TooMuchProfanityException;
import ua.com.juja.webinar.util.ProfanityChecker;
import ua.com.juja.webinar.data.ChatMessageRepository;

/**
 * Controller that handles WebSocket chat messages
 *
 * @author Sergi Almar
 */
@Controller
public class ChatController {

    @Autowired
    private ProfanityChecker profanityFilter;

    @Autowired
    private MessageChecker messageFilter;

    @Autowired
    private SessionProfanity profanity;

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private OptionsRepository optionsRepository;

    @SubscribeMapping("/chat.participants")
    public Collection<LoginEvent> retrieveParticipants() {
        return participantRepository.getActiveSessions().values();
    }

    @MessageMapping("/chat.message")
    public ChatMessage filterMessage(@Payload ChatMessage message, Principal principal) {
        checkProfanityAndSanitize(message);
        checkMessageLinks(message);
        message.setUsername(principal.getName());
        chatMessageRepository.save(message);
        return message;
    }

    @MessageMapping("/chat.message.remove")
    public ChatMessage removeMessage(@Payload ChatMessage message, Principal principal) {
        chatMessageRepository.deleteChatMessageById(message.getId());
        return message;
    }

    @MessageMapping("/chat.ads")
    public String adsMessage(@Payload String show, Principal principal) {
        optionsRepository.save(new Options(show));
        return show;
    }

    @MessageMapping("/chat.private.{username}")
    public void filterPrivateMessage(@Payload ChatMessage message, @DestinationVariable("username") String username, Principal principal) {
        checkProfanityAndSanitize(message);
        checkMessageLinks(message);
        message.setUsername(principal.getName());

        simpMessagingTemplate.convertAndSend("/user/" + username + "/exchange/amq.direct/chat.message", message);
    }

    private void checkProfanityAndSanitize(ChatMessage message) {
        long profanityLevel = profanityFilter.getMessageProfanity(message.getMessage());
        profanity.increment(profanityLevel);
        message.setMessage(profanityFilter.filter(message.getMessage()));
    }

    private void checkMessageLinks(ChatMessage message) {
        message.setMessage(messageFilter.filter(message.getMessage()));
    }

    @MessageExceptionHandler
    @SendToUser(value = "/exchange/amq.direct/errors", broadcast = false)
    public String handleProfanity(TooMuchProfanityException e) {
        return e.getMessage();
    }
}

