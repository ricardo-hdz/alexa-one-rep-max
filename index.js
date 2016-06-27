/* global require */
'use strict';

var _ = require('lodash');
var alexa = require('alexa-app');
var app = new alexa.app('one-rep-max');
var helper = require('./logicHelper')();

var defaultIntentHandler = function(req, res) {
    var prompt = 'To calculate your one rep max, tell me the weight and number of reps performed. ' +
        'To do a correct calculation, the number of reps should be less or equal to ten.';
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
};

var defaultExitHandler = function(req, res) {
    res.say('Good bye! Beat your max!').shouldEndSession(true);
};

app.launch(defaultIntentHandler);

app.intent('AMAZON.StartOverIntent', defaultIntentHandler);
app.intent('AMAZON.RepeatIntent', defaultIntentHandler);

app.intent('AMAZON.HelpIntent', function(req, res) {
    var prompt = 'I can help you to find your one rep max.<break strength="strong"/>' +
        'For example, you can ask me:<break strength="medium"/> get rep max of hundred pounds ten reps.' +
        '<break strength="strong"/>What is the weight and number of reps you want me to get your rep max of?';
    var reprompt = 'Please tell me the weight and number of reps you want me to get your one rep max of.';
    res.say(prompt).reprompt(reprompt).shouldEndSession(false);
});

app.intent('AMAZON.StopIntent', defaultExitHandler);
app.intent('AMAZON.CancelIntent', defaultExitHandler);


app.intent('calculate',
    {
        'slots': {
            'weight': 'AMAZON.NUMBER',
            'reps': 'REPS_RANGE',
            'unit': 'VALID_UNITS'
        },
        'utterances': [
            '{|determine|figure} rep max of {-|weight} {-|unit} {-|reps} reps',
            '{|determine|figure} rep max of {-|weight} {-|unit} {-|reps}',
            'get {|my} rep max of {-|weight} {-|unit} {-|reps} reps',
            'get {|my} rep max of {-|weight} {-|unit} {-|reps}'
        ]
    },
    function(req, res) {
        var reprompt = 'Please tell me the weight and number of reps you performed.';
        var weight_lifted = req.slot('weight');
        var reps = req.slot('reps');
        var unit = req.slot('unit') ? req.slot('unit') : '';
        console.log('Weight in req: ' + weight_lifted);
        console.log('Reps in req: ' + reps);
        console.log('Unit in req: ' + unit);

        if (_.isEmpty(weight_lifted) || _.isEmpty(reps)) {
            var prompt = 'I\'m sorry, in order to determine your one rep max I need to know the weight ' +
                'you lifted and the number of reps your performed. ' +
                'Please tell me what is the weight you lifted and the number of reps performed.';
            res.say(prompt).reprompt(reprompt).shouldEndSession(false);
            return true;
        } else {
            var result = helper.calculateRepMax(weight_lifted, reps);
            console.log(result);
            if (result.isCorrect) {
                res.say(result.prompt + ' ' + unit).send();
            } else {
                res.say(result.prompt).reprompt(reprompt).shouldEndSession(false).send();
            }
            return false;
        }
    }
);

module.exports = app;