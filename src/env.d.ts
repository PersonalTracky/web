declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_REACT_APP_ACCESS_ID: string;
    NEXT_PUBLIC_REACT_APP_ACCESS_KEY: string;
    NEXT_PUBLIC_REACT_APP_BUCKET_NAME: string;
    NEXT_PUBLIC_REACT_APP_DIR_NAME: string;
    NEXT_PUBLIC_REACT_APP_REGION: string;
    NEXT_PUBLIC_DEFAULT_IMAGE_URL: string;
    NEXT_PUBLIC_DEFAULT_API_URL: string;
    PORT: string;
  }
}