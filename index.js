const noteRoutes = require('./note_routes');

//Export the route
module.exports = function(app, db){
    noteRoutes(app, db);
}