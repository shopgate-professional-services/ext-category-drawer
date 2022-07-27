const sinon = require('sinon')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const { getCache, setCache } = require('../../lib/cache')

chai.use(chaiAsPromised)

const { assert } = chai

describe('Cache', () => {
  let mockedGetReturnValue = {
    data: null,
    createdAt: null
  }

  const storage = {
    get: sinon.stub().returns(mockedGetReturnValue),
    set: sinon.spy()
  }

  describe('getCache', () => {
    it('should return cached value when it is valid', async () => {
      storage.get.returns({
        data: 1,
        createdAt: Date.now()
      })
      const result = await getCache(storage, 'foo', 100)
      assert(result === 1, `${result}`)
    })

    it('should return null when cached value is invalid', async () => {
      storage.get.returns({
        data: 1,
        createdAt: Date.now()
      })

      const result = await getCache(storage, 'foo', 0)
      assert(result === null, `${result}`)
    })

    it('should return null when there is no cached value', async () => {
      storage.get.returns(null)
      const result = await getCache(storage, 'foo', 1000)
      assert(result === null, `${result}`)
    })

    it('should return null when cached value is undefined', async () => {
      storage.get.returns(undefined)
      const result = await getCache(storage, 'foo', 1000)
      assert(result === null, `${result}`)
    })
  })

  describe('setCache', () => {
    it('should set cache', async () => {
      await setCache(storage, 'foo', 1)
      assert(storage.set.called)
      const [key, data] = storage.set.lastCall.args
      assert(key === 'foo', key)
      assert(data.data === 1)
      assert(typeof data.createdAt === 'number')
    })

    it('should throw when giving invalid value to cache', async () => {
      assert.isRejected(setCache(storage, 'foo'))
      assert.isRejected(setCache(storage, 'foo', ''))
      assert.isRejected(setCache(storage, 'foo', null))
    })
  })
})
