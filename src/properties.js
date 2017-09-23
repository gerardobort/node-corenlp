/**
 * Class representing a Properties set.
 */
export default class Properties {
  /**
   * Create an Properties
   * @param {Object} props
   */
  constructor(props) {
    this._props = { ...props };
  }

  /**
   * Property setter
   * @param {string} name - the property name
   * @param {*} value - the property value
   */
  setProperty(name, value) {
    this._props[name] = value;
  }

  /**
   * Property getter
   * @param {string} name - the property name
   * @param {*} default - the defaut value to return if not set
   * @returns {*} value - the property value
   */
  getProperty(name, defaultValue = undefined) {
    if (typeof this._props[name] !== 'undefined') {
      return this._props[name];
    }
    return defaultValue;
  }

  /**
   * Returns an Object map of the given properties
   * @returns {Object} properties - the properties object
   */
  getProperties() {
    return { ...this._props };
  }

  /**
   * Returns a JSON object of the given properties
   * @returns {Object} json - the properties object
   */
  toJson() {
    return { ...this._props };
  }

  /**
   * Returns a properties file-like string of the given properties
   * @returns {string} properties - the properties content
   */
  toPropertiessFileContent() {
    return Object.keys(this._props)
      .map(propName => `${propName} = ${this._props[propName]}`)
      .join('\n');
  }
}

