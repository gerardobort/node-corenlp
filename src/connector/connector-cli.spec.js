import ConnectorCli from './connector-cli';

describe('ConnectorCli', () => {
  let connector;

  describe('constructor', () => {
    it('should have a constructor method', () => {
      expect(ConnectorCli).to.have.property('constructor').that.is.a('function');
    });

    it('should initialize the instance properly (default)', () => {
      connector = new ConnectorCli();
      expect(connector).to.have.property('_classPath').that.equals('corenlp/stanford-corenlp-full-2017-06-09/*');
      expect(connector).to.have.property('_mainClass').that.equals('edu.stanford.nlp.pipeline.StanfordCoreNLP');
      expect(connector).to.have.property('_props').that.equals('StanfordCoreNLP-spanish.properties');
    });

    it('should initialize the instance properly (custom dsn)', () => {
      connector = new ConnectorCli({ classPath: 'x', mainClass: 'y', props: 'z' });
      expect(connector).to.have.property('_classPath').that.equals('x');
      expect(connector).to.have.property('_mainClass').that.equals('y');
      expect(connector).to.have.property('_props').that.equals('z');
    });
  });

  describe('get', () => {
    beforeEach(() => {
      connector = new ConnectorCli();
      sinon.stub(connector, '_tmpFile').returns(Promise.resolve({ path: 'tmp-file-stub' }));
      sinon.stub(connector, '_exec').returns(Promise.resolve({ stdout: 'writing to ijk.json', stderr: '' }));
      sinon.stub(connector, '_loadJSONFile').returns(Promise.resolve('exec-json-stub'));
    });

    context('standard annotation pipeline', () => {
      it('should prepare the request propery', async () => {
        await connector.get({
          annotators: ['a', 'b', 'c'],
          text: 'xyz',
          // TODO
          // options: { optionA: 1, optionB: 2 },
          // language: 'LanguageStub',
        });
        expect(connector._tmpFile).to.be.have.been.calledWith('xyz');
        expect(connector._exec).to.be.have.been.calledWith('java -cp \'corenlp/stanford-corenlp-full-2017-06-09/*\' edu.stanford.nlp.pipeline.StanfordCoreNLP -props StanfordCoreNLP-spanish.properties -annotators a,b,c -outputFormat json -file tmp-file-stub');
      });
    });
  });
});
