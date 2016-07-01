/* global require */
'use strict';

var _ = require('lodash');
var alexa = require('alexa-app');
var app = new alexa.app('one-rep-max');
var helper = require('./logicHelper')();
var defaultPrompt = 'To determine your one rep max, tell me the weight and number of reps performed. ' +
        'To do correctly determine it, the number of reps should be less or equal to ten.';
var repromptMessage = 'Please tell me the weight and number of reps you performed.';

var VALID_UNITS = [
    'kilos',
    'kilo',
    'kilograms',
    'kilogram',
    'pounds',
    'pound',
    'lb',
    'lbs'
];

var defaultIntentHandler = function(req, res) {
    res.say(defaultPrompt).reprompt(repromptMessage).shouldEndSession(false);
};

var defaultExitHandler = function(req, res) {
    res.say('Good bye! Beat your max!').shouldEndSession(true);
};

app.launch(defaultIntentHandler);

app.intent('AMAZON.StartOverIntent', defaultIntentHandler);
app.intent('AMAZON.RepeatIntent', defaultIntentHandler);

app.intent('AMAZON.HelpIntent', function(req, res) {
    var prompt = 'I can help you to find your one rep max.<break strength="strong"/>' +
        'For example, you can tell me:<break strength="medium"/> get rep max of one hundred pounds ten reps.' +
        '<break strength="strong"/>What is the weight and number of reps you want me to get your rep max of?';
    res.say(prompt).reprompt(repromptMessage).shouldEndSession(false);
});

app.intent('AMAZON.StopIntent', defaultExitHandler);
app.intent('AMAZON.CancelIntent', defaultExitHandler);

app.intent('determine',
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
        console.log('Intent: ' + req.data.request.intent.name);
        var promptEmpty;
        var intent = _.get(req, 'data.request.intent.name');
        var weight_lifted = req.slot('weight');
        var reps = req.slot('reps');
        var unit = req.slot('unit');

        if (_.isEmpty(intent)) {
            res.say(defaultPrompt).reprompt(repromptMessage).shouldEndSession(false);
            return true;
        }

        if (intent !== 'determine') {
            var promptIntentNotSupported = 'I\'m sorry, I currently do not know what to do with ' + intent + '. What else can I help with?';
            res.say(promptIntentNotSupported).reprompt(repromptMessage).shouldEndSession(false);
            return true;
        }

        if (_.isEmpty(weight_lifted) || _.isEmpty(reps)) {
            promptEmpty = 'I\'m sorry, in order to determine your one rep max I need to know the weight ' +
                'you lifted in pounds or kilos and the number of reps your performed. ' +
                'Please tell me what is the weight you lifted and the number of reps performed.';
            res.say(promptEmpty).reprompt(repromptMessage).shouldEndSession(false);
            return true;
        } else if (_.isEmpty(unit)) {
            promptEmpty = 'I\'m sorry, in order to determine your one rep max I need to know the valid measure unit ' +
                'of the weight you lifted in pounds or kilos and the number of reps your performed. ' +
                'Please tell me what is the weight you lifted and the number of reps performed.';
            res.say(promptEmpty).reprompt(repromptMessage).shouldEndSession(false);
            return true;
        } else if (_.indexOf(VALID_UNITS, unit) === -1) {
            promptEmpty = 'I\'m sorry, I do not recognize the unit of measure ' + unit + '. ' +
                'Please tell me what is the weight you lifted in pounds or kilos and the number of reps performed.';
            res.say(promptEmpty).reprompt(repromptMessage).shouldEndSession(false);
            return true;
        } else {
            var result = helper.determineRepMax(weight_lifted, reps);

            console.log('Result');
            console.log(result);

            if (result.isCorrect) {
                res.say(result.prompt + ' ' + unit).send();
            } else {
                res.say(result.prompt).reprompt(repromptMessage).shouldEndSession(false).send();
            }
            return false;
        }
    }
);

module.exports = app;