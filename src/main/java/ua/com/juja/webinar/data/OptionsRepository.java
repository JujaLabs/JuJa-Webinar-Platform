package ua.com.juja.webinar.data;

import ua.com.juja.webinar.domain.Options;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by den on 8/29/17.
 */
@RepositoryRestResource(collectionResourceRel = "options", path = "options")
public interface OptionsRepository extends MongoRepository<Options, String> {
}
