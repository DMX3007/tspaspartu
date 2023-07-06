export {}

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        API_HOST: string;
        API_SANITY: string;
        BG_LOGIN: string;
        BG_PWD: string;
      }
    }
  }