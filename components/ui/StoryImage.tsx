import Image from "next/image";
import PlaceholderArt, { type ArtKind } from "@/components/visuals/PlaceholderArt";

type Props = {
  /** When the client supplies photography, pass its /public path here. */
  src?: string;
  alt: string;
  art: ArtKind;
  uid: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Black-and-white, high-contrast image slot.
 * Real photos get next/image (AVIF/WebP, lazy) plus the same grayscale treatment;
 * until then a procedural monochrome scene fills the slot.
 */
export default function StoryImage({ src, alt, art, uid, sizes = "50vw", priority = false, className = "" }: Props) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-ink ${className}`} role="img" aria-label={alt}>
      {src ? (
        <Image src={src} alt="" fill sizes={sizes} priority={priority} className="object-cover grayscale contrast-125" />
      ) : (
        <PlaceholderArt kind={art} uid={uid} className="absolute inset-0 h-full w-full grayscale contrast-125" />
      )}
      {/* icy lighting */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(174,196,226,0.22),transparent_45%,rgba(5,5,5,0.35))] mix-blend-screen" />
    </div>
  );
}
