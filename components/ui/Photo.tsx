import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  /** only for the single above-the-fold hero image */
  preload?: boolean;
  className?: string;
  imgClassName?: string;
};

/**
 * Black-and-white, high-contrast image slot. The treatment is baked into the
 * source files (no runtime CSS filters / blend modes — those repaint on scroll).
 * width/height reserve space (no layout shift); everything but the hero is lazy.
 * Swap /public/images/* for real photography at the same ratio.
 */
export default function Photo({ src, alt, width, height, sizes, preload = false, className = "", imgClassName = "" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-ink ${className}`} data-img={preload ? undefined : ""}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        preload={preload}
        loading={preload ? undefined : "lazy"}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
