const accountVerificationTxt = (token) => {
  return `
  Hi there, 
  <br/>
  <br/>
  Please verify your email by clicking the following link : <a href="http://localhost:5173/verify-email?token=${token}">Verify</a>
  <br/>
  <br/>
  Thanks and regards,
  <br/>
  <strong>Team Woodcart</strong>
  `;
};

export { accountVerificationTxt };
