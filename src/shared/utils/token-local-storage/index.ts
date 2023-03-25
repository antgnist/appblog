interface IDecodedPayload {
  id: string;
  username: string;
  exp: number;
  iat: number;
}

interface ITokenObj {
  token: string;
  username: string;
  iat: number;
  exp: number;
}

export function setTokenLocalStorage(
  token: string,
  decodedPayload: IDecodedPayload,
) {
  const localObj = {
    token,
    username: decodedPayload?.username,
    iat: decodedPayload?.iat,
    exp: decodedPayload?.exp,
  };
  localStorage.setItem('blogTokenLoggedIn', JSON.stringify(localObj));
}

export function getTokenLocalStorage() {
  const json = localStorage.getItem('blogTokenLoggedIn');
  if (json) {
    try {
      const tokenObj: ITokenObj = JSON.parse(json);
      return tokenObj;
    } catch (error) {
      return null;
    }
  } else return null;
}

export function clearTokenLocalStorage() {
  localStorage.removeItem('blogTokenLoggedIn');
}

export function updateTokenLocalStorage() {}

export function checkTokenExpLocalStorage() {}
