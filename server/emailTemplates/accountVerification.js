const accountVerificationTxt = (token) => {
  return `
  Hi there, 
  <br/>
  <br/>
  Please verify your email by clicking the following link : <a href="http://localhost:5173/verify-email/${token}">Verify</a>
  <br/>
  <br/>
  Thanks and regards,
  <br/>
  <strong>Team Woodcart</strong>
  `;
};

const passwordResetTxt = (token) => {
  return `
  Hi there, 
  <br/>
  <br/>
  Please reset your account password by clicking the following link : <a href="http://localhost:5173/reset-password?authToken=${token}">Reset</a>
  <br/>
  <br/>
  Thanks and regards,
  <br/>
  <strong>Team Woodcart</strong>
  `;
};

export { accountVerificationTxt, passwordResetTxt };
