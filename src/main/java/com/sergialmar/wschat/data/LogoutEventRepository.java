package com.sergialmar.wschat.data;

import com.sergialmar.wschat.event.LogoutEvent;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface LogoutEventRepository extends MongoRepository<LogoutEvent, String> {

}
