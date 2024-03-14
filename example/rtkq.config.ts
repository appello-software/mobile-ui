// eslint-disable-next-line import/no-extraneous-dependencies
import { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: '', // Put the link to your schema file here
  apiFile: './src/services/rtkQuery/index.ts',
  apiImport: 'rtkQuery',
  outputFiles: {
    'user.ts': {
      filterEndpoints: [/users|auth/i],
    },
  },
  exportName: 'api',
  hooks: true,
  useEnumType: true,
};

export default config;
