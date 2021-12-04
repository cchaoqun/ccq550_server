const express = require('express');


const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');


const app = express();
app.use(cors({
    origin: '*'
}));

// Route 1 - register as GET 
app.get('/movie_info', routes.movie_info)

// Route 1 - register as GET 
app.get('/actor_list', routes.actor_list)

// Route 1 - register as GET 
app.get('/rating', routes.rating)


// Route 1 - register as GET 
app.get('/winner', routes.winner)


// Route 1 - register as GET 
app.get('/movie_list', routes.movie_list)

// Route 1 - register as GET 
app.get('/boxOffice', routes.box_office)

// Route 1 - register as GET 
app.get('/director', routes.director)







app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;