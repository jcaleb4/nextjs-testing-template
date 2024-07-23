import { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'http://0.0.0.0:3001/documentation/json',
  apiFile: './src/services/api/index.ts',
  apiImport: 'api',
  hooks: true,
  outputFiles: {
    './src/services/api/generated/test.ts': {
      filterEndpoints: [/test/i],
    },
  },
};

export default config;
