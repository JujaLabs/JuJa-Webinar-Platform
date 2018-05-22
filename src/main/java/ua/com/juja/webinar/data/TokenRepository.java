package ua.com.juja.webinar.data;

import ua.com.juja.webinar.domain.Token;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by den on 8/14/17.
 */
public interface TokenRepository extends MongoRepository<Token, String> {
    Token findBySeries(String series);
    Token findByUsername(String username);
}