import Immutable from 'seamless-immutable'

const convertToJs = state => state.asMutable({ deep: true })

const fromImmutable = raw => {
  if (Immutable.isImmutable(raw)) {
    return convertToJs(raw)
  }
  return raw
}
const toImmutable = raw => Immutable(raw)

export default {
  out: state => toImmutable(state),
  in: raw => fromImmutable(raw),
}
