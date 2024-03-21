declare module 'react-native-config' {
  interface Env {
    ENV: 'dev' | 'prod' | 'stage';
    API_URL: string;
  }

  const Config: Env;

  // eslint-disable-next-line import/no-default-export
  export default Config;
}
