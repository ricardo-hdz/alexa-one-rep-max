
/* global describe, require, it */
'use strict';

var chai = require('chai');
var _ = require('lodash');
var expect = chai.expect;
var logicHelper = require('../logicHelper')();
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

            var result = logicHelper.calculateRepMax(weight_lifted, reps);
            expect(result.isCorrect).to.be.true;
            expect(result.prompt).to.equal('Your rep max is 73');
        });
    });

    describe('Should return correct error messages ', function() {
        var notNumberMessage = 'I\'m sorry, I can just calculate your rep max using numbers. ' +
                    'Please tell me what is the weight you lifted and the number of reps performed.';


        it('when no weight is defined', function() {
            var result = logicHelper.calculateRepMax(null,100);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(notNumberMessage);
        });

        it('Should return null when no reps are defined', function() {
            var result = logicHelper.calculateRepMax(100);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(notNumberMessage);
        });

        it('Should return null when weight and reps are undefined', function() {
            var result = logicHelper.calculateRepMax();
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(notNumberMessage);
        });

        it('Should return null when weight is not a number', function() {
            var result = logicHelper.calculateRepMax('100');
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(notNumberMessage);
        });

        it('Should return null when reps is not a number', function() {
            var result = logicHelper.calculateRepMax(100, '100');
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(notNumberMessage);
        });

        it('Should return null when weight and reps are not a number', function() {
            var result = logicHelper.calculateRepMax('100', '100');
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(notNumberMessage);
        });

        it('Should return null when reps exceed 10', function() {
            var prompt = 'I\'m sorry, to correctly calculate your rep max the number of reps should be ' +
                    'less or equal to ten.';

            var result = logicHelper.calculateRepMax(100, 11);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(prompt);

            var result = logicHelper.calculateRepMax(100, 10.1);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(prompt);
        });

        it('Should return null when reps is zero or negative', function() {
            var prompt = 'I\'m sorry, to correctly calculate your rep max the number of reps should be ' +
                    'great than zero.';

            var result = logicHelper.calculateRepMax(100, 0);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(prompt);

            var result = logicHelper.calculateRepMax(100, -1);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(prompt);
        });

        it('Should return null when weight is zero or negative', function() {
            var prompt = 'I\'m sorry, to correctly calculate your rep max the weight lifted should be ' +
                    'great than zero.';

            var result = logicHelper.calculateRepMax(0, 9);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(prompt);

            var result = logicHelper.calculateRepMax(-10, 9);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(prompt);
        });


        it('Should return null when weight and reps are zero or negative', function() {
            var prompt = 'I\'m sorry, to correctly calculate your rep max the weight and number of reps should be ' +
                    'great than zero.';
            var result = logicHelper.calculateRepMax(0, 0);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(prompt);

            var result = logicHelper.calculateRepMax(-1, -1);
            expect(result.isCorrect).to.be.false;
            expect(result.prompt).to.equal(prompt);
        });
    });


});