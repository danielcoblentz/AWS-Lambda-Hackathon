// authService.ts
const COGNITO_REGION = import.meta.env.VITE_COGNITO_REGION;
const COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;
const COGNITO_ENDPOINT = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/`;

export async function loginWithCognito(username: string, password: string) {
  const res = await fetch(COGNITO_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-amz-json-1.1",
      "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
    },
    body: JSON.stringify({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    }),
  });

  const data = await res.json();
  if (data.AuthenticationResult?.IdToken) {
    localStorage.setItem("idToken", data.AuthenticationResult.IdToken);
    return data.AuthenticationResult.IdToken;
  } else {
    throw new Error(data.message || "Authentication failed");
  }
}
