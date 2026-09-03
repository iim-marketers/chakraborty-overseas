import type { Tone } from "@/lib/products";

export function PartArt({
  part,
  tone = "steel",
  className = "",
  alt = "",
  priority = false,
}: {
  part: string;
  tone?: Tone;
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/art/${tone}/${part}.svg`}
      alt={alt}
      width={120}
      height={120}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      aria-hidden={alt === "" ? true : undefined}
    />
  );
}
