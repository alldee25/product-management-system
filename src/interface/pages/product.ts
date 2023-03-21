export interface ProductColorInterFace {
  [index: number]: {
    color: string;
    fileList: FileList[];
  };
}
export interface FileList {}
export interface ProductListInterface {
  id: string;
  name: string;
  price: number;
}
export interface ThumbnailFileInterface {
  id: string;
  name: string;
  source: string;
}
