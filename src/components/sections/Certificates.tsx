"use client";

import { Award, Maximize2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { certificates } from "@/data/certificates";
import type { Certificate } from "@/types";
import { isConfigured } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { DevHint, Reveal } from "@/components/ui/Primitives";

/** Shown until a real certificate image is added. Styled like a framed certificate. */
function CertificatePlaceholder({ cert }: { cert: Certificate }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/60 p-3">
      <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-double border-blue-200/80 px-5 text-center">
        <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/25">
          <Award className="size-5" aria-hidden />
        </span>
        <p className="mt-3 text-[10px] font-semibold tracking-[0.25em] text-blue-700/70 uppercase">Certificate</p>
        <p className="mt-1 line-clamp-2 text-sm font-semibold text-fg/80">{cert.title}</p>
        <p className="mt-2 text-[11px] text-subtle">Image coming soon</p>
      </div>
    </div>
  );
}

export function Certificates() {
  const [open, setOpen] = useState<Certificate | null>(null);
  const missing = certificates.some((c) => !isConfigured(c.image));

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-title"
      className="border-y border-white/70 bg-gradient-to-b from-white/45 to-blue-50/40 py-14 backdrop-blur-sm md:py-16"
    >
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <Award className="size-3.5" aria-hidden />
              {certificates.length} certificates
            </p>
            <h2 id="certificates-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
              Certificates
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              Certificates from my studies and innovation competitions. Click any certificate to view it in full.
            </p>
          </div>
        </div>

        <Reveal>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((c) => {
              const has = isConfigured(c.image);
              const frame = (
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white shadow-lg ring-1 shadow-blue-900/10 ring-slate-900/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-blue-900/15">
                  {has ? (
                    <>
                      <Image
                        src={c.image}
                        alt={`${c.title} certificate`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <span className="absolute right-2.5 bottom-2.5 grid size-8 place-items-center rounded-lg bg-white/90 text-fg opacity-0 shadow transition-opacity group-hover:opacity-100">
                        <Maximize2 className="size-4" aria-hidden />
                      </span>
                    </>
                  ) : (
                    <CertificatePlaceholder cert={c} />
                  )}
                </div>
              );
              const caption = (
                <div className="mt-4 text-left">
                  <p className="font-semibold tracking-tight">{c.title}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {c.issuer}
                    {c.year && ` · ${c.year}`}
                  </p>
                </div>
              );
              return (
                <li key={c.title}>
                  {has ? (
                    <button
                      type="button"
                      onClick={() => setOpen(c)}
                      aria-haspopup="dialog"
                      aria-label={`View ${c.title} certificate`}
                      className="group block w-full cursor-zoom-in"
                    >
                      {frame}
                      {caption}
                    </button>
                  ) : (
                    <div className="group">
                      {frame}
                      {caption}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        {missing && (
          <DevHint className="mt-6">
            Put certificate images in public/images/certificates/ and set `image` in src/data/certificates.ts
          </DevHint>
        )}
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} labelledBy="certificate-title" wide>
        {open && (
          <div className="p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white">
              <Image src={open.image} alt={`${open.title} certificate`} fill sizes="896px" className="object-contain" />
            </div>
            <div className="p-4">
              <h3 id="certificate-title" className="font-semibold">
                {open.title}
              </h3>
              <p className="text-sm text-muted">
                {open.issuer}
                {open.year && ` · ${open.year}`}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
