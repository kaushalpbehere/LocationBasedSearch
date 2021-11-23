const app = require('../app');
const request = require('supertest');

describe('LocationBasedSearch start testing', () => {
    // 1: Get Users
    describe('Users Based in London', () => {
        test('Users living in London', () => {
            return request(app).get('/api/city/London/users')
            .expect(200)
            .then(({ body }) => {
                expect(body).toHaveProperty('users');
            });
        });
        // Test users return contain the correct properties
        test('When a user is returned it should contain the following key value pairs', () => {
            return request(app).get('/api/city/London/users')
            .expect(200)
            .then(({ body: { users } }) => {
                users.forEach(user => {
                    expect(user).toHaveProperty('id');
                    expect(user).toHaveProperty('first_name');
                    expect(user).toHaveProperty('last_name');
                    expect(user).toHaveProperty('email');
                    expect(user).toHaveProperty('ip_address');
                    expect(user).toHaveProperty('latitude');
                    expect(user).toHaveProperty('longitude');
                });
            });
        });
    });
});