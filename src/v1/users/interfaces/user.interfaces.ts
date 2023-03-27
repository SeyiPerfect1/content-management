interface loginInterface {
  email: string;
  password: string;
}

interface resetpasswordparam {
  confirmationCode: string
}

interface forgotPassword {
  email: string
}

interface emailVerificationParam {
  confirmationCode: string
}

interface resetPassword {
  password: string
}

interface userRequest {
  userId: string;
  email: string
}

export {
    loginInterface,
    resetpasswordparam,
    forgotPassword,
    emailVerificationParam,
    resetPassword,
    userRequest
}

