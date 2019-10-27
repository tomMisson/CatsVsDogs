
const express = require('express')
const app = express()
const port = 3000;
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const bodyParser = require('body-parser');
var path = require('path');

var dogCount = 0;
var catCount = 0;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/contactall', function(req, res){
    client.messages.list({to: '+447481337208'})
               .then(messages => messages.forEach(m => console.log(m.from)));
})

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    
    console.log(req.body.Body);

    if(req.body.Body.toUpperCase() == "DOG" || req.body.Body.toUpperCase() == "CAT")
    {
        if(req.body.Body.toUpperCase()==("DOG"))
        {
            dogCount ++;
        }
        if(req.body.Body.toUpperCase()==("CAT")){
            catCount++;
        }
        twiml.message('You voted for: ' + req.body.Body + "! Visit http://5fca4c10.ngrok.io to see how the scores are going! 🐱"+catCount+" vs "+dogCount+"🐶");
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }
    else{
        twiml.message('Dogs or Cats! Youuu deciddddeee. Reply to this message with DOG or CAT to vote.');
  
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }    
  });

app.get('/view', (req,res) => {
    var obj ={
        'catcount':catCount,
        'dogcount':dogCount,
    }

    res.json(obj);
});
  
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(3000)
