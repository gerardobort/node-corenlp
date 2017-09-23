import Pipeline from './pipeline';
import Service from './service';
import ConnectorServer from './connector/connector-server';

describe('Pipeline', () => {
  let pipeline;

  describe('constructor', () => {
    it('should have a constructor method', () => {
      expect(Pipeline).to.have.property('constructor').that.is.a('function');
    });

    it('should initialize the instance properly', () => {
      expect(new Pipeline(1, 2, 3)).to.have.property('_properties').that.equals(1);
      expect(new Pipeline(1, 2, 3)).to.have.property('_language').that.equals(2);
      expect(new Pipeline(1, 2, 3)).to.have.property('_connector').that.equals(3);
      expect(new Pipeline(1)).to.have.property('_language').that.equals('Unspecified');
      expect(new Pipeline(1)).to.have.property('_connector').to.be.instanceOf(ConnectorServer);
    });
  });

  describe('getService', () => {
    beforeEach(() => {
      pipeline = new Pipeline(1);
    });

    it('should allow to get the service associated', async () => {
      expect(pipeline.getService()).to.be.instanceOf(Service);
    });
  });
});
