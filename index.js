
const express = require('express')
const app = express()
const port = 3000;
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const bodyParser = require('body-parser');
var path = require('path');

var dogCount = 0;
var catCount = 0;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/contactall', function(req, res){
    const twiml = new VoiceResponse();
    if(dogCount>catCount)
    {
        twiml.play('http://robmartino.com/sounds/Animal%20WAVs/Bark.aiff.mp3');
        twiml.play('http://robmartino.com/sounds/Animal%20WAVs/Bark.aiff.mp3');
        twiml.play('http://robmartino.com/sounds/Animal%20WAVs/Bark.aiff.mp3');
        twiml.play('http://robmartino.com/sounds/Animal%20WAVs/Bark.aiff.mp3');
        twiml.play('http://robmartino.com/sounds/Animal%20WAVs/Bark.aiff.mp3');
    }
    if(dogCount<catCount)
    {
        twiml.play('http://s1download-universal-soundbank.com/mp3/sounds/16426.mp3');
        twiml.play('http://s1download-universal-soundbank.com/mp3/sounds/16426.mp3');
        twiml.play('http://s1download-universal-soundbank.com/mp3/sounds/16426.mp3');
        twiml.play('http://s1download-universal-soundbank.com/mp3/sounds/16426.mp3');
        twiml.play('http://s1download-universal-soundbank.com/mp3/sounds/16426.mp3');
    }
    else{
        twiml.say('Its a draw');
    }

    // Render the response as XML in reply to the webhook request
    res.type('text/xml');
    res.send(twiml.toString());     
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
