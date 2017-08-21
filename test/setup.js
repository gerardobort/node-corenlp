'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
global.expect = chai.expect;
chai.use(sinonChai);

import SimpleCoreNLP from '../src';
SimpleCoreNLP.setup(
  // new SimpleCoreNLP.ConnectorCli({ classPath: '../nlp-node-workshop/corenlp/stanford-corenlp-full-2017-06-09/*' })
  new SimpleCoreNLP.Connector({})
);
