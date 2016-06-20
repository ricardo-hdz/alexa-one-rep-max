'use strict';

var _ = require('lodash');
var alexa = require('alexa-app');
var app = new alexa.app('one-rep-max');
var helper = require('./logicHelper')();

app.launch(function(req, res) {
    var prompt = 'To calculate your one rep max, tell me the weight and number of reps performed. ' +
        'To correct calculate it, number of reps should be less or equal to ten.';
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('calculate',
    {
        'slots': {
            'weight': 'AMAZON.NUMBER',
            'reps': 'REPS_RANGE',
            'unit': 'VALID_UNITS'
        },
        'utterances': [
            '{rep max|max} {|of} {-|weight} {-|unit} {-|reps} reps',
            '{rep max|max} {|of} {-|weight} {-|unit} {-|reps}',
            '{rep max|max} {|of} {-|weight} {-|reps}',
            '{-|weight} {-|reps}'
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
            var prompt = 'I\'m sorry, in order to calculate your one rep max I need to know the weight ' +
                'you lifted and the number of reps your performed. ' +
                'Please tell me those numbers.';
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