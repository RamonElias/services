// const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

chai.use(chaiHttp);

describe('GET /services/fails', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/services/fails')
      .set('Accept', 'application/json')
      .expect('Content-Type', /html/)
      .expect(404, done);
  });
});

describe('GET /services', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/services')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /services/mirror', function() {
  it('responds with same input in json', function(done) {
    request(app)
      .post('/services/mirror')
      .send('content=qwerty')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        error: false,
        code: 200,
        message: "Field Got It",
        input: {"content":"qwerty"}
      }, done);
  });
});

describe('Fails: ', () => {
  it('fails as expected', (done) => {
    chai.request(app)
    .get('/services/fails')
    .end(function(err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
});

describe('Get Index: ', () => {
  it('gets expected index', (done) => {
    chai.request(app)
    .get('/services')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});

describe('Post And Get Same Input: ', () => {
  it('should send same input', (done) => {
    chai.request(app)
      .post('/services/mirror')
      .send({content: "qwerty"})
      .end( function(err,res) {
        // console.log(res.body)
        // console.log(res.body.input.content)
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.be.equal('Field Got It');
        expect(res.body).to.have.property('input').to.have.property('content').to.be.equal('qwerty');
        done();
      });
  });
});
