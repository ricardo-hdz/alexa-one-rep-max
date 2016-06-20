
/* global describe, require, it */
'use strict';

var chai = require('chai');
var _ = require('lodash');
var expect = chai.expect;
var logicHelper = require('../logicHelper')();
chai.config.includeStack = true;

describe('One Rep Max', function() {
    describe('Should return correct rep max', function() {
        it('returns correct rep max for all percentages', function() {
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
            var rep_max_ten = 0;
            var rep_max = 0;

            var result = logicHelper.calculateRepMax(weight_lifted, reps);

            _.forEach(expectValues, function(repMaxWeight, percentage) {
                expect(result[percentage]).to.equal(repMaxWeight);
            });
        });
    });

    describe('Should return correct error messages when values are not valid', function() {
        it('Should return null when no weight is defined', function() {
            var result = logicHelper.calculateRepMax(null,100);
            expect(result).to.be.null;
        });

        it('Should return null when no reps are defined', function() {
            var result = logicHelper.calculateRepMax(100);
            expect(result).to.be.null;
        });

        it('Should return null when weight and reps are undefined', function() {
            var result = logicHelper.calculateRepMax();
            expect(result).to.be.null;
        });

        it('Should return null when weight is not a number', function() {
            var result = logicHelper.calculateRepMax('100');
            expect(result).to.be.null;
        });

        it('Should return null when reps is not a number', function() {
            var result = logicHelper.calculateRepMax(100, '100');
            expect(result).to.be.null;
        });

        it('Should return null when weight and reps are not a number', function() {
            var result = logicHelper.calculateRepMax('100', '100');
            expect(result).to.be.null;
        });

        it('Should return null when reps exceed 10', function() {
            var result = logicHelper.calculateRepMax(100, 11);
            expect(result).to.be.null;

            var result = logicHelper.calculateRepMax(100, 10.1);
            expect(result).to.be.null;
        });

        it('Should return null when reps is zero', function() {
            var result = logicHelper.calculateRepMax(100, 0);
            expect(result).to.be.null;
        });

        it('Should return null when reps is negative', function() {
            var result = logicHelper.calculateRepMax(100, -1);
            expect(result).to.be.null;
        });

        it('Should return null when weight is zero', function() {
            var result = logicHelper.calculateRepMax(0, 11);
            expect(result).to.be.null;
        });

        it('Should return null when weight is negative', function() {
            var result = logicHelper.calculateRepMax(-10, 11);
            expect(result).to.be.null;
        });

        it('Should return null when weight and reps are zero', function() {
            var result = logicHelper.calculateRepMax(0, 0);
            expect(result).to.be.null;
        });

        it('Should return null when weight and reps are negative', function() {
            var result = logicHelper.calculateRepMax(-1, -1);
            expect(result).to.be.null;
        });
    });


});