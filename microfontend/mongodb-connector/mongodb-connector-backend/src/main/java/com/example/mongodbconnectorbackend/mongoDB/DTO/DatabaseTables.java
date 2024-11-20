package com.example.mongodbconnectorbackend.mongoDB.DTO;

import java.util.List;

public class DatabaseTables {

    private List<String> tables;

    public DatabaseTables(String invalidParameters, List<String> tables) {
        this.tables = tables;
    }

    public List<String> getTables() {
        return tables;
    }

    public void setTables(List<String> tables) {
        this.tables = tables;
    }
}
