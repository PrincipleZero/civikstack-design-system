/**
 * Renders a section pattern using the real class string, at true proportions.
 * Scaled down so several fit on a page without lying about the layout.
 */
export default function SectionPreview({ classes, slug }: { classes: string; slug: string }) {
  const label = <div className="h-3 w-24 rounded bg-black/25" />;
  const lines = (n: number) => (
    <div className="space-y-1.5">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="h-2.5 rounded bg-black/12" style={{ width: `${94 - i * 11}%` }} />
      ))}
    </div>
  );

  const isTwoCol = classes.includes("md:grid-cols-[1fr_2fr]");
  const isHero = slug.startsWith("hero");
  const isLight = slug === "light-page";

  return (
    <div className={`overflow-hidden rounded-xl ring-1 ring-black/10 ${isHero ? "bg-black" : "bg-white"}`}>
      <div className="scale-[0.92] origin-top">
        <div className={classes.replace(/py-\d+|pt-\d+|pb-\d+|md:py-\d+|md:pt-\d+|md:pb-\d+/g, "").trim() + " py-6"}>
          {isHero ? (
            <div className="flex min-h-[150px] flex-col justify-end">
              <div className="h-4 w-2/3 rounded bg-white/70" />
              <div className="mt-2 h-2.5 w-1/3 rounded bg-white/30" />
            </div>
          ) : isTwoCol ? (
            <>
              <div>{label}</div>
              <div>{lines(4)}</div>
            </>
          ) : (
            <div className={isLight ? "text-black" : ""}>
              <div className="mb-3 h-4 w-1/2 rounded bg-black/30" />
              {lines(3)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
