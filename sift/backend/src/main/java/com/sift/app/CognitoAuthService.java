import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.model.GetUserRequest;
import com.amazonaws.services.cognitoidp.model.GetUserResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CognitoAuthService {

  @Value("${aws.cognito.userPoolId}")
  private String userPoolId;

  @Value("${aws.cognito.clientId}")
  private String clientId;

  private final AWSCognitoIdentityProvider cognitoClient;

  public CognitoAuthService(AWSCognitoIdentityProvider cognitoClient) {
      this.cognitoClient = cognitoClient;
  }

  public boolean validateToken(String token) {
    try {
      DecodedJWT decodedJWT = JWT.decode(token);
      JWTVerifier verifier = JWT.require(Algorithm.HMAC256("YOUR_SECRET_KEY")).build();
      verifier.verify(decodedJWT);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  public GetUserResult getUserInfo(String accessToken) {
      GetUserRequest getUserRequest = new GetUserRequest().withAccessToken(accessToken);
      return cognitoClient.getUser(getUserRequest);
  }
}
