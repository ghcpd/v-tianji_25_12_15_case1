import { expect } from 'vitest'
// attach vitest expect to globalThis for jest-dom compatibility
;(globalThis as any).expect = expect
// dynamically import jest-dom after expect is available
void import('@testing-library/jest-dom')

