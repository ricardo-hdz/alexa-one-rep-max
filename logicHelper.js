'use strict';

var _ = require('lodash');

function logicHelper() {
    var calculateRepMax = function(weight_lifted, reps) {
        weight_lifted = _.toNumber(weight_lifted);
        reps = _.toNumber(reps);

        if (!_.isNumber(weight_lifted) || !_.isNumber(reps)) {
            return {
                isCorrect: false,
                prompt: 'I\'m sorry, I can just calculate your rep max using numbers. ' +
                    'Please tell me what is the weight you lifted and the number of reps performed.'
            };
        }

        if ((weight_lifted === 0 && reps === 0) || (weight_lifted < 0 && reps < 0)) {
            return {
                isCorrect: false,
                prompt: 'I\'m sorry, to correctly calculate your rep max the weight and number of reps should be ' +
                    'great than zero.'
            };
        }

        if (reps > 10) {
            return {
                isCorrect: false,
                prompt: 'I\'m sorry, to correctly calculate your rep max the number of reps should be ' +
                    'less or equal to ten.'
            };
        }

        if (reps <= 0) {
            return {
                isCorrect: false,
                prompt: 'I\'m sorry, to correctly calculate your rep max the number of reps should be ' +
                    'great than zero.'
            };
        }

        if (weight_lifted <= 0) {
            return {
                isCorrect: false,
                prompt: 'I\'m sorry, to correctly calculate your rep max the weight lifted should be ' +
                    'great than zero.'
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
        calculateRepMax: calculateRepMax,
        getMaxRange: getMaxRange
    };
}

module.exports = logicHelper;