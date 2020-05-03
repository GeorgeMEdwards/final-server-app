const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Employees API Service', function () {
  it('should GET all employees', function (done) {
    chai
      .request('http://localhost:3000')
      .get('/api/employees')
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        done();
      });
  });

  it('should GET a single employee', function (done) {
    const expected = [
      {
        id: 1,
        name: "I'm the first employee!",
        created_date: '2020-03-24T05:09:49.000Z',
        status: 'employed',
      },
    ];

    chai
      .request('http://localhost:3000')
      .get('/api/employees/1')
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });

  it.skip('should POST a single employee', function (done) {
    const newEmployee = {
      name: 'New test employee!',
    };
    const expected = { msg: 'Add employee successfully!' };

    chai
      .request('http://localhost:3000')
      .post('/api/employees')
      .send(newEmployee)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });
});