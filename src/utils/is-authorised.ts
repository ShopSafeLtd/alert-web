const isAuthorised = (userRole: string, allowedRoles: string[]): boolean =>
  !!allowedRoles.includes(userRole);
export default isAuthorised;
