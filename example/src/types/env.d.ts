declare module 'react-native-config' {
  interface Env {
    ENV: 'dev' | 'prod' | 'stage';
    API_URL: string;
  }

  const Config: Env;

  export default Config;
}
