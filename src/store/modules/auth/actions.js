export default {
  login() {},
  async signup(context, payload) {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AAAAJyW2UeE:APA91bG11In0ea-CBRx08XL_WgRZD183Ul6tS_ElKglVFjpDREWY-zz_cyFrP3P_u3QNqe8zKRBWCE0ib3Em4UiF3rzjtfVZ4J4dXmAn-y5AHkmNLRqFCdHK_sDiPyVuhnd2oc6f7adP',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data'
      );
      throw error;
    }

    console.log(responseData);
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
  }
};
