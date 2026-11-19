import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ivory py-28 text-ink">
      <div className="blueprint-light absolute inset-0" aria-hidden />
      <div className="shell relative max-w-2xl">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-6 text-[clamp(2.2rem,5vw,3.6rem)] font-semibold tracking-[-0.03em]">
          That thread doesn&rsquo;t engage.
        </h1>
        <p className="mt-5 text-ink/70">
          The page you asked for is not here. The product ranges, the catalogue and the enquiry form
          all still are.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/products" className="btn btn-gold">
            View products
          </Link>
          <Link href="/" className="btn btn-outline btn-arrow-back">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
