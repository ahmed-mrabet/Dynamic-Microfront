package com.example.mongodbconnectorbackend.mongoDB.controller;
import com.example.mongodbconnectorbackend.mongoDB.DTO.DatabaseInfoResponse;
import com.example.mongodbconnectorbackend.mongoDB.DTO.requestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public interface MongoController {

        @PostMapping("/connect")
        ResponseEntity<DatabaseInfoResponse> DatabaseConnection(@RequestBody requestBody request);
}
//        @GetMapping("/tables")
//        ResponseEntity<DatabaseTables> getTables( @RequestParam(value = "pageNumber", required = false) String pageNumber,
//                                                  @RequestParam(value = "pageSize", required = false) String pageSize,
//                                                  @RequestParam(value = "tableName", required = false) String tableName);