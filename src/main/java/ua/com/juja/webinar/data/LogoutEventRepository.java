package ua.com.juja.webinar.data;

import ua.com.juja.webinar.event.LogoutEvent;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface LogoutEventRepository extends MongoRepository<LogoutEvent, String> {

}
