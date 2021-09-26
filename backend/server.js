const pinataSDK = require("@pinata/sdk");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const pinata = pinataSDK(
    "7236c36f4746e7e53073" , "e5a3ec5e2c31abd34edf371715d6a110f8e2a79d44233926e9638d1a03c9c42a"
);


  app.post("/mint" , async function(req , res){  

    try{ 

          console.log("body : " , req.body) 

        
          let jsonarray = [];  
          let jsonstring = fs.readFileSync("./metadata.json");  
          let jarray = JSON.parse(jsonstring)  
          console.log("jarray : " , jarray.length )

          for(let i = 0 ; i < req.body.count ; i++){
              let metadata = jarray[Math.floor(Math.random() * jarray.length)];  
              console.log("metadata : " , metadata )
            const options = {
                    pinataMetadata: {
                      name: `${metadata.name}`,
                    },
                    pinataOptions: {
                      cidVersion: 0,
                    },
                  };  
              jarray = jarray.filter((e) => { return e.name != metadata.name})
            const result = await pinata.pinJSONToIPFS(metadata, options)  
            jsonarray.push(`https://ipfs.io/ipfs/${result.IpfsHash}`)
        
          }
        
          console.log(" jarray : " , jarray.length )
          console.log("jsonarray : " , jsonarray );
          res.send({status : true , data : jsonarray , meta : jarray})

      }catch(error){
          res.send({status : false})
      }
  }) 

  app.post("/remove" ,async function(req , res) {  

          try {
            fs.writeFileSync(
              "./metadata.json",
              JSON.stringify(req.body.filter),
              "utf-8"
            )  
            res.send({status : true})

          } catch (error) {
            res.send({status : false})
          }

  })

app.listen(5000 , (res) => {
    console.log("listen");
})