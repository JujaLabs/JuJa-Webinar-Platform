package ua.com.juja.webinar.data;

import ua.com.juja.webinar.domain.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by den on 8/10/17.
 */

@RepositoryRestResource(collectionResourceRel = "chatmessages", path = "chatmessages")
public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    Long deleteChatMessageById(String id);

}

