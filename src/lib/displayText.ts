export function getSafeInitial(value?: string, fallback = "?") {
  const trimmedValue = value?.trim();
  if (!trimmedValue) {
    return fallback;
  }

  return trimmedValue.charAt(0);
}
