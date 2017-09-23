import Annotable from './annotable';
import Annotator from './annotator';

describe('Annotable', () => {
  let annotable;
  let annotatorMock1;
  let annotatorMock2;

  beforeEach(() => {
    annotable = new Annotable('el pájaro veloz');
    annotable.fromJson = sinon.stub();
    annotatorMock1 = new Annotator();
    Object.assign(annotatorMock1, {
      toString: sinon.stub().returns('ANNOTATOR_MOCK'),
      pipeline: sinon.stub().returns([]),
      pipelineOptions: sinon.stub().returns({}),
      dependencies: sinon.stub().returns([]),
    });

    annotatorMock2 = new Annotator();
    Object.assign(annotatorMock2, {
      toString: sinon.stub().returns('ANNOTATOR_MOCK_2'),
      pipeline: sinon.stub(),
      pipelineOptions: sinon.stub(),
      dependencies: sinon.stub(),
    });
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
});
