import { useAuth } from "react-oidc-context";

export default function SignIn() {
  const auth = useAuth();
  return (
    <button onClick={() => auth.signinRedirect()}>
      Sign In
    </button>
  );
}
