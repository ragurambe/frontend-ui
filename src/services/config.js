export function getEnv(key) {
  if (window.process && window.process.env) {
    return window.process.env[key];
  }
  switch (key) {
    case "API_BASE":
      return process.env.API_BASE;
    default:
      return "";
  }
}
