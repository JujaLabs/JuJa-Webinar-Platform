package com.sergialmar.wschat.domain;

import org.springframework.data.annotation.Id;

/**
 * Created by den on 8/29/17.
 */
public class Options {
    @Id
    private String id;
    private String showAds;

    public Options(String showAds) {
        this.showAds = showAds;
    }

    public String getId() {
        return id;
    }

    public String getShowAds() {
        return showAds;
    }

    public void setShowAds(String showAds) {
        this.showAds = showAds;
    }

    @Override
    public String toString() {
        return "Options [id=" + id + ", showAds=" + showAds + "]";
    }

}
