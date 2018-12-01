/*
 * Tests the user controller
 * 
 * Functions Tested:
 *   - getUser
 *   - getAvgRating
 *   - getUserProfiles
 *   - getDeviceTokens
 */

jest.mock('../db.js', () => {
    const db = require('./test_db');
    return db;
});
jest.setTimeout(30000);

const TestData = require('./testdata');
const request = require('supertest');
const app = require('../app.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

describe('UserController.js tests', function () {
    it('updates existing user', async function () {
	let response = await
        request(app)
            .put('/users/testUser')
            .send(TestData.userControllerReq)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it('throws error when trying to PUT non-existent user', async function () {
	let response = await
        request(app)
            .put('/users/non-existent-user')
            .send(TestData.userControllerReq)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(404);
    });
});
