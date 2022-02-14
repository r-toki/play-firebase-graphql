type ExtractPathParams<T> = string extends T
  ? Record<string, string>
  : T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? { [k in Param | keyof ExtractPathParams<Rest>]: string }
  : T extends `${infer _Start}:${infer Param}`
  ? { [k in Param]: string }
  : void;

export const createPath =
  <T extends string>(path: T) =>
  (params: ExtractPathParams<T>) => {
    let res: string = path;
    if (params) {
      for (const key of Object.keys(params)) {
        // @ts-ignore
        res = res.replace(`:${key}`, params[key]);
      }
    }
    return res;
  };
