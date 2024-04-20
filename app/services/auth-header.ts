export default function authHeader() {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  if (user && user.accessToken) {
    return { 'Authorization': 'Bearer ' + user.accessToken };
  } else {
    return {};  // Return an empty object if there is no token
  }
}

