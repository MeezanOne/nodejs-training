const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
const User = require('../models/user');
const AuthController = require('../controllers/auth')

describe('Auth Controller - Login', function() {
    before(function(done){
        mongoose.connect('mongodb://localhost:27017/test-messages')
                .then(() => User.deleteMany({}))
                .then(() => {
                const user = new User({
                    email: 'test@test.com',
                    password: 'tester',
                    name: 'Test',
                    posts: [],
                    _id: '68b5bda3f983ca0ac23246cc',
                    status: 'I am new!'  // ✅ make sure this field exists in schema
        });
        return user.save();
        }).then(()=>{
            done();
        })
    });

    it('should throw an error with code 500 if accessing the database fails', function(done){
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req = {
            body: {
                email: 'test@test.com',
                password: 'tester'
            }
        }

        AuthController.login(req, {},()=>{}).then(result =>{
            expect(result).to.be.an('error')
            expect(result).to.have.property('statusCode', 500);
            done();
        })

        User.findOne.restore();
    })

    // Without Done Method
    // it('should send a response with a valid user status for an existing user', async function () {
    // await mongoose.connect('mongodb://localhost:27017/test-messages');

    // // clear old data if exists
    // await User.deleteMany({});

    // const user = new User({
    //     email: 'test@test.com',
    //     password: 'tester',
    //     name: 'Test',
    //     posts: [],
    //     _id: '68b5bda3f983ca0ac23246cc',
    //     status: 'I am new!' // make sure user has this field
    // });
    // await user.save();

    // const req = { userId: '68b5bda3f983ca0ac23246cc' };
    // const res = {
    //     statusCode: 500,
    //     userStatus: null,
    //     status: function (code) {
    //     this.statusCode = code;
    //     return this;
    //     },
    //     json: function (data) {
    //     this.userStatus = data.status;
    //     }
    // };

    // await AuthController.getUserStatus(req, res, () => {});

    // expect(res.statusCode).to.equal(200);
    // expect(res.userStatus).to.equal('I am new!');

    // await mongoose.disconnect();
    // });

    // With Done Method
    it('should send a response with a valid user status for an existing user', function(done){
        const req= { userId: '68b5bda3f983ca0ac23246cc'};
        const res = {
            statusCode: 500,
            userStatus: null,
            status: function(code) {
                this.statusCode = code;
                return this;
            },
            json: function(data) {
                this.userStatus = data.status;
            }
        };
        AuthController.getUserStatus(req, res, ()=> {}).then(()=>{
            expect(res.statusCode).to.be.equal(200);
            expect(res.userStatus).to.be.equal('I am new!');
            done();
        });
    })

    after(function(done){
        // User.deleteMany({})
        // .then(()=>{
        //     return mongoose.disconnect();
        // })
        // .then(()=>{
        //     done();
        // })
         mongoose.disconnect()
        .then(()=>{
            done();
        })
    })
})