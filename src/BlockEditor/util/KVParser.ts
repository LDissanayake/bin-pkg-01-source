const KVParser = {
  /**
   * Converts a semicolon-separated string into an object.
   * @param {string} str - Format: "key=value;key2=value2"
   * @returns {Object}
   */
  parse(str) {
    const obj = {};
    const pairs = str.split(';');
    
    for (let i = 0; i < pairs.length; i++) {
      const [key, val] = pairs[i].split('=');
      if (key) obj[key] = val;
    }
    
    return obj;
  },

  /**
   * Converts an object into a semicolon-separated string.
   * @param {Object} obj
   * @returns {string}
   */
  stringify(obj) {
    return Object.entries(obj)
      .map(([key, val]) => `${key}=${val}`)
      .join(';');
  }
};

export default KVParser;