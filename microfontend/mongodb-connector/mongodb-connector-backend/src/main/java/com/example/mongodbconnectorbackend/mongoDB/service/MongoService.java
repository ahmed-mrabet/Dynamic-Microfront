package com.example.mongodbconnectorbackend.mongoDB.service;

import com.mongodb.MongoClientException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
//import lombok.var;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MongoService {

private static final Logger logger = LoggerFactory.getLogger(MongoService.class);
private MongoClient remoteMongoClient;
private MongoDatabase remoteDatabase ;
@Value("${spring.data.mongodb.uri}")
private String localConnectionString;
private MongoDatabase localDatabase ;

public List<String> connectAndRetrieveCollections(String host, int port, String username, String password, String databaseName) {
    List<String> collectionNames = new ArrayList<>();
    try {
        String connectionString = String.format("mongodb://%s:%s@%s:%d/%s", username, password, host, port, databaseName);
        remoteMongoClient = MongoClients.create(connectionString);
        remoteDatabase = remoteMongoClient.getDatabase(databaseName);
        logger.info("Connected to the remote database: {}", databaseName);
        localDatabase = MongoClients.create(localConnectionString).getDatabase(databaseName);
        logger.info("Connected to the local database: {}", databaseName);
        if (remoteDatabase != null) {
            remoteDatabase.listCollectionNames().forEach(collectionName -> {
                collectionNames.add(collectionName);
                System.out.println("Collection found: " + collectionName);  // Print out each collection name
            });
            logger.info("Collections found: {}", collectionNames);
            for (String collectionName : collectionNames) {
                MongoCollection<Document> remoteCollection = remoteDatabase.getCollection(collectionName);
                MongoCollection<Document> localCollection = localDatabase.getCollection(collectionName);
                for (Document document : remoteCollection.find()) {
                    localCollection.insertOne(document);
                }
                logger.info("Cloned collection: {}", collectionName);
                logger.info("Collection contains    : {}", localCollection.find());
            }
        } else {
            logger.warn("No connected database. Please connect to a database first.");
        }

    } catch (MongoClientException e) {
        logger.error("MongoClientException: {}", e.getMessage());
        throw e;
    } catch (Exception e) {
        logger.error("Exception: {}", e.getMessage());
        throw e;
    }finally {
        if (remoteMongoClient != null) {
            remoteMongoClient.close();
            logger.info("Remote MongoClient connection closed.");
        }
    }
    return collectionNames;

}

        public List<String> getTables(String pageNumber, String pageSize, String tableName) {
            List<String> tableNames = new ArrayList<>();
            try {
                if (localDatabase != null) {
                    localDatabase.listCollectionNames().forEach(collectionName -> {
                        tableNames.add(collectionName);
                        System.out.println("Collection found: " + collectionName);  // Print out each collection name
                    });
                    logger.info("Collections found: {}", tableNames);
                } else {
                    logger.warn("No connected database. Please connect to a database first.");
                }
            } catch (MongoClientException e) {
                logger.error("MongoClientException: {}", e.getMessage());
                throw e;
            } catch (Exception e) {
                logger.error("Exception: {}", e.getMessage());
                throw e;
            }
            return tableNames;
        }}