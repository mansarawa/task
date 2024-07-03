import http from "http"
import nodemailer from "nodemailer";


const server = http.createServer((request, response) => {
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port : 465,
        auth: {
            user: "rawamansa@gmail.com",
            pass: "bfcnesqpihgyykxo"

        }
    });

    const receiver = {
        from : "rawa@gmail.com",
        to : "youremail@gmail.com",
        subject : "Node Js Mail Testing!",
        text : "Hello this is a text mail!"
    };

    auth.sendMail(receiver, (error, emailResponse) => {
        if(error)
        throw error;
        console.log("success!");
        response.end();
    });
    
});

server.listen(8080);