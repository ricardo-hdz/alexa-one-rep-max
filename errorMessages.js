'use strict';

function errorMessages() {
    return {
        notANumber: 'I\'m sorry, I can just determine your rep max using valid numbers for weights and repetitions. ' +
            'Please tell me what is the weight you lifted and the number of reps performed.',

        noValuesProvided: 'I\'m sorry, to determine your one rep max I need the weight you lifted and the number of reps. ' +
            'Please tell me what is the weight you lifted and the number of reps performed.',

        weightGreaterThanZero: 'I\'m sorry, to correctly determine your rep max the weight lifted should be ' +
            'a number great than zero. ' +
            'Please tell me what is the weight you lifted and the number of reps performed.',

        weightNaN: 'I\'m sorry, I can just determine your rep max using valid weights. ' +
            'Please tell me the correct weight you lifted along with the number of reps performed.',

        weightMissing: 'I\'m sorry, to correctly determine your rep max I need the weight you lifted. ' +
            'Please tell me the correct number of reps you lifted along with the number of reps performed.',

        repsNaN: 'I\'m sorry, I can just determine your rep max using a valid repetition range from from one to ten. ' +
            'Please tell me the correct number of reps you lifted along with the number of reps performed.',

        repsGreaterThanZero: 'I\'m sorry, to correctly determine your rep max the number of reps should be ' +
            'a number great than zero.' +
            'Please tell me what is the weight you lifted and the number of reps performed.',

        repsGreaterThanTen: 'I\'m sorry, to correctly determine your rep max the number of reps should be ' +
            'less or equal to ten. ' +
            'Please tell me what is the weight you lifted and the number of reps performed.',

        repsMissing: 'I\'m sorry, to correctly determine your rep max I need the number of reps you performed. ' +
            'Please tell me the correct number of reps you lifted along with the number of reps performed.',

        weightRepsGreaterThanZero: 'I\'m sorry, to correctly determine your rep max the weight and number of reps should be ' +
            'great than zero. ' +
            'Please tell me what is the weight you lifted and the number of reps performed.'
    };
}

module.exports = errorMessages;