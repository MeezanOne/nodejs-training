const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');
const FeedController = require('../controllers/feed')

describe('Feed Controller', function() {
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

    beforeEach(function(){})
    afterEach(function(){})

    it('should add a created post to the posts of the creator', function(done){

        const req = {
            body: {
                title: "Text Post",
                content: 'A Test Post'
            },
            file:{
                path:'abc'
            },
            userId: '68b5bda3f983ca0ac23246cc'
        }
        const res ={ status:function(){
            return this;
        }, json: function(){}}

        FeedController.createPost(req, res, ()=>{})
        .then((savedUser)=>{
            expect(savedUser).to.have.property('posts');
            expect(savedUser.posts).to.have.length(1);
            done();
        })

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