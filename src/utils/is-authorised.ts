export const isAuthorised = (userRole: string, allowedRoles: string[]) => {
  return allowedRoles.includes(userRole) ? true : false;
};