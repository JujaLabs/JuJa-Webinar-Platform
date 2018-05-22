package ua.com.juja.webinar.data;

import ua.com.juja.webinar.event.LoginEvent;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface LoginEventRepository extends MongoRepository<LoginEvent, String> {

}
