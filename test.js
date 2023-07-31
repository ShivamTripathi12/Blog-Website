const http=require('http');
const fs=require('fs');

const server=http.createServer((req,res)=>{
    console.log("request made");

    res.setHeader("Content-Type","text/html");

    let path="./views/";
    switch(req.url){
        case "/":
            path+="index.html";
            break;
        case "/about":
            path+="about.html";
            break;
        case "/about-me":
            // res.statusCode=301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path+="error.html";
            break;
    }



    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.write(data);
            console.log("Khul gaya file");
        }
        res.end();
    });
});

server.listen(8000,'localhost',()=>{
    console.log("Server is listening on port number 8000");
})

