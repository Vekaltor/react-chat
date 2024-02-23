import {Cookies} from "react-cookie";

type authToken = {
  token: string;
};

const getAuthTokenFromCookies = (): authToken => {
  const cookies: Cookies = new Cookies();
  return cookies.get("JWT");
};
export default getAuthTokenFromCookies;
