declare module 'dom-to-image-more' {
  interface Options {
    bgcolor?: string;
    quality?: number;
    scale?: number;
    width?: number;
    height?: number;
    style?: object;
    filter?: (node: Node) => boolean;
    imagePlaceholder?: string;
  }

  export function toBlob(node: Node, options?: Options): Promise<Blob>;
  export function toPng(node: Node, options?: Options): Promise<string>;
  export function toJpeg(node: Node, options?: Options): Promise<string>;
  export function toSvg(node: Node, options?: Options): Promise<string>;
  export function toPixelData(node: Node, options?: Options): Promise<Uint8ClampedArray>;
}
