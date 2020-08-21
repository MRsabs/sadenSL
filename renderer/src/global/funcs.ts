interface FormatOpitions {
  locale?: string;
  options?: Intl.NumberFormatOptions;
}
export function numberWithCommas(
  x: number | string,
  opt: FormatOpitions = { locale: 'en-US', options: { style: 'decimal' } }
): string {
  return Number(x).toLocaleString(opt.locale, { ...opt.options });
}

export function parseNumber(input: string): number {
  return Number(input.replace(/,/g, ''));
}
