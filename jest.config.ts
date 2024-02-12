import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  rootDir: '.',
  testMatch: ['<rootDir>/src/tests/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};

export default config;
