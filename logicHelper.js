'use strict';

var _ = require('lodash');

function logicHelper() {

    var errorMessages = {
        notANumber: 'I\'m sorry, I can just determine your rep max using valid numbers for weights and repetitions. ' +
                    'Please tell me what is the weight you lifted and the number of reps performed.',

        noValuesProvided: 'I\'m sorry, to determine your one rep max I need the weight you lifted and the number of reps. ' +
                    'Please tell me what is the weight you lifted and the number of reps performed.',

        weightGreaterThanZero: 'I\'m sorry, to correctly determine your rep max the weight lifted should be ' +
            'a number great than zero.',

        weightNaN: 'I\'m sorry, I can just determine your rep max using valid weights. ' +
            'Please tell me the correct weight you lifted along with the number of reps performed.',

        weightMissing: 'I\'m sorry, to correctly determine your rep max I need the weight you lifted. ' +
            'Please tell me the correct number of reps you lifted along with the number of reps performed.',

        repsNaN: 'I\'m sorry, I can just determine your rep max using a valid repetition range from from one to ten. ' +
            'Please tell me the correct number of reps you lifted along with the number of reps performed.',

        repsGreaterThanZero: 'I\'m sorry, to correctly determine your rep max the number of reps should be ' +
            'a number great than zero.',

        repsGreaterThanTen: 'I\'m sorry, to correctly determine your rep max the number of reps should be ' +
            'less or equal to ten.',

        repsMissing: 'I\'m sorry, to correctly determine your rep max I need the number of reps you performed. ' +
            'Please tell me the correct number of reps you lifted along with the number of reps performed.',

        weightRepsGreaterThanZero: 'I\'m sorry, to correctly determine your rep max the weight and number of reps should be ' +
            'great than zero.'
    };

    var determineRepMax = function(weight_lifted, reps) {
        if ((_.isNull(weight_lifted) || _.isUndefined(weight_lifted)) && (_.isNull(reps) || _.isUndefined(reps))) {
            return {
                isCorrect: false,
                prompt: errorMessages.noValuesProvided
            };
        }

        if (_.isNull(weight_lifted) || _.isUndefined(weight_lifted)) {
            return {
                isCorrect: false,
                prompt: errorMessages.weightMissing
            };
        }

        if (_.isNull(reps) || _.isUndefined(reps)) {
            return {
                isCorrect: false,
                prompt: errorMessages.repsMissing
            };
        }

        weight_lifted = _.toNumber(weight_lifted);
        reps = _.toNumber(reps);

        console.log('Weight: ' + weight_lifted);
        console.log('Reps: ' + reps);

        if ((!_.isNumber(weight_lifted) || _.isNaN(weight_lifted)) && (!_.isNumber(reps) || _.isNaN(reps))) {
            return {
                isCorrect: false,
                prompt: errorMessages.notANumber
            };
        }

        if (weight_lifted <= 0 && reps <= 0) {
            return {
                isCorrect: false,
                prompt: errorMessages.weightRepsGreaterThanZero
            };
        }

        if (!_.isNumber(weight_lifted) || _.isNaN(weight_lifted)) {
            return {
                isCorrect: false,
                prompt: errorMessages.weightNaN
            };
        }

        if (weight_lifted <= 0) {
            return {
                isCorrect: false,
                prompt: errorMessages.weightZeroOrNegative
            };
        }

        if (!_.isNumber(reps) || _.isNaN(reps)) {
            return {
                isCorrect: false,
                prompt: errorMessages.repsNaN
            };
        }

        if (reps <= 0) {
            return {
                isCorrect: false,
                prompt: errorMessages.repsGreaterThanZero
            };
        }

        if (reps > 10) {
            return {
                isCorrect: false,
                prompt: errorMessages.repsGreaterThanTen
            };
        }

        var rep_max_ten = _.round(weight_lifted*(4/3));
        var rep_max = _.round(weight_lifted*(1/(1.0278-(reps*0.0278))));
        var rep_max_abs = reps == 10 ? rep_max_ten : rep_max;

        var rep_max_range = getMaxRange(rep_max_abs);

        return {
            isCorrect: true,
            prompt: 'Your rep max is ' + rep_max_range[100]
        };
    };

    var getMaxRange = function(rep_max_abs) {
        return {
            100: _.round((rep_max_abs*10)/10),
            95: _.round(((rep_max_abs/(20/19))*10))/10,
            90: _.round(((rep_max_abs/(10/9))*10))/10,
            85: _.round(((rep_max_abs/(20/17))*10))/10,
            80: _.round(((rep_max_abs/(5/4))*10))/10,
            75: _.round(((rep_max_abs/(4/3))*10))/10,
            70: _.round(((rep_max_abs/(10/7))*10))/10,
            65: _.round(((rep_max_abs/(20/13))*10))/10,
            60: _.round(((rep_max_abs/(5/3))*10))/10,
            55: _.round(((rep_max_abs/(20/11))*10))/10,
            50: _.round(((rep_max_abs/(2))*10))/10
        };
    };

    return {
        determineRepMax: determineRepMax,
        getMaxRange: getMaxRange,
        errorMessages: errorMessages
    };
}

module.exports = logicHelper;