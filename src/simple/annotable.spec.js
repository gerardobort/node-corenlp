import SimpleCoreNLP from '..';
import Annotable from './annotable';

describe('Annotable', () => {
  let connectorMock;
  let annotable;
  let annotatorMock1;
  let annotatorMock2;

  before(() => {
    connectorMock = { get: sinon.stub() };
    SimpleCoreNLP.setup(connectorMock);
  });

  beforeEach(() => {
    annotable = new Annotable('el pájaro veloz');
    annotable.fromJson = sinon.stub();
    annotatorMock1 = {
      toString: sinon.stub().returns('ANNOTATOR_MOCK'),
      pipeline: sinon.stub().returns([]),
      pipelineOptions: sinon.stub().returns({}),
      dependencies: sinon.stub().returns([]),
    };

    annotatorMock2 = {
      toString: sinon.stub().returns('ANNOTATOR_MOCK_2'),
      pipeline: sinon.stub(),
      pipelineOptions: sinon.stub(),
      dependencies: sinon.stub(),
    };
  });

  describe('addAnnotator / hasAnnotator', () => {
    it('should add an annotator and reflect the change when asked', () => {
      expect(annotable.hasAnnotator(annotatorMock1)).to.be.false;
      expect(annotable.addAnnotator(annotatorMock1));
      expect(annotable.hasAnnotator(annotatorMock1)).to.be.true;
    });
  });

  describe('addAnnotators / hasAnyAnnotator', () => {
    it('should add multiple annotators and reflect the change when asked', () => {
      expect(annotable.hasAnyAnnotator([annotatorMock1])).to.be.false;
      expect(annotable.hasAnyAnnotator([annotatorMock2])).to.be.false;
      expect(annotable.addAnnotators([annotatorMock1, annotatorMock2]));
      expect(annotable.hasAnyAnnotator([annotatorMock1])).to.be.true;
      expect(annotable.hasAnyAnnotator([annotatorMock2])).to.be.true;
    });
  });

  describe('addAnnotators / hasAnyAnnotator / removeAnnotator', () => {
    it('should add multiple annotators and reflect the change when asked', () => {
      expect(annotable.hasAnyAnnotator([annotatorMock1])).to.be.false;
      expect(annotable.hasAnyAnnotator([annotatorMock2])).to.be.false;
      expect(annotable.addAnnotators([annotatorMock1, annotatorMock2]));
      expect(annotable.hasAnyAnnotator([annotatorMock1])).to.be.true;
      expect(annotable.hasAnyAnnotator([annotatorMock2])).to.be.true;
      annotable.removeAnnotator(annotatorMock1);
      expect(annotable.hasAnyAnnotator([annotatorMock1])).to.be.false;
      expect(annotable.hasAnyAnnotator([annotatorMock2])).to.be.true;
      expect(annotable.hasAnyAnnotator([annotatorMock1, annotatorMock2])).to.be.true;
      expect(annotable.hasAnnotator(annotatorMock1)).to.be.false;
    });
  });

  describe('applyAnnotator', () => {
    it('should call the service asynchronously and load the annotator metas', async () => {
      const jsonStub = {
        sentences: [
          {
            tokens: [
              { word: 'loren' },
              { word: 'ipsum' },
            ],
          },
        ],
      };
      connectorMock.get.returns(Promise.resolve(jsonStub));

      await annotable.applyAnnotator(annotatorMock1);
      expect(connectorMock.get).to.have.been.calledWith({
        annotators: [],
        text: 'el pájaro veloz',
        options: {},
        language: 'es',
      });
      expect(annotable.fromJson).to.have.been.calledWith(jsonStub);
    });
  });
});
