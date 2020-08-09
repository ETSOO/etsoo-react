/**
 * Change password model
 */
export interface ChangePasswordModel {
    /**
     * Current (old) password
     */
    oldPassword: string;

    /**
     * New password
     */
    newPassword: string;
}
