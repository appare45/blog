import NextImage, { ImageProps as NextImageProps } from "next/image";

export function Image(props: NextImageProps) {
  return <NextImage {...props} className="max-w-full block" />;
}
