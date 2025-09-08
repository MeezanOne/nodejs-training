const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/is-auth');
const sinon = require('sinon')

describe('Auth middleware',function(){
    
    // Unit Test - testing one specific features
    it('should throw an error if no authorization header is present', function(){
        const req = {
            get: function(){
                return null;
            }
        };
        expect(authMiddleware.bind(this, req, {}, ()=>{})).to.throw('Not authenticated.');
    })

    it('it should throw an error if the authorization header is only one string', function(){
            const req = {
            get: function(headerName){
                return 'xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, ()=>{})).to.throw();
    });

    it('should yield a userId after decoding the token', function(){
        const req = {
            get: function(){
                return 'Bearer dfhsifhsdf';
            }
        };
        sinon.stub(jwt, 'verify');
        jwt.verify.returns({userId:'abc'});
        authMiddleware(req,{},()=>{})
        expect(req).to.have.property('userId');
        expect(req).to.have.property('userId','abc');
        expect(jwt.verify.called).to.be.true;
        jwt.verify.restore();
    })

    it('it should throw an error if the token cannot be verified', function(){
        const req = {
            get: function(){
                return 'Bearer xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, ()=>{})).to.throw();
    })

})

