const assert = require('assert')
const { describe, it } = require('mocha')
const {
  productHasPropertyWithValue,
  productHasOneOfMultiplePropertiesWithValue,
  hasValue
} = require('../../helpers')

const mockFillerProductProperties = [
  {
    label: 'fillerLabelOne',
    value: 'fillerValueOne'
  },
  {
    label: 'fillerLabelTwo',
    value: 'fillerValueTwo'
  },
  {
    label: 'fillerLabelThree',
    value: 'fillerValueThree'
  }
]

describe('helpers', () => {
  describe('productHasPropertyWithValue', () => {
    it('should find property', () => {
      const commonLabel = 'propertyLabel'
      const commonValue = 'propertyValue'
      const mockProduct = {
        properties: [
          ...mockFillerProductProperties,
          {
            label: commonLabel,
            value: commonValue
          }
        ]
      }

      assert(productHasPropertyWithValue(commonLabel, commonValue, mockProduct))
    })

    it('should not find property', () => {
      const commonLabel = 'propertyLabel'
      const commonValue = 'propertyValue'
      const mockProduct = {
        properties: [
          ...mockFillerProductProperties
        ]
      }

      assert(!productHasPropertyWithValue(commonLabel, commonValue, mockProduct))
    })

    it('should find property in case insensitive way', () => {
      const commonLabel = 'propertyLabel'
      const commonValue = 'propertyValue'
      const mockProduct = {
        properties: [
          ...mockFillerProductProperties,
          {
            label: commonLabel.toUpperCase(),
            value: commonValue.toUpperCase()
          }
        ]
      }
      assert(productHasPropertyWithValue(commonLabel.toLowerCase(), commonValue.toLowerCase(), mockProduct))
    })

    it('should find property even when mismatch leading or trailing space way', () => {
      const commonLabel = 'propertyLabel'
      const commonValue = 'propertyValue'
      const mockProduct = {
        properties: [
          ...mockFillerProductProperties,
          {
            label: commonLabel,
            value: commonValue
          }
        ]
      }
      assert(productHasPropertyWithValue(`${commonLabel} `, ` ${commonValue}`, mockProduct))
    })

    it('should return false if product has no properties', () => {
      const commonLabel = 'propertyLabel'
      const commonValue = 'propertyValue'
      const mockProduct = {}
      assert(!productHasPropertyWithValue(commonLabel, commonValue, mockProduct))
    })

    it('should not error if product has malformed a malformed property', () => {
      const commonLabel = 'propertyLabel'
      const commonValue = 'propertyValue'
      const mockProduct = {
        properties: [
          ...mockFillerProductProperties,
          null
        ]
      }
      assert(!productHasPropertyWithValue(commonLabel, commonValue, mockProduct))
    })
  })

  describe('productHasOneOfMultiplePropertiesWithValue', () => {
    const mockTriggerPropFillers = [
      {
        label: 'fillerLabelA',
        value: 'fillerValueA'
      },
      {
        label: 'fillerLabelB',
        value: 'fillerValueB'
      },
      {
        label: 'fillerLabelC',
        value: 'fillerValueC'
      }
    ]
    it('should find prop', () => {
      const commonLabel = 'propertyLabel'
      const commonValue = 'propertyValue'
      const mockProduct = {
        properties: [
          ...mockFillerProductProperties,
          {
            label: commonLabel,
            value: commonValue
          }
        ]
      }
      const mockTriggerPros = [
        ...mockTriggerPropFillers,
        {
          label: commonLabel,
          value: commonValue
        }
      ]
      assert(productHasOneOfMultiplePropertiesWithValue(mockTriggerPros, mockProduct))
    })

    it('should not find prop', () => {
      const commonLabel = 'propertyLabel'
      const commonValue = 'propertyValue'
      const mockProduct = {
        properties: [
          ...mockFillerProductProperties,
          {
            label: commonLabel,
            value: 'mismatchValue'
          }
        ]
      }
      const mockTriggerPros = [
        ...mockTriggerPropFillers,
        {
          label: commonLabel,
          value: commonValue
        }
      ]
      assert(!productHasOneOfMultiplePropertiesWithValue(mockTriggerPros, mockProduct))
    })
  })
  describe('hasValue', () => {
    it('Should return false when subject is undefined', () => {
      assert(!hasValue(undefined))
    })

    it('Should return false when subject is null', () => {
      assert(!hasValue(null))
    })

    it('Should return false when subject is empty string', () => {
      assert(!hasValue(''))
    })

    it('Should return true when subject is 0', () => {
      assert(hasValue(0))
    })

    it('Should return true when subject is "0"', () => {
      assert(hasValue('0'))
    })

    it('Should return true when subject is true', () => {
      assert(hasValue(true))
    })

    it('Should return true when subject is false', () => {
      assert(hasValue(false))
    })

    it('Should return true when subject is number greater other than 0', () => {
      assert(hasValue(10))
    })

    it('Should return true when subject is not empty string', () => {
      assert(hasValue('hello'))
    })

    it('Should return true when subject is array', () => {
      assert(hasValue([]))
    })

    it('Should return true when subject is object', () => {
      assert(hasValue({}))
    })
  })
})
