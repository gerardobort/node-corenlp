import Service from './service';

describe('Service', () => {
  let service;
  let connectorMock;

  describe('constructor', () => {
    it('should have a constructor method', () => {
      expect(Service).to.have.property('constructor').that.is.a('function');
    });

    it('should initialize the instance properly', () => {
      expect(new Service(1, 2)).to.have.property('_connector').that.equals(1);
      expect(new Service(1, 2)).to.have.property('_language').that.equals(2);
      expect(new Service(1)).to.have.property('_language').that.equals('Unspecified');
    });
  });

  describe('getAnnotationData', () => {
    beforeEach(() => {
      connectorMock = {
        get: sinon.stub().returns('promise-stub'),
      };
      service = new Service(connectorMock);
    });

    it('should call the connectorMock', () => {
      expect(service.getAnnotationData('text-stub', ['annotator'], { opt: 1 }))
        .to.equals('promise-stub');
      expect(connectorMock.get).to.have.been.calledWith({
        annotators: ['annotator'],
        text: 'text-stub',
        options: { opt: 1 },
        language: 'unspecified',
      });
    });
  });

  describe('getTokenPosInfo', () => {
    it('should return the proper pos data for English', () => {
      expect(Service.getTokenPosInfo('FW', 'en')).to.deep.equals({
        group: 'Foreign word',
        tag: 'Foreign word',
        examples: [],
      });
    });

    it('should return the proper pos data for Spanish', () => {
      expect(Service.getTokenPosInfo('fd', 'es')).to.deep.equals({
        group: 'Punctuation',
        tag: 'Colon',
        examples: [':'],
      });
    });

    it('should silently return undefined if no definition is found', () => {
      expect(Service.getTokenPosInfo('test-stub', 'es')).to.be.undefined;
    });

    it('should silently return undefined if the language is not found', () => {
      expect(Service.getTokenPosInfo('fd', 'zz')).to.be.undefined;
    });
  });

  describe('getSentenceParseInfo', () => {
    it('should return the proper parse data for English', () => {
      expect(Service.getSentenceParseInfo('S', 'en')).to.deep.equals({
        description: 'simple declarative clause, i.e. one that is not introduced by a (possible empty) subordinating conjunction or a wh-word and that does not exhibit subject-verb inversion.',
        examples: [],
      });
    });

    it('should return the proper parse data for Spanish', () => {
      expect(Service.getSentenceParseInfo('S', 'es')).to.deep.equals({
        description: 'Clause',
        examples: ['lo que iba a hacer'],
      });
    });

    it('should silently return undefined if no definition is found', () => {
      expect(Service.getSentenceParseInfo('test-stub', 'es')).to.be.undefined;
    });

    it('should silently return undefined if the language is not found', () => {
      expect(Service.getSentenceParseInfo('S', 'zz')).to.be.undefined;
    });
  });

  describe('getGovernorDepInfo', () => {
    it('should return the proper depparse data', () => {
      expect(Service.getGovernorDepInfo('dobj')).to.deep.equals({
        type: 'direct object',
        description: '',
        examples: [],
      });
    });
  });
});
