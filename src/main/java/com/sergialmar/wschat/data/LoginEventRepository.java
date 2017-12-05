package com.sergialmar.wschat.data;

import com.sergialmar.wschat.event.LoginEvent;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface LoginEventRepository extends MongoRepository<LoginEvent, String> {

}
