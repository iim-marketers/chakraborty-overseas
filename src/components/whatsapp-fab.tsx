"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export function WhatsAppFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    const id = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <a
      href={`https://wa.me/${site.contact.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Message Chakraborty Overseas on WhatsApp"
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-ink px-4 py-3.5 text-ivory shadow-[var(--shadow-lift)] transition-all duration-300 hover:bg-carbon ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon size={17} className="text-gold-light" />
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em]">WhatsApp</span>
    </a>
  );
}
