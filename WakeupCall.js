  const https = require("https");
  const request = require("request");
  var username = "baa5c717a17b30593a4615eba5a1212c";
  var password = "58733bf6ad419db3a510ac8df77fd275";
  var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
  // for Database
  const sequelize= require('sequelize');
  const connection= new sequelize("podcast_database","ken","414268977ken",{
    dialect:"mysql"
  });
 
  function ApiGet(id)
  {
    var TempData = null;
    var Project= connection.define('article',{
      indentifier: sequelize.STRING,
      item: sequelize.STRING,
      value: sequelize.INTEGER
    })

    
    request(`https://api.intrinio.com/data_point?identifier=${id}&item=close_price`,
      {
        headers: {
           "Authorization": auth
       }
     }, (err,res,data) =>{
      console.log(data);
      data = JSON.parse(data);
    connection
      .sync({
       // force: true
      })
      .then(
         Project.findOne({ where: { indentifier: id } }) 
                .then(project => {
              if (project) {
                    project.updateAttributes({
                      item:data["item"],
                       value : data["value"]
                                             })
                 .then(function () {
                console.log("it works for "+ id +" "+ data["value"]);
                 console.log("\n\n"+TempData);

                      })}
                      })
          )
       .catch(function(error){
        console.log(error);
       });

      })
     
  }
   // end of function

    /*Article.create({
        indentifier:data["identifier"],
        item:data["item"],
        value:data["value"]
      })*/

  /*Post.findAll({     
    where:{
      identifier:GOOGL,
    }
  });*/
  /*function getdata(){
    console.log(data1+"it touched here");
  }*/
  module.exports = {
    ApiGet,

  };