/** Collect authored copy and fixture strings for deterministic font-subset loading. */
export function collectText(...values: unknown[]): string {
  const strings: string[] = [];
  const collect = (value: unknown): void => {
    if (typeof value === 'string') strings.push(value);
    else if (Array.isArray(value)) value.forEach(collect);
    else if (value && typeof value === 'object') Object.values(value).forEach(collect);
  };
  values.forEach(collect);
  return strings.join('');
}
