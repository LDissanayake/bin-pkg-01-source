type RafCallback = (now: number) => void;

let callbacks: RafCallback[] = [];

function loop(now: number) {
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i](now);
  }
  requestAnimationFrame(loop);
}

export function addRafCallback(cb: RafCallback) {
  if (!callbacks.includes(cb)) callbacks.push(cb);
  if (callbacks.length === 1) requestAnimationFrame(loop);
}

export function removeRafCallback(cb: RafCallback) {
  callbacks = callbacks.filter(fn => fn !== cb);
}
