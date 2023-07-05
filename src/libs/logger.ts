const logs = (process.env.DEBUG || '').split(',');

export function info(...args: any) {
  if (!logs.includes('info')) return;
  console.log(...args);
}

export function warn(...args: any) {
  if (!logs.includes('warn')) return;
  console.warn(...args);
}

export function error(...args: any) {
  if (!logs.includes('error')) return;
  console.error(...args);
}

export function debug(...args) {
  if (!logs.includes('verbose')) return;
  console.dir(args);
}
