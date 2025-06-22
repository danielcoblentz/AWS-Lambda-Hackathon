// src/api/config.ts
export const COGNITO_AUTH_CONFIG = {
    authority: process.env.REACT_APP_AUTHORITY,
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_REDIRECT_URL,
    response_type: process.env.REACT_APP_RESPONSE_TYPE,
    scope: process.env.REACT_APP_RESPONSE_SCOPE,
  };
  