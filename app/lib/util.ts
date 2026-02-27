export const css = (obj: any) =>
  Object.keys(obj)
    .filter((ent) => obj[ent])
    .join(" ");

type ImageOptions = {
  w?: number;
  h?: number;
};

export const imageUrl = (hash: string, options?: ImageOptions) => {
  const baseUrl = "https://cdn.takeoffgo.com";

  if (options) {
    const qs = Object.keys(options)
      .map((k) =>
        [encodeURIComponent(k), encodeURIComponent((options as any)[k])].join(
          "="
        )
      )
      .join("&");
    return `${baseUrl}/${hash}?${qs}`;
  }

  return `${baseUrl}/${hash}`;
};

export const extractUrlJson = (input: any) => {
  try {
    return JSON.parse(decodeURIComponent(input));
  } catch {
    return null;
  }
};

export const currency = (value: number, currency: string): string => {
  const nf = new Intl.NumberFormat("en-GB", { style: "currency", currency });

  return nf.format(value);
};
