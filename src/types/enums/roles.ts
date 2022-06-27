import { Role } from "graphql/generated";

export enum Roles {
  admin = "ADMIN",
  user = "USER",
}

export const RoleValues = {
  [Role.SchemeAdmin]: "Scheme Admin",
  [Role.ContentAdmin]: "Content Admin",
  [Role.User]: "User",
  [Role.ShopsafeAdmin]: "Shopsafe Admin",
} as const;
