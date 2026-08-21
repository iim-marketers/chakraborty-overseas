"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

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
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="text-gold-light">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 01-1.25-4.38c0-4.54 3.7-8.23 8.24-8.23a8.23 8.23 0 010 16.47zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23a7.5 7.5 0 01-1.38-1.72c-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.49-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.19 3.7.59.26 1.04.41 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.17-.47-.29z" />
      </svg>
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em]">WhatsApp</span>
    </a>
  );
}
