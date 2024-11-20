package com.example.mongodbconnectorbackend.mongoDB.DTO;

import java.util.List;

public class DatabaseInfoResponse {
    private String message;
    private List<String> collectionNames;

    public DatabaseInfoResponse(String message, List<String> collectionNames) {
        this.message = message;
        this.collectionNames = collectionNames;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<String> getCollectionNames() {
        return collectionNames;
    }

    public void setCollectionNames(List<String> collectionNames) {
        this.collectionNames = collectionNames;
    }
}
