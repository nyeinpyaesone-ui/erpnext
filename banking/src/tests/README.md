# Testing Guide

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests once without watch mode
npm run test:run
```

## Test Structure

Tests are located in `src/tests/` directory:
- `setup.ts` - Global test setup and mocks
- `*.test.ts` - Test files for specific modules

## Writing Tests

```typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from '@/lib/my-module'

describe('myFunction', () => {
  it('should do something', () => {
    expect(myFunction()).toBe('expected')
  })
})
```

## Testing React Components

```typescript
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

it('renders correctly', () => {
  render(<MyComponent />)
  expect(screen.getByText('Hello')).toBeInTheDocument()
})
```

## Coverage Reports

After running `npm run test:coverage`, reports are generated in:
- HTML: `coverage/index.html`
- JSON: `coverage/coverage-final.json`
