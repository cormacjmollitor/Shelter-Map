/*
 * Tests the recommendation controller
 * 
 * Functions Tested:
 *   - GET /recommendations/:userID
 */

jest.mock('../db.js', () => {
    const db = require('./test_db');
    return db;
});

const request = require('supertest');
const app = require('../app.js');
jest.setTimeout(30000);

describe('RecommendationController.js tests', function () {
    it('get recommendations and returns successfully', function (done) {
        request(app)
            .get('/recommendations/testUser')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    
    it('throws an error when attempting to get recommendations for non-existent user', function (done) {
        request(app)
            .get('/recommendations/idisnonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500) 
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
