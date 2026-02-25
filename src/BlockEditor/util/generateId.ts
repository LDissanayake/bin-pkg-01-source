import { customAlphabet } from "nanoid";

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz-_";
const gidRaw = customAlphabet(alphabet, 4);
const gidFallback = customAlphabet(alphabet, 5);

export function generateId(existingIds: Set<string>) {
  let tries = 0;
  let id = 'b' + gidRaw();

  while (existingIds.has(id)) {
    tries++;
    id = 'b' + gidRaw();

    // safety cap: after too many retries, expand ID length
    if (tries > 20) {
      id = 'b' + gidFallback(); // 👈 keep prefix
      break;
    }
  }

  return id;
}
