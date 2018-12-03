var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db){
    //GET BY ID
    app.get('/notes/getbyid=:id', (req, res) => {
        const id = req.params.id
        console.log(id);
        const details = { 
            '_id':  new ObjectID(id) 
        };
        db.collection('notes').findOne(details, (err, item) => {
            if(err){
                res.send({'error': 'An error has occured'});
            }else{
                res.send(item);
            }
        });
    });

    //DELETE BY ID
    app.delete('/notes/deletebyid=:id', (req, res) => {
        const id = req.params.id
        const details = {
            '_id': new ObjectID(id)
        };
        db.collection('notes').remove(details, (err, response) => {
            if(err){
                res.send({
                    'Success': 'failed',
                    'Message': err
                })
            }else{
                res.send({
                    'Success': 'success',
                    'Message': response
                })
            }
        });
    });

    //GET ALL ITEMS FROM THE DB
    app.get('/notes/getall', (req, res) => {
        db.collection('notes').find({}).toArray((err, notes) => {
            if(err){
                console.log('error: ' + err);
                res.send({'error': err});
                next();
            }else{
                console.log(notes._id);
                res.send({
                    'items': notes
                });
            }
        });
    });

    //ADD ITEM IN THE DB
    app.post('/notes', (req, res) => {
        console.log(req.body);
        const note = { 
            title: req.body.title, 
            body: req.body.body
        };
        db.collection('notes').insert(note, (err, result) => {
            if(err){
                res.send({'error': 'An error has occured'});
            }else{
                res.send(result.ops[0])
            }
        });
    });
}