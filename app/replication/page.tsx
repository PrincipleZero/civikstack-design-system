import { PageTitle, Eyebrow } from "@/components/ui";
import { HeroCascadeReplica, DiagramLoopsReplica, MicroReplica } from "@/components/Replication";

export const metadata = { title: "Replication — Wayfinder" };

/**
 * A capability proof: evaluate a third-party site's motion and reproduce it
 * from measurement. Method and limits are stated on the page because a
 * replication that hides its method is just a claim.
 */
const SPECS = [
  ["Header panel", "clip-path wipe", "inset(0 100% 0 0) → inset(0 0% 0 0)", "1000ms", "cubic-bezier(0.16, 1, 0.3, 1)", "0ms"],
  ["Panel slide", "transform", "translateX(-50px) → 0", "1500ms", "linear(150 stops) — damped spring", "0ms"],
  ["Meta line", "clip-path wipe", "same wipe", "500ms", "cubic-bezier(0.16, 1, 0.3, 1)", "0ms"],
  ["Title", "clip-path wipe", "same wipe", "500ms", "cubic-bezier(0.16, 1, 0.3, 1)", "166.7ms"],
  ["Actions", "clip-path wipe", "same wipe", "500ms", "cubic-bezier(0.16, 1, 0.3, 1)", "333.3ms"],
  ["Diagram tile", "transform loop", "travel 120px · rotate 15° · pop 1.75 @54%", "3600ms ∞", "cubic-bezier(0.6, 0, 0.2, 1)", "—"],
  ["Diagram rows", "opacity + transform loop", "slide −12% and fade, holds included", "3000ms ∞", "cubic-bezier(0.4, 0, 0.2, 1)", "0/450/900ms"],
  ["Diagram bars", "transform loop", "scaleX 0→1 @45%, drain @90%", "2400ms ∞", "cubic-bezier(0.4, 0, 0.4, 1)", "0/120/240/360ms"],
  ["Terminal lines", "opacity", "0 → 1", "200ms", "ease-out", "—"],
  ["Icon colour", "color transition", "muted → full", "160ms", "ease", "—"],
] as const;

export default function ReplicationPage() {
  return (
    <>
      <PageTitle
        kicker="Capability proof · measured 14 Aug 2026"
        title="Replication: motion.dev"
        lede="The homepage's animations, reproduced from runtime measurement rather than by eye. Every duration, easing, delay and keyframe below was captured from the live page; the demos re-implement them in this codebase's own code."
      />

      <section className="mb-12 max-w-3xl rounded-xl bg-black/[0.03] px-5 py-4 ring-1 ring-black/10">
        <Eyebrow>Method — what &ldquo;seeing&rdquo; means here</Eyebrow>
        <p className="mt-2 text-[13.5px] leading-relaxed text-black/65">
          A hook on <code className="font-mono text-[12.5px]">Element.prototype.animate</code> recorded
          every JS-driven animation at creation (keyframes, duration, easing, delay);{" "}
          <code className="font-mono text-[12.5px]">animationstart</code>/<code className="font-mono text-[12.5px]">transitionstart</code>{" "}
          listeners caught the CSS layer; loop keyframes were read verbatim from CSSOM. The spring
          arrived as a 150-stop <code className="font-mono text-[12.5px]">linear()</code> — its stops
          never exceed 1.0, which identifies a critically damped spring with no overshoot.{" "}
          <span className="text-black/50">
            Limits, stated plainly: synthetic events cannot set CSS <code className="font-mono text-[12.5px]">:hover</code>,
            and run-once mount animations must be caught in flight — both were handled, but
            paint-level quality (blur rendering, frame pacing) is outside what instrumentation can see.
          </span>
        </p>
      </section>

      <section className="mb-12">
        <Eyebrow>01 · Hero entrance cascade</Eyebrow>
        <div className="mt-3"><HeroCascadeReplica /></div>
      </section>

      <section className="mb-12">
        <Eyebrow>02 · Diagram loops</Eyebrow>
        <div className="mt-3"><DiagramLoopsReplica /></div>
      </section>

      <section className="mb-12">
        <Eyebrow>03 · Micro layer</Eyebrow>
        <div className="mt-3"><MicroReplica /></div>
      </section>

      <section className="mb-12">
        <Eyebrow>The measured record</Eyebrow>
        <div className="mt-3 overflow-x-auto rounded-xl ring-1 ring-black/10">
          <table className="w-full min-w-[760px] text-[12.5px]">
            <thead className="bg-black/[0.04] text-left font-mono text-[10.5px] uppercase tracking-[0.08em] text-black/50">
              <tr>
                <th className="px-3 py-2">Element</th><th className="px-3 py-2">What moves</th>
                <th className="px-3 py-2">Values</th><th className="px-3 py-2 text-right">Duration</th>
                <th className="px-3 py-2">Easing</th><th className="px-3 py-2 text-right">Delay</th>
              </tr>
            </thead>
            <tbody>
              {SPECS.map((s) => (
                <tr key={s[0]} className="border-t border-black/[0.07]">
                  <td className="px-3 py-2 font-medium">{s[0]}</td>
                  <td className="px-3 py-2 text-black/60">{s[1]}</td>
                  <td className="px-3 py-2 font-mono text-[11.5px] text-black/70">{s[2]}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums">{s[3]}</td>
                  <td className="px-3 py-2 font-mono text-[11.5px] text-black/70">{s[4]}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums">{s[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 max-w-3xl text-[12px] leading-snug text-black/45">
          Replicated behaviour, not copied source: the implementations on this page were written
          here, from these numbers. The 166.7ms stagger and the wipe curve are the signature — worth
          noticing that the wipe easing (0.16, 1, 0.3, 1) is a near-cousin of this system&rsquo;s own
          signature curve (0.22, 1, 0.36, 1).
        </p>
      </section>
    </>
  );
}
