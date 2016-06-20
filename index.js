'use strict';

var _ = require('lodash');
var alexa = require('alexa-app');
var app = new alexa.app('one-rep-max');
var helper = require('./logicHelper')();

app.launch(function(req, res) {
    var prompt = 'To calculate your one rep max, tell me the weight and number of reps performed. ' +
        'To correct calculate it, number of resp should be less or equal to ten.';
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('calculate',
    {
        'slots': {
            'weight': 'AMAZON.NUMBER',
            'reps': 'REPS_RANGE'
        },
        'utterances': [
            '{|rep} max {|of} {-|weight} pounds {|-reps} reps',
            '{|rep} max {|of} {-|weight} {|-reps}',
            '{-|weight} {|-reps}'
        ]
    },
    function(req, res) {

        var weight_lifted = req.slot('weight');
        var reps = req.slot('reps');

        var result = helper.calculateRepMax(weight_lifted, reps);

        if (result.isCorrect) {
            res.say(result.prompt).send();
        } else {
            res.say(result.prompt).reprompt(prompt).shouldEndSession(false).send();
        }
    }
);