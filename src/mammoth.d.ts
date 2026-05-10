/** Ambient typings: published mammoth package ships lib/index.d.ts but omits "types" in package.json, which breaks some TS/IDE setups. */
declare module 'mammoth' {
  interface Result {
    value: string;
    messages: Array<unknown>;
  }

  interface Mammoth {
    extractRawText(input: { arrayBuffer: ArrayBuffer }): Promise<Result>;
    convertToHtml(input: { arrayBuffer: ArrayBuffer }, options?: object): Promise<Result>;
  }

  const mammoth: Mammoth;
  export = mammoth;
}
