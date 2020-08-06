const http = require("http");
const app = require("./app");
const db = require("../src/models")
app.set('port', process.env.PORT || 3000)

db.sequelize.sync({force: false})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port' + app.get('port'))
})