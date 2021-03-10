/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
const { alias, configPaths } = require('react-app-rewire-alias');

module.exports = {
  webpack: (config, env) => {
    alias({
      ...configPaths('tsconfig.paths.json'),
    })(config);

    return config;
  },
  jest: config => {
    config.coverageThreshold = {
      global: {
        branches: 95,
        functions: 95,
        lines: 95,
        statements: 95,
      },
    };
    config.collectCoverageFrom = [
      '!src/service-worker.ts',
      '!src/react-app-env.d.ts',
      '!src/reportWebVitals.ts',
      '!src/serviceWorkerRegistration.ts',
      '!src/index.tsx',
      '!src/App.tsx',
      '!src/routes/**',
      '!src/lib/axios.ts',
      '!src/redux/index.ts',
      '!src/redux/types/**',
    ];
    config.testPathIgnorePatterns = ['/node_modules/', '__mocks__'];
    config.transformIgnorePatterns = ['/node_modules/'];
    config.testMatch = ['**/src/**/*.test.{ts,tsx}'];
    config.moduleNameMapper = {
      '\\.(css|jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>src/__tests__/__mocks__/fileMock.ts',
    };

    return config;
  },
};
