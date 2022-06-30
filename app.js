const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };


  app.post("/failure", function(req, res){
    res.redirect("/");
  });



  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/85676f3781" // mailchimp api endpoint

  const options = {
    method: "POST",
    auth: "Canyon:36590838f0a94f79f4644889b031be46-us10" // this ensures only this api key can add to the mailing list through api calls
  }


  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
  });


  //request.write(jsonData);
  request.end();

})


//API key
// 36590838f0a94f79f4644889b031be46-us10

//list id
//85676f3781
