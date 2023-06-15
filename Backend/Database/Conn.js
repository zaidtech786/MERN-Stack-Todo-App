const mongoose = require("mongoose");

const databaseConn = (url) => {
   mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
   }).then( () => {
     console.log("Database Connected");
   }).catch(err => {
    console.log(err);
   })
}

exports.databaseConn = databaseConn;
