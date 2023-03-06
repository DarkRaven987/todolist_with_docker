export const AUTH_FORM = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export const passwordRegExp = new RegExp(
  /^(?=.*\d)(?=.*[!@#$%^&*_\-+=])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
);
