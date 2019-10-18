export const LOGIN = "@auth/login";
export const LOGOUT = "@auth/logout";

export interface IUser {
    id: number;
    name: string;
    email: string;
}

export interface IAuthState {
    isLoggedIn: boolean;
    user: IUser;
}
