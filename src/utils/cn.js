/**
 * cn
 * Combina clases condicionalmente, ignorando valores falsy.
 * Uso: cn("base", condicion && "extra", otraCondicion ? "a" : "b")
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
