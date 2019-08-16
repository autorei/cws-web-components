/* eslint-env jest */

import formatUrl from './format-url'

describe('formatUrl', () => {
  it('returns empty string for no url defined', () => {
    expect(formatUrl(undefined)).toEqual('')
  })

  it('returns exacly the same url when it is valid url', () => {
    expect(formatUrl('https://google.com')).toEqual('https://google.com')
    expect(formatUrl('www.google.com')).toEqual('www.google.com')
    expect(formatUrl('//google.com')).toEqual('//google.com')
  })

  it('returns exacly the same url when it is custom protocol', () => {
    expect(formatUrl('tel:5543999223344')).toEqual('tel:5543999223344')
    expect(formatUrl('mailto:sample@mail.com')).toEqual('mailto:sample@mail.com')
  })

  it('returns formatated url when it is only path url', () => {
    expect(formatUrl('/foo/bar')).toEqual(`${window.location.origin}/foo/bar`)
    expect(formatUrl('/foo/bar?cache=true')).toEqual(`${window.location.origin}/foo/bar?cache=true`)
  })
})
