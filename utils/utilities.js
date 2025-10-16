export function isArrayLike(arrayLike){
  return (
    arrayLike != null &&
    typeof arrayLike[Symbol.iterator] === "function" &&
    typeof arrayLike.length === "number" &&
    typeof arrayLike !== "string"
  );
}
