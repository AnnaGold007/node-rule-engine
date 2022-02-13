# Rule Engine

## Description

API reterns information of the current state of the table in a Database.
In addition there is rule engine who analyzes the current status, raises alerts and makes recommendations for current tables. 

App built with Node, Express and connects to MySQL database using MySQL2 client.
In project used localhost DB, ut will work with any MySQL Database just update dbconfig.js file to your database.

Built this project to learn how to build and deploy a Node REST API.

API to get facts of the table. 
Example table'courses' :

 `http://servername/facts?tableName=courses`


```{ 
{
  "tableName": "courses",
  "rowsNumber": 9,
  "indexesNumber": 1,
  "hasPrimaryKey": true,
  "rule": {
    "highNumberOfRows": "High Number Of Rows Rule is pass the check.",
    "noPrimaryKey": "Primary Key Rule is pass the check.",
    "multiPrimaryKey": "Primary Key Rule is pass the check."
  },
  "primaryKeyColumnsCount": 1
}

## Installation

run ```npm i && npm test```
