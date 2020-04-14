# kafka-node-poc

1)  Run Producer with below command 

    `npm start`


2) Run Consumer in Paraller with below command :-
  `node kafka-consumer.js`

3) Hit below URL wiht json payload.For example :-
 
    URL -> http://localhost:4588/sendToKafkaProducer
    
```JSON
//PAYLOAD
{
	"name":"Abhishek",
	"empId":"E441",
	"Nationality":"Indian",
	"dob":"22-03-1993",
	"city":"Bengaluru",
	"state":"Karnataka"
}
```
