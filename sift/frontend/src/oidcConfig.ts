export const oidcConfig = {
    authority: "https://us-east-2_4u3HgpaMD.auth.us-east-2.amazoncognito.com",
    client_id: "2ve29s1o0gihe71psda6n95ljh",
    redirect_uri: window.location.origin + "/callback",
    response_type: "code",
    scope: "openid profile email",
    post_logout_redirect_uri: window.location.origin + "/",
  };
  