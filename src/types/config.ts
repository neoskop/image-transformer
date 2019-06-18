export interface ImageTransformerOpts {
  source: string;
  destination: string;
  sizes: Size[];
  formats?: FormatConfig;
  traced?: {
    enabled: boolean;
    color: string;
    width: number;
  };
}

export interface Size {
  width?: number;
  height?: number;
  suffix: string;
}

export interface FormatConfig {
  webp: {
    quality: number;
  };
  jpg: {
    quality: number;
  };
  svg: {
    quality: number;
  };
  png: {
    quality: number;
  };
}
