export const hidePassword = (user: any) => {
  if (!user) return user;

  const { password, ...safeUser } = user;
  return safeUser; // return user without password
};
