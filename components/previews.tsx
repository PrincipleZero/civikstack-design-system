import SectionPreview from "./SectionPreview";
import {
  EasingDemo, RevealDemo, HoverLiftDemo, ImageZoomDemo,
  ColorShiftDemo, MenuOverlayDemo, ChevronDemo, StaggerDemo,
} from "./motion";
import {
  ButtonsDemo, StatusDemo, DropdownDemo, FieldsDemo,
  AlertsDemo, AvatarsDemo, TableDemo, LabelsDemo,
} from "./elements";
import { TileLoop, RowLoop, BarLoop } from "./loops";

/**
 * Built here rather than exported from motion.tsx: a "use client" module can
 * export components across the boundary, but not a map of already-created
 * elements — those arrive undefined on the server.
 */
const ELEMENT_DEMOS: Record<string, React.ReactNode> = {
  "e-buttons": <ButtonsDemo />,
  "e-status": <StatusDemo />,
  "e-dropdown": <DropdownDemo />,
  "e-fields": <FieldsDemo />,
  "e-alerts": <AlertsDemo />,
  "e-avatars": <AvatarsDemo />,
  "e-table": <TableDemo />,
  "e-labels": <LabelsDemo />,
};

const MOTION_DEMOS: Record<string, React.ReactNode> = {
  "m-loop-tile": <TileLoop />,
  "m-loop-row": <RowLoop />,
  "m-loop-bar": <BarLoop />,
  "m-easing": <EasingDemo />,
  "m-reveal": <RevealDemo />,
  "m-hover-lift": <HoverLiftDemo />,
  "m-image-zoom": <ImageZoomDemo />,
  "m-color-shift": <ColorShiftDemo />,
  "m-menu-overlay": <MenuOverlayDemo />,
  "m-chevron": <ChevronDemo />,
  "m-stagger": <StaggerDemo />,
};

/**
 * An artboard. Previews sit inside it so they read as a specimen of the site
 * rather than as part of this page's own layout.
 */
export function Frame({
  children,
  label,
  dark = false,
  pad = true,
}: {
  children: React.ReactNode;
  label?: string;
  dark?: boolean;
  pad?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-black/12">
      <div className="flex items-center gap-1.5 border-b border-black/10 bg-black/[0.035] px-3 py-2">
        <span className="size-2 rounded-full bg-black/15" />
        <span className="size-2 rounded-full bg-black/15" />
        <span className="size-2 rounded-full bg-black/15" />
        <span className="ml-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-black/40">
          {label ?? "preview"}
        </span>
      </div>
      <div className={`${dark ? "bg-black" : "bg-white"} ${pad ? "p-5" : ""}`}>{children}</div>
    </div>
  );
}

/** Stand-in for a photograph — avoids shipping assets into the catalogue. */
function Ph({ className = "", ratio = "aspect-[4/3]" }: { className?: string; ratio?: string }) {
  return (
    <div
      className={`${ratio} w-full bg-gradient-to-br from-stone-300 via-stone-400 to-stone-600 ${className}`}
    />
  );
}

const pill = "inline-block rounded-full px-4 py-2 text-[13px] font-medium";
const mono = "font-mono text-[12px] uppercase tracking-[0.06em]";

/* ------------------------------------------------------------------ */
/* One preview per catalogue entry, using the real components' classes. */
/* ------------------------------------------------------------------ */

export const PREVIEWS: Record<string, React.ReactNode> = {
  /* ---- primitives ---- */
  "news-card": (
    <div className="mx-auto max-w-[300px]">
      <div className="relative overflow-hidden rounded-xl">
        <Ph ratio="aspect-[6/4.4]" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 backdrop-blur-md"
          style={{
            maskImage: "linear-gradient(to top, black 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 55%, transparent 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-white/70">
            White Paper
          </p>
          <h3 className="mt-1 text-[19px] font-medium leading-snug tracking-[-0.01em] text-white">
            Aging in Place
          </h3>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-black/50">
        More people are growing old at home instead of moving into a care home.
      </p>
    </div>
  ),

  "project-card": (
    <div className="mx-auto max-w-[240px]">
      <div className="group relative block overflow-hidden rounded-xl">
        <Ph ratio="aspect-[4/5]" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
          <p className="font-mono text-[13px] text-white/70">Platform</p>
          <h3 className="mt-1 text-[28px] font-medium leading-tight tracking-[-0.03em]">
            CivikAccess
          </h3>
          <span className={`${pill} mt-4 bg-white/10 ring-1 ring-white/25 backdrop-blur`}>
            View Project
          </span>
        </div>
      </div>
    </div>
  ),

  "image-card": (
    <div className="mx-auto max-w-[300px]">
      <div className="overflow-hidden rounded-2xl">
        <Ph />
      </div>
      <div className="mt-5 flex flex-1 flex-col text-black">
        <p className={`${mono} text-black/45`}>The Lab</p>
        <h3 className="mt-1.5 text-[22px] font-medium leading-snug tracking-[-0.01em]">
          Public working sessions
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-black/60">
          Residents, staff and administrators map one real service together.
        </p>
        <div className="mt-4 border-t border-black/10 pt-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-black/40">Goal</p>
          <p className="mt-1 text-[14px] leading-relaxed text-black/70">
            A fact-checked Brief within two weeks.
          </p>
        </div>
        <div className="mt-auto pt-5">
          <span className={`${pill} bg-black/5 text-black`}>See the Lab</span>
        </div>
      </div>
    </div>
  ),

  "card-carousel": (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-200/50 via-white to-sky-200/50 p-5">
      <div className="flex gap-3">
        {["Map", "Standard", "Maintenance"].map((t) => (
          <div key={t}
            className="w-1/3 shrink-0 rounded-xl bg-white/60 p-4 ring-1 ring-black/10 backdrop-blur">
            <p className={`${mono} text-black/45`}>0{["Map", "Standard", "Maintenance"].indexOf(t) + 1}</p>
            <p className="mt-1 text-[15px] font-medium">{t}</p>
            <p className="mt-1 text-[12.5px] leading-snug text-black/55">
              A short line of supporting copy.
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center font-mono text-[10.5px] uppercase tracking-[0.1em] text-black/35">
        the warm/cool wash is load-bearing
      </p>
    </div>
  ),

  "layer-diagram": (
    <div className="space-y-1.5">
      {["Tools", "Maintenance", "A standard", "A map"].map((l, i) => (
        <div key={l}
          className="flex items-center justify-between rounded-lg px-4 py-3 ring-1 ring-black/10"
          style={{ background: `rgba(0,0,0,${0.03 + i * 0.03})` }}>
          <span className="text-[14px] font-medium">{l}</span>
          <span className="font-mono text-[11px] text-black/40">0{4 - i}</span>
        </div>
      ))}
    </div>
  ),

  nav: (
    <div className="rounded-lg border-b border-black/10 bg-white/85 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-5">
        <span className="rounded-md bg-black px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white">
          CivikStack
        </span>
        {["Focus", "The Lab", "Research", "Safeguarding", "About"].map((l) => (
          <span key={l} className="text-[13px] text-black/60">{l}</span>
        ))}
        <span className={`${pill} ml-auto bg-black text-[12px] text-white`}>Partner with us</span>
      </div>
    </div>
  ),

  footer: (
    <div className="rounded-lg bg-black p-6 text-white">
      <p className="text-[15px] font-medium">CivikStack Foundation</p>
      <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-white/55">
        A public-interest AI research and development foundation.
      </p>
      <div className="mt-3 flex max-w-sm gap-2">
        <span className="min-w-0 flex-1 rounded-full bg-white/5 px-4 py-2.5 text-[13px] text-white/40 ring-1 ring-white/15">
          Email
        </span>
        <span className="rounded-full bg-white px-4 py-2.5 text-[13px] font-medium text-black">
          Sign up
        </span>
      </div>
    </div>
  ),

  "contact-form": (
    <div className="mx-auto flex max-w-sm flex-col gap-3">
      {["Name", "Email", "Organization (optional)"].map((p) => (
        <span key={p}
          className="rounded-lg bg-black/[0.04] px-4 py-3.5 text-[14px] text-black/40 ring-1 ring-black/10">
          {p}
        </span>
      ))}
      <span className="rounded-lg bg-black/[0.04] px-4 py-3.5 text-[14px] text-black/40 ring-1 ring-black/10">
        I am a…
      </span>
      <span className="h-24 rounded-lg bg-black/[0.04] px-4 py-3.5 text-[14px] text-black/40 ring-1 ring-black/10">
        Message
      </span>
      <span className={`${pill} mt-2 self-start bg-black text-white`}>Send message</span>
    </div>
  ),

  "newsletter-field": (
    <div className="rounded-lg bg-black p-5">
      <div className="flex max-w-sm gap-2">
        <span className="min-w-0 flex-1 rounded-full bg-white/5 px-4 py-2.5 text-[13px] text-white/40 ring-1 ring-white/15">
          Email
        </span>
        <span className="rounded-full bg-white px-4 py-2.5 text-[13px] font-medium text-black">
          Sign up
        </span>
      </div>
    </div>
  ),

  "waitlist-gate": (
    <div className="relative overflow-hidden rounded-xl ring-1 ring-black/10">
      <div className="space-y-2 p-5 blur-[3px]">
        {[95, 88, 92, 70].map((w, i) => (
          <div key={i} className="h-2.5 rounded bg-black/15" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/50">
        <div className="rounded-xl bg-white px-5 py-4 text-center ring-1 ring-black/10">
          <p className="text-[14px] font-medium">In development</p>
          <p className="mt-0.5 text-[12px] text-black/50">Blur is cosmetic, not access control</p>
        </div>
      </div>
    </div>
  ),

  motion: (
    <div className="space-y-2">
      {[0, 1, 2].map((i) => (
        <div key={i}
          className="rounded-lg bg-black/[0.04] px-4 py-3 ring-1 ring-black/10"
          style={{ opacity: 1 - i * 0.3, transform: `translateY(${i * 3}px)` }}>
          <div className="h-2.5 w-1/2 rounded bg-black/20" />
        </div>
      ))}
      <p className="pt-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-black/35">
        reveal — fades up on scroll
      </p>
    </div>
  ),
};

/** Sections render from their real class string. */
export function previewFor(slug: string, classes?: string): React.ReactNode {
  if (ELEMENT_DEMOS[slug]) return ELEMENT_DEMOS[slug];
  if (MOTION_DEMOS[slug]) return MOTION_DEMOS[slug];
  if (PREVIEWS[slug]) return PREVIEWS[slug];
  if (classes) return <SectionPreview classes={classes} slug={slug} />;
  return (
    <p className="py-6 text-center text-[13px] text-black/40">
      No visual specimen — see the code view.
    </p>
  );
}
