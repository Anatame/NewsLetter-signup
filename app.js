const express = require("express");
const bodyParser = require("body-parser")
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.post("/", function(req, res){
    var name = req.body.name;
    var email =  req.body.email;

    const data = {
        members: [
            {
                email_address: email, 
                status: 'subscribed',
                merge_fields:{
                    FNAME: 'name',
                }

            }
        ]
    }


    const jsonData = JSON.stringify(data);
    const  url = "https://us2.api.mailchimp.com/3.0/lists/4b31e4f0a3ffff"

    const options = {
        method: 'POST',
        auth: "Sam1:59d51fdc6095a26c00da5ba69b20859f-us2"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }

        response.on('data', function(data){
            console.log(data);
        })

    })

    request.write(jsonData);
    request.end();
    
})

app.get('/', function(req, res){
    res.sendFile(__dirname + "/signup.html");
})


app.post('/failure', function(req, res){
    res.redirect("/");
})

app.listen(3000 || process.env.PORT, function(req, res){
    console.log("Sever started on port 3000");
});


// Key
// 59d51fdc6095a26c00da5ba69b20859f-us2

//ListID
// 4b31e4f0a3