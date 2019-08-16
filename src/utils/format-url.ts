export default function(url: string) {
  if (!url) {
    return ''
  }

  if (/www|http/.test(url) || url.indexOf('//') === 0) {
    return url
  }

  if (url.indexOf('/') === 0) {
    return window.location.origin + url
  }

  return url
}
