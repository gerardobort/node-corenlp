import CorefChain from './coref-chain';

describe('CorefChain', () => {
  let chain;

  beforeEach(() => {
    chain = new CorefChain();
  });

  context('CorefChain interface', () => {
    it('should follow the CorefChain contract', () => {
      expect(chain).to.have.property('mentions').that.is.a('function');
      expect(chain).to.have.property('mention').that.is.a('function');
      expect(chain).to.have.property('representative').that.is.a('function');
      expect(chain).to.have.property('nonRepresentatives').that.is.a('function');
      expect(chain).to.have.property('document').that.is.a('function');
      expect(chain).to.have.property('fromDocument').that.is.a('function');
      expect(chain).to.have.property('fromJSON').that.is.a('function');
    });

    describe.skip('constructor', () => {
    });
  });
});
