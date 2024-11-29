const request = require('supertest');
const app = require('../index');
const Student = require('../models/Student')


test('GET / returns 200 - Login Page', async()=>{
    const response = await request(app).get('/')
    expect(response.status).toBe(200);
});

test('GET / returns 302 when logged in', async()=>{
    await request(app).post('/login').type('form').send({
        email: "testuser@charlotte.edu",
        password: "12345"
    });

    const response = await request(app).get('/')
    expect(response.status).toBe(200);

    await request(app).post('/logout');
});

test('GET /signup returns 200 - Signup Page', async()=>{
    const response = await request(app).get('/signup');
    expect(response.status).toBe(200);
})

test('POST /login returns 302 with Correct Credential Login', async()=>{
    const response = await request(app).post('/login').type('form').send({
        email: "testuser@charlotte.edu",
        password: "12345"
    });

    expect(response.status).toBe(302);

    await request(app).post('/logout');
});

test('POST /login returns 400 with Incorrect Credential Login', async()=>{
    const response = await request(app).post('/login').type('form').send({
        email: "nonexisting@charlotte.edu",
        password: "not-a-password"
    });

    expect(response.status).toBe(400);
});

test('POST /logout returns 302 with no Session on Successful Logout', async()=>{

    // Login with a valid user account

    await request(app).post('/login').type('form').send({
        email: "testuser@charlotte.edu",
        password: "12345"
    });

    const response = await request(app).post('/logout');

    // Check for the cookie, if its undefined, then the session was destroyed

    expect(response.status).toBe(302);
    const cookie = response.headers['set-cookie'];
    expect(cookie).toBeUndefined();
});

test('POST /signup creates a student given valid credentials', async()=>{
    await request(app).post('/signup-test').type('form').send({
        firstName: "Test",
        "lastName": "User",
        "email": "testpurposeuser@charlotte.edu",
        "password": "12345",
        "classification": "Freshman",
        "concentration": "Cybersecurity-B.S."
    });

    const student = await Student.findOne({ email: "testpurposeuser@charlotte.edu" }).exec();

    expect(student).toBeDefined();

    await Student.findOneAndDelete({ email: student.email }).exec();
});

test('GET /dashboard returns 302 when not Logged In', async()=>{
    const response = await request(app).get('/dashboard');

    expect(response.status).toBe(302);
});

test('GET ** (any other route) should result in 404', async()=>{
    let response = await request(app).get('/random-url');
    expect(response.status).toBe(404);

    response = await request(app).get('/random-url/again');
    expect(response.status).toBe(404);

    response = await request(app).get('/alk/kjkjd123l');
    expect(response.status).toBe(404);
});