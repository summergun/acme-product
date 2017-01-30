const express = require('express');
const path = require('path');
const swig = require('swig');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const methodOverride = require('method-override');
//const routes = require('./products/products.routes.js');
const app = express();
const server = app.listen(3000);
const io=socketio.listen(server);
swig.setDefaults({ cache: false });
app.use(methodOverride('_method'));

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded( { extended: false }));//tell express to use bodyparser
app.set('view engine', 'html');
app.engine('html',swig.renderFile);


app.use('/products', require('./products/products.routes.js'));

app.get('/',(req,res,next)=>{
    res.render('index',{nav:'home',title:'Home'});
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
