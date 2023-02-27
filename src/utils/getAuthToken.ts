import { Cookies } from "react-cookie";

type authToken = {
  token: string;
};

const getAuthTokenFromCookies = (): authToken => {
  const cookies: Cookies = new Cookies();
  const autToken: authToken = cookies.get("JWT");
  return autToken;
};
export default getAuthTokenFromCookies;
