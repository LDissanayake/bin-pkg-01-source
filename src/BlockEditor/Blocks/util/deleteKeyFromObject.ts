type AnyObject = Record<string, Record<string, any>>;

function deleteKeyFromObject(obj: AnyObject, keyToDelete: string) {
  Object.values(obj).forEach(inner => {
    if (keyToDelete in inner) {
      delete inner[keyToDelete];
    }
  });
}

export default deleteKeyFromObject