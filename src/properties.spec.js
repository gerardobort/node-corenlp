import Properties from './properties';

describe('Properties', () => {
  let props;

  describe('constructor', () => {
    it('should have a constructor method', () => {
      expect(Properties).to.have.property('constructor').that.is.a('function');
    });
  });

  describe('getProperty / setProperty / constructor / getProperties', () => {
    beforeEach(() => {
      props = new Properties({ test: 123, bar: 'foo' });
    });

    it('should allow to get prperties', async () => {
      expect(props.getProperty('test')).to.equal(123);
    });

    it('should allow to get a non-defined property', async () => {
      expect(props.getProperty('test.und')).to.be.undefined;
    });

    it('should allow to get a non-defined property with a default value', async () => {
      expect(props.getProperty('test.und.arr', [])).to.deep.equals([]);
    });

    it('should allow to set prperties', async () => {
      expect(props.getProperty('test')).to.equal(123);
      expect(props.setProperty('test', 321));
      expect(props.getProperty('test')).to.equal(321);
    });

    it('should allow to get all prperties', async () => {
      expect(props.getProperties()).to.deep.equal({
        test: 123,
        bar: 'foo',
      });
    });
  });

  describe('toJSON', () => {
    beforeEach(() => {
      props = new Properties({ test: 123, bar: 'foo' });
    });

    it('should allow to get all prperties', async () => {
      expect(props.toJSON()).to.deep.equal({
        test: 123,
        bar: 'foo',
      });
    });
  });

  describe('toPropertiessFileContent', () => {
    beforeEach(() => {
      props = new Properties({ test: 123, bar: 'foo' });
    });

    it('should allow to get all prperties', async () => {
      expect(props.toPropertiessFileContent()).to.deep.equal('test = 123\nbar = foo');
    });
  });
});
