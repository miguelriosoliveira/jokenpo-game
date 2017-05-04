/**
 * Created by miguel on 03/05/17.
 */

let request = require("request");

request("http://localhost:8000", (error, response, body) => {
    // Print the error if one occurred
    console.error("error:", error);
    // Print the response status code if a response was received
    console.log("statusCode:", response && response.statusCode);
    // Print the HTML homepage.
    console.log("body:", body);
});