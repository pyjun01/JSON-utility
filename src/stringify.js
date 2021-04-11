const stringify = (() => {
  const replaceKey = [[/[\r\n\l]/g, "\\n"], [/"/g, "\\t"]];

  const transferTable = {
    'string': (v) => `"${replaceKey.reduce((acc, curr) => acc.replace(...curr), v)}"`,
    'number': (v) => v.toString(),
    'boolean': (v) => v.toString(),
  }

  const transferValue = (v) => {
    if (typeof v === 'object' && v !== null) { // array or object
      return _stringify(v);
    }

    return transferTable[typeof v]?.(v) ?? null
  }

  const _stringify = (value) => {

    if (value instanceof Array) {
      let str = '';

      for (let i = 0; i < value.length; i++) {
        str += `,${transferValue(value[i])}`;
      }

      return `[${str.substr(1)}]`;
    }

    if (typeof value === 'object' && value !== null) {
      let str = '';

      for (let key in value) {
        str += `,"${key}":${transferValue(value[key])}`;
      }

      return `{${str.substr(1)}}`;
    }

    return transferValue(value);
  }

  return (v) => _stringify(v);
})();

export default stringify;