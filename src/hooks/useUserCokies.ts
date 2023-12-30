import Cookies from "universal-cookie";

export function useUserCookies()  {
    const cookies = new Cookies();
    const token: string | null = cookies.get("jwt");
    
    return token;
}
