import ConnectorServer from './connector-server';

describe('ConnectorServer', () => {
  let connector;

  describe('constructor', () => {
    it('should have a constructor method', () => {
      expect(ConnectorServer).to.have.property('constructor').that.is.a('function');
    });

    it('should initialize the instance properly (default)', () => {
      expect(new ConnectorServer()).to.have.property('_dsn').that.equals('http://localhost:9000');
    });

    it('should initialize the instance properly (custom dsn)', () => {
      expect(new ConnectorServer({ dsn: 'dsn-stub' })).to.have.property('_dsn').that.equals('dsn-stub');
    });
  });

  describe('get', () => {
    beforeEach(() => {
      connector = new ConnectorServer();
      sinon.stub(connector, '_makeRequest').returns(Promise.resolve('corenlp-result-stub'));
    });

    context('standard annotation pipeline', () => {
      it('should prepare the request propery', async () => {
        connector.get({
          annotators: ['a', 'b', 'c'],
          text: 'xyz',
          options: { optionA: 1, optionB: 2 },
          language: 'LanguageStub',
        });
        expect(connector._makeRequest).to.be.have.been.calledWith(
          'http://localhost:9000',
          'pipelineLanguage=LanguageStub&properties={"annotators":"a,b,c","optionA":1,"optionB":2,"outputFormat":"json"}',
          'xyz',
        );
      });
    });

    context('utility pipeline', () => {
      it('should prepare the request propery', async () => {
        connector.get({
          annotators: ['a', 'b', 'c'],
          text: 'xyz',
          options: { optionA: 1, optionB: 2, 'semgrex.pattern': '{ner:/.*/}=stub' },
          language: 'LanguageStub',
          utility: 'semgrex',
        });
        expect(connector._makeRequest).to.be.have.been.calledWith(
          'http://localhost:9000/semgrex',
          'pipelineLanguage=LanguageStub&properties={"annotators":"a,b,c","optionA":1,"optionB":2,"semgrex.pattern":"{ner:/.*/}=stub","outputFormat":"json"}&pattern=%7Bner:/.*/%7D=stub',
          'xyz',
        );
      });
    });
  });

  describe('_makeRequest', () => {
    beforeEach(() => {
      connector = new ConnectorServer();
      sinon.stub(connector, '_rp').returns(Promise.resolve('corenlp-result-stub'));
    });

    it('should call request-promise accordingly', async () => {
      connector._makeRequest('http://127.0.0.1:3000', 'q=1&k=2', 'text-stub');
      expect(connector._rp).to.be.have.been.calledWith({
        method: 'POST',
        uri: 'http://127.0.0.1:3000?q=1&k=2',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: 'text-stub',
        json: true,
      });
    });
  });
});
