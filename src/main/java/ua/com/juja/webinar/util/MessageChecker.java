package ua.com.juja.webinar.util;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Checks for profanities and filters them
 *
 * @author Sergi Almar
 */
public class MessageChecker {

    private Set<String> profanities = new HashSet<>();

    public String filter(String message) {
        try {
            String[] words = message.split(" ");
            String output = "";
            for (String word : words) {
                if (word.contains("http://") || word.contains("https://")) {
                    output = String.join(" ", output, "<a href=\"" + word + "\" target=\"_blank\">" + word + "</a>");

                } else {
                    output = String.join(" ", output, word);
                }
            }
            return output;
        }
        catch (Exception e) {
            return message;
        }
    }

}
