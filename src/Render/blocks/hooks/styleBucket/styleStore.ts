const styleMap = new Map<string, string>();

function notify() {
  document.dispatchEvent(new Event('addifect-style-update'));
}

export function addStyleCSR(id: string, css: string) {
  styleMap.set(id, css);
  notify();
}

export function removeStyleCSR(id: string) {
  styleMap.delete(id);
  notify();
}

export function getAllStylesCSR() {
  return Array.from(styleMap.values()).join('\n');
}

export function subscribe(callback: () => void) {
  document.addEventListener('addifect-style-update', callback);
  return () => document.removeEventListener('addifect-style-update', callback);
}
