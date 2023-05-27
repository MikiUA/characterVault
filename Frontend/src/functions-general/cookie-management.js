export function getCookie(key = "") {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
  // return localStorage.getItem(key);
}

export function setCookie(key = "", value = "") {
  if (!key ) return;
  // localStorage.setItem(key,value);  
  const d = new Date();
  d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = key + "=" + value + ";" + expires + ";path=/";
}
