function sizeof(object) {
  if (Buffer.isBuffer(object)) {
    return object.length
  }

  var objectType = typeof (object)
  switch (objectType) {
    case 'string':
      return object.length * ECMA_SIZES.STRING
    case 'boolean':
      return ECMA_SIZES.BOOLEAN
    // 4
    case 'number':
      return ECMA_SIZES.NUMBER
    //8
    case 'object':
      if (Array.isArray(object)) {
        return object.map(sizeof).reduce((acc, curr) => acc + curr, 0)
      } else {
        return sizeOfObject(object)
      }
    default:
      return 0
  }
}

function sizeOfObject(object) {
  if (object == null) {
    return 0
  }

  var bytes = 0
  for (var key in object) {
    if (!Object.hasOwnProperty.call(object, key)) {
      continue
    }

    bytes += sizeof(key)
    try {
      bytes += sizeof(object[key])
    } catch (ex) {
      if (ex instanceof RangeError) {
        // circular reference detected, final result might be incorrect
        // let's be nice and not throw an exception
        bytes = 0
      }
    }
  }

  return bytes
}

const size = sizeOfObject({
  height: 1
})