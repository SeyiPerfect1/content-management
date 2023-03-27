interface loginInterface {
  email: string;
  password: string;
}

interface param {
  confirmationCode: string
}

interface forgotPassword {
  email: string
}

export {
    loginInterface,
    param,
    forgotPassword
}

