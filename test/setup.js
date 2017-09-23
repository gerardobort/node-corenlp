import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

global.expect = chai.expect;
global.sinon = sinon;
chai.use(sinonChai);
