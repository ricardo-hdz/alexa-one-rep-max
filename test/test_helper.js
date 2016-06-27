
/* global describe, require, it */
'use strict';

var chai = require('chai');
var _ = require('lodash');
var expect = chai.expect;
var logicHelper = require('../logicHelper')();
var errorMessages = require('../errorMessages')();
chai.config.includeStack = true;

describe('One Rep Max', function() {
    describe('Should return correct rep max', function() {
        it('for all percentages', function() {
             var expectValues = {
                100: 73,
                95: 69.4,
                90: 65.7,
                85: 62.1,
                80: 58.4,
                75: 54.8,
                70: 51.1,
                65: 47.4,
                60: 43.8,
                55: 40.2,
                50: 36.5
            };

            var weight_lifted = 65;
            var reps = 5;

            var result = logicHelper.getMaxRange(73);

            _.forEach(expectValues, function(repMaxWeight, percentage) {
                expect(result[percentage]).to.equal(repMaxWeight);
            });
        });

        it('returns correct response and prompt', function() {
            var weight_lifted = 65;
            var reps = 5;

            var result = logicHelper.determineRepMax(weight_lifted, reps);
            expect(result.isCorrect).to.be.true;
            expect(result.prompt).to.equal('Your rep max is 73');
        });
    });

    describe('Weight error cases ', function() {
        // Null > 0

        it('when weight is null or undefined', function() {
            var result = logicHelper.determineRepMax(null,100);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.weightMissing);

            result = logicHelper.determineRepMax(undefined,100);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.weightMissing);
        });

        //NaN
        it('when weight is not a number', function() {
            var result = logicHelper.determineRepMax(NaN, 9);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.weightNaN);
        });

        it('when weight is a string', function() {
            var result = logicHelper.determineRepMax('Random text', 9);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.weightNaN);
        });

        // Weight < 0
        it('Should return null when weight is zero or negative', function() {
            var result = logicHelper.determineRepMax(0, 9);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.weightZeroOrNegative);

            var result = logicHelper.determineRepMax(-10, 9);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.weightZeroOrNegative);
        });
    });

    describe('Rep error cases ', function() {
        // Null > 0
        it('when reps is null or undefined', function() {
            var result = logicHelper.determineRepMax(100, null);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.repsMissing);

            result = logicHelper.determineRepMax(100, undefined);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.repsMissing);
        });

        // NaN
        it('when reps is not a number', function() {
            var result = logicHelper.determineRepMax(100, NaN);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.repsNaN);
        });

         it('when reps is string', function() {
            var result = logicHelper.determineRepMax(100, 'Random text');
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.repsNaN);
        });

        // No reps
        it('when no reps are defined', function() {
            var result = logicHelper.determineRepMax(100);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.repsMissing);
        });

        it('Should return null when reps is zero or negative', function() {
            var prompt = 'I\'m sorry, to correctly determine your rep max the number of reps should be ' +
                    'great than zero.';

            var result = logicHelper.determineRepMax(100, 0);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.repsGreaterThanZero);

            var result = logicHelper.determineRepMax(100, -1);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.repsGreaterThanZero);
        });

        it('Should return null when reps exceed 10', function() {
            var result = logicHelper.determineRepMax(100, 11);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.repsGreaterThanTen);

            var result = logicHelper.determineRepMax(100, 10.1);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.repsGreaterThanTen);
        });
    });

    describe('Weight/Reps error cases ', function() {
        it('Should return null when weight and reps are undefined', function() {
            var result = logicHelper.determineRepMax();
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.noValuesProvided);
        });

        it('Should return null when weight and reps are not a number', function() {
            var result = logicHelper.determineRepMax('Random', 'Random');
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.notANumber);
        });

        it('Should return null when weight and reps are zero or negative', function() {
            var result = logicHelper.determineRepMax(0, 0);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.weightRepsGreaterThanZero);

            var result = logicHelper.determineRepMax(-1, -1);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(errorMessages.weightRepsGreaterThanZero);
        });
    });
});