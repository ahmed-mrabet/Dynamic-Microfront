package com.example.mongodbconnectorbackend.mongoDB.controller.impl;

import com.example.mongodbconnectorbackend.mongoDB.DTO.DatabaseInfoResponse;
import com.example.mongodbconnectorbackend.mongoDB.DTO.DatabaseTables;
import com.example.mongodbconnectorbackend.mongoDB.DTO.requestBody;
import com.example.mongodbconnectorbackend.mongoDB.controller.MongoController;
import com.example.mongodbconnectorbackend.mongoDB.service.MongoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RestController
public class MongoControllerImpl implements MongoController {

    private final MongoService mongoService;

    @Autowired
    public MongoControllerImpl(MongoService mongoService) {
        this.mongoService = mongoService;
    }

    @Override
    @PostMapping("/connect")
    public ResponseEntity<DatabaseInfoResponse> DatabaseConnection(@RequestBody requestBody request){
        try {
            System.out.println("Attempting to connect to database with parameters: " + request);
            List<String> collectionNames = mongoService.connectAndRetrieveCollections(
                    request.getHost(),
                    request.getPort(),
                    request.getUsername(),
                    request.getPassword(),
                    request.getDatabaseName()
            );
            DatabaseInfoResponse response = new DatabaseInfoResponse("Successfully connected and retrieved collections.", collectionNames);
            return ResponseEntity.ok(response);
            }
            catch (IllegalArgumentException e) {
            System.err.println("IllegalArgumentException: " + e.getMessage());
            DatabaseInfoResponse response = new DatabaseInfoResponse("Invalid connection parameters", null);

            return ResponseEntity.badRequest().body(response);

            } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
            DatabaseInfoResponse response = new DatabaseInfoResponse("An unexpected error occurred", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }



        }

        @GetMapping("/tables")
    public ResponseEntity<DatabaseTables> getTables(@RequestParam(value = "pageNumber", required = false) String pageNumber,
                                                    @RequestParam(value = "pageSize", required = false) String pageSize,
                                                    @RequestParam(value = "tableName", required = false) String tableName){
        try {
            System.out.println("Attempting to retrieve tables with parameters: " + pageNumber + ", " + pageSize + ", " + tableName);
            List<String> tableNames = mongoService.getTables(pageNumber, pageSize, tableName);
            DatabaseTables response = new DatabaseTables("Successfully retrieved tables.", tableNames);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            System.err.println("IllegalArgumentException: " + e.getMessage());
            DatabaseTables response = new DatabaseTables("Invalid parameters", null);
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
            DatabaseTables response = new DatabaseTables("An unexpected error occurred", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
        }

    }

