'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
const expect = chai.expect;
chai.use(sinonChai);

import SimpleCoreNLP from '../src';

describe('CoreNLP Library entry point', function () {
  it('should follow the documented contract: SimpleCoreNLP', function () {
    expect(SimpleCoreNLP).to.have.property('Document').that.is.a('function');
    expect(SimpleCoreNLP).to.have.property('Sentence').that.is.a('function');
  });

  it('should follow the documented contract: SimpleCoreNLP.Document', function () {
    const doc = new SimpleCoreNLP.Document('loren ipsum dolor sit amet');
    expect(doc).to.have.property('sentences').that.is.a('function');
    expect(doc).to.have.property('sentence').that.is.a('function');
    expect(doc).to.have.property('coref').that.is.a('function');
  });

  it('should follow the documented contract: SimpleCoreNLP.Sentence', function () {
    const sent = new SimpleCoreNLP.Sentence('loren ipsum dolor sit amet');
    expect(sent).to.have.property('parse').that.is.a('function');
    expect(sent).to.have.property('words').that.is.a('function');
    expect(sent).to.have.property('word').that.is.a('function');
    expect(sent).to.have.property('posTags').that.is.a('function');
    expect(sent).to.have.property('posTag').that.is.a('function');
    expect(sent).to.have.property('lemmas').that.is.a('function');
    expect(sent).to.have.property('lemma').that.is.a('function');
    expect(sent).to.have.property('nerTags').that.is.a('function');
    expect(sent).to.have.property('nerTag').that.is.a('function');
    expect(sent).to.have.property('governor').that.is.a('function');
    expect(sent).to.have.property('incommingDependencyLabel').that.is.a('function');
    expect(sent).to.have.property('natlogPolarities').that.is.a('function');
    expect(sent).to.have.property('natlogPolarity').that.is.a('function');
    expect(sent).to.have.property('openie').that.is.a('function');
    expect(sent).to.have.property('openieTriples').that.is.a('function');
    expect(sent).to.have.property('algorithms').that.is.a('function');
  });
});
