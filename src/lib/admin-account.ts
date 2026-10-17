export const designatedAdminEmail = "admin@haque.com";
export function isDesignatedAdmin(email: string) {
  return email.trim().toLowerCase() === designatedAdminEmail;
}