package com.sergialmar.wschat.data;

import java.util.List;

import com.sergialmar.wschat.domain.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.stereotype.Component;

/**
 * Created by den on 8/10/17.
 */

@RepositoryRestResource(collectionResourceRel = "chatmessages", path = "chatmessages")
public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    Long deleteChatMessageById(String id);

}

