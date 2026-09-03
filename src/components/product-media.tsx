import Image from "next/image";
import { PartArt } from "@/components/part-art";
import type { Product, Tone } from "@/lib/products";

export function ProductMedia({
  product,
  tone,
  sizes = "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw",
  priority = false,
  className = "",
}: {
  product: Product;
  tone: Tone;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (product.photo) {
    return (
      <Image
        src={product.photo}
        alt={product.name}
        width={900}
        height={900}
        sizes={sizes}
        priority={priority}
        className={`h-full w-full object-contain mix-blend-multiply ${className}`}
      />
    );
  }
  return (
    <PartArt
      part={product.art}
      tone={tone}
      priority={priority}
      className={`h-full w-auto max-w-full object-contain ${className}`}
    />
  );
}
