var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect Database
mongoose.connect('mongodb+srv://batuhanozdamar:batuhan89@todolistapp-zvmqq.mongodb.net/test?retryWrites=true&w=majority')

// Create a schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

/* var itemOne = Todo({
    item: 'Test item for todo list'}).save(function(err){
        if(err) throw err;
        console.log('item saved.')
}); */

//var data = [{item: 'item 1'}, {item: 'item 2'}, {item: 'item 3'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo', function(req, res){
        //get data from mongodb and pass it to view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
        });
        
    });

    app.post('/todo', urlencodedParser, function(req, res){
        // get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        })
        
    });

    app.delete('/todo/:item', function(req, res){
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err
            res.json(data);
        });
        
    });
};