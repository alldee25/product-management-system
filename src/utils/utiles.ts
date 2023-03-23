export function isTokenExpired(token: string) {
  if (!token) return;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const { exp } = JSON.parse(jsonPayload);
  var seconds = Date.now() / 1000;
  const expired = seconds > exp;
  return expired;
}
