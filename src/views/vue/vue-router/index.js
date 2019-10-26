const Time =
  window.performance && window.performance.now
    ? window.performance
    : Date

// 保留三位精度的时间小数
function genStateKey () {
  return Time.now().toFixed(3)
}

function getHash () {
  let href = window.location.href
  const index = href.indexOf('#')
  if (index < 0) return ''
  href = href.slice(index + 1)
  const searchIndex = href.indexOf('?')
  if (searchIndex < 0) {
    const hashIndex = href.indexOf('#')
    if (hashIndex > -1) {
      href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex)
    } else href = decodeURI(href)
  } else {
    if (searchIndex > -1) {
      href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex)
    }
  }

  return href
}

const map = {}

export function pushState (url) {
  const history = window.history
  const key = genStateKey()
  history.pushState({ key }, '', url)
  map[key] = url
}

export function listener (vm) {
  window.addEventListener(
    'popstate',
    () => {
      const currentUrl = map[history.state.key]
      vm._myrouterRoot._myrouter = currentUrl
    }
  )
}
