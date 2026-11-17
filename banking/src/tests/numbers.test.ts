import { describe, it, expect } from 'vitest'
import { formatCurrency, flt } from '@/lib/numbers'

describe('formatCurrency', () => {
  it('should format zero value correctly', () => {
    expect(formatCurrency(0)).toBe('0.00')
  })

  it('should format positive numbers with USD currency', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('USD 1,234.56')
  })

  it('should format negative numbers correctly', () => {
    expect(formatCurrency(-1234.56, 'USD')).toBe('USD -1,234.56')
  })

  it('should handle custom decimal places', () => {
    expect(formatCurrency(1234.5, 'USD', 0)).toBe('USD 1,234')
    expect(formatCurrency(1234.567, 'USD', 3)).toBe('USD 1,234.567')
  })

  it('should handle undefined values', () => {
    expect(formatCurrency(undefined)).toBe('0.00')
  })
})

describe('flt', () => {
  it('should parse string numbers to float', () => {
    expect(flt('123.45')).toBe(123.45)
  })

  it('should handle invalid strings', () => {
    expect(flt('invalid')).toBe(0)
  })

  it('should handle null and undefined', () => {
    expect(flt(null)).toBe(0)
    expect(flt(undefined)).toBe(0)
  })

  it('should round to specified precision', () => {
    expect(flt('123.456', 2)).toBe(123.46)
  })
})
