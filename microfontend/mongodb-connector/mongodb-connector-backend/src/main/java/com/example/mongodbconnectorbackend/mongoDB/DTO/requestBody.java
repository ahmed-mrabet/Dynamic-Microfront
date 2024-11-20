package com.example.mongodbconnectorbackend.mongoDB.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class requestBody {
    private String host;
    private int port;
    private String username;
    private String password;
    private String databaseName;


}
