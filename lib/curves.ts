/**
 * SEED DATA ONLY. This file populates Payload on first boot of an empty
 * database and is never read again — editing it changes nothing live.
 * Edit the catalogue at /admin.
 */
export type Curve = {
  /** designer / provenance group, used as the gallery section heading */
  g: string;
  /** curve name */
  n: string;
  /** css easing, or 'linear' | 'step' | 'keyframes' */
  e: string;
  /** measured (or designed) duration in ms */
  d: number;
  /** provenance line — fit error for measured, rationale tag for designed */
  pv: string;
  /** confidence tier */
  cf: 'measured' | 'tolerance' | 'refused' | 'composite' | 'designed';
  /** colour class: ali | gk | des */
  cl: 'ali' | 'gk' | 'des';
  /** key into DEMOS */
  demo: string;
  /** the component this curve is best suited to drive */
  ideal: string;
  /** rationale (may contain inline html) */
  why: string;
  /** designed-tier only: what was derived vs invented */
  des?: string;
  /** run the demo in reverse */
  dir?: string;
};

/**
 * Curve registry, extracted verbatim from formula/motion-cookbook.html so the
 * gallery and the cookbook cannot drift apart. 28 measured + 10 designed.
 */
export const CURVES: Curve[] = [
 {g:'Iqbal — Transmission',n:'System S — spatial reorganization',e:'cubic-bezier(0.78,0.23,0.22,0.78)',d:500,
  pv:'RMSE 0.008 · spread / hop-return / card slide',cf:'measured',cl:'ali',demo:'reorder',
  ideal:'List & layout reordering',
  why:'<b>Why:</b> point-symmetric — it commits and arrives with identical grace, so the same curve is fair in both directions. That is exactly what reordering needs: two elements trading places must feel like one negotiated move, not a winner and a loser.'},
 {g:'Iqbal — Transmission',n:'Hop morph — quick re-spread',e:'cubic-bezier(0.32,0.05,0.42,0.97)',d:190,
  pv:'RMSE 0.017 · measured twice, consistent',cf:'measured',cl:'ali',demo:'segthumb',
  ideal:'Segmented control / tab thumb',
  why:'<b>Why:</b> a short, sure-footed settle with no theatrics. Selection thumbs fire constantly — this curve is fast enough to never lag a tap and soft enough to never twitch.'},
 {g:'Iqbal — Transmission',n:'Label rise — soft arrival',e:'cubic-bezier(0.20,0.20,0.02,0.67)',d:250,
  pv:'RMSE 0.030 · tolerance band',cf:'tolerance',cl:'ali',demo:'tooltip',
  ideal:'Tooltip / popover reveal',
  why:'<b>Why:</b> gentle throughout with a feathered landing — assistive surfaces should arrive politely, never pounce. The soft terminal keeps the tooltip from feeling like an interruption.'},
 {g:'Iqbal — Transmission',n:'Label dip — accelerate into cover',e:'cubic-bezier(0.31,0.37,0.33,-0.19)',d:110,
  pv:'RMSE 0.029 · negative terminal = tuck-under',cf:'measured',cl:'ali',demo:'stash',
  ideal:'Minimize / stash to dock',
  why:'<b>Why:</b> it accelerates into hiding, with a terminal dip that reads as slipping <em>under</em> something. Perfect for elements retreating into a dock or bar — departure with a destination.'},
 {g:'Iqbal — Transmission',n:'Label re-emerge — fast out, long glide',e:'cubic-bezier(0.07,0.82,1.00,0.77)',d:150,
  pv:'RMSE 0.040 · tolerance band',cf:'tolerance',cl:'ali',demo:'popmenu',
  ideal:'Context menu / quick action',
  why:'<b>Why:</b> most of its progress happens immediately, then it coasts. Menus summoned by intent should be there <em>now</em> — the long glide finishes the thought without adding wait.'},
 {g:'Iqbal — Transmission',n:'Card growth — anchored expansion',e:'cubic-bezier(0.13,0.69,0.26,0.98)',d:400,
  pv:'RMSE 0.049 · fitted on final 65% of sweep',cf:'tolerance',cl:'ali',demo:'expandcard',
  ideal:'Row → detail card expansion',
  why:'<b>Why:</b> a fast attack that claims the space, then a long ease-out tail that lets the eye catch up with the new layout. Measured on exactly this job — a card growing from its anchor.'},
 {g:'Iqbal — Transmission',n:'Text out — accelerates away',e:'cubic-bezier(0.85,0.07,1.00,0.42)',d:140,
  pv:'RMSE 0.019 · exits ≈1.4× faster than entries',cf:'measured',cl:'ali',demo:'toast',
  ideal:'Toast / notification dismiss',
  why:'<b>Why:</b> departures should get out of the way. This curve leaves slowly for a breath, then commits hard — the reader gets closure without the exit ever lingering.'},
 {g:'Iqbal — Transmission',n:'Contact fade — anticipated entry',e:'cubic-bezier(0.36,-0.07,0.00,0.76)',d:333,
  pv:'RMSE 0.034 · cascade onset +100ms',cf:'measured',cl:'ali',demo:'formfade',
  ideal:'Progressive form disclosure',
  why:'<b>Why:</b> a whisper of anticipation, then a confident rise — fields appearing in sequence feel <em>prepared</em> rather than dumped. Pairs naturally with a short stagger.'},
 {g:'Iqbal — Transmission',n:'Reporting fade — fast-out pop',e:'cubic-bezier(0.15,1.03,0.33,0.89)',d:317,
  pv:'RMSE 0.021 · cascade onset +133ms',cf:'measured',cl:'ali',demo:'badge',
  ideal:'Status badge / presence appear',
  why:'<b>Why:</b> nearly all of its energy is spent immediately (y₁ > 1) — a tiny pop without a real overshoot. Status changes deserve exactly one blink of emphasis and no bounce.'},
 {g:'Iqbal — Transmission',n:'Ring zoom-in — anticipation push',e:'cubic-bezier(0.61,-0.09,0.57,0.77)',d:350,
  pv:'RMSE 0.013 · slight dip before travel',cf:'measured',cl:'ali',demo:'lightbox',
  ideal:'Lightbox / media zoom open',
  why:'<b>Why:</b> the small negative dip is a gather-then-leap — ideal for zooming into content, where a beat of anticipation makes the enlargement feel physical rather than instant.'},
 {g:'Iqbal — Transmission',n:'Ring zoom-out — soft landing',e:'cubic-bezier(0.28,-0.07,0.00,1.06)',d:417,dir:'out',
  pv:'RMSE 0.039 · terminal overshoot 1.06',cf:'tolerance',cl:'ali',demo:'lightbox',
  ideal:'Lightbox / modal close',
  why:'<b>Why:</b> the 6% terminal overshoot gives the return a tiny exhale as it lands — the viewer feels released, not snapped shut.'},
 {g:'Iqbal — Transmission',n:'Chip travel — gentle drift',e:'cubic-bezier(0.34,0.40,0.00,0.64)',d:433,
  pv:'RMSE 0.045 · corroboration row',cf:'tolerance',cl:'ali',demo:'snap',
  ideal:'Carousel / scroll-snap settle',
  why:'<b>Why:</b> unhurried and even, with no hard landing — the character you want when content glides into a snap point after a flick.'},
 {g:'Iqbal — Transmission',n:'Focus halo — committed travel',e:'cubic-bezier(0.73,0.34,0.12,0.79)',d:483,
  pv:'RMSE 0.0088 · amendment A-01 · +50ms stagger',cf:'measured',cl:'ali',demo:'navline',
  ideal:'Active-indicator travel (nav underline)',
  why:'<b>Why:</b> measured on an indicator whose whole job is traveling to the active item. Long commitment, soft arrival — the underline reads as following your attention, not chasing it.'},
 {g:'Iqbal — Transmission',n:'Row restore — the one overshoot',e:'cubic-bezier(0.19,1.35,0.00,1.05)',d:467,
  pv:'overshoot +17–39% · tolerance-flagged (U-8)',cf:'tolerance',cl:'ali',demo:'dragsnap',
  ideal:'Drag-release snap-back',
  why:'<b>Why:</b> the corpus’s single genuine overshoot — elastic release after held tension. That is a drag interaction’s emotional truth: let go, and the interface breathes back past its mark before settling.'},
 {g:'Iqbal — Monologue',n:'Composer expand — deliberate growth',e:'cubic-bezier(0.46,0.28,0.04,0.76)',d:750,
  pv:'RMSE 0.0088 · Monologue system token',cf:'measured',cl:'ali',demo:'searchbar',
  ideal:'Search / input focus expansion',
  why:'<b>Why:</b> a patient, structural curve for a container changing its commitments. An input growing on focus is a promise of more room — this pace makes the promise legible.'},
 {g:'Iqbal — Monologue',n:'Composer reset — same token, home',e:'cubic-bezier(0.42,0.32,0.02,0.78)',d:783,dir:'out',
  pv:'RMSE 0.0089 · Δ≤0.04 from expand',cf:'measured',cl:'ali',demo:'searchbar',
  ideal:'Input collapse on blur',
  why:'<b>Why:</b> the measured proof of one-token discipline — the collapse rides the same family as the expansion, so focus and blur feel like one mechanism, not two opinions.'},
 {g:'Iqbal — Monologue',n:'Attachment card in',e:'cubic-bezier(0.08,0.49,0.54,0.85)',d:383,
  pv:'RMSE 0.013 · tray cascade member',cf:'measured',cl:'ali',demo:'chipadd',
  ideal:'Chip / attachment added',
  why:'<b>Why:</b> quick confirmation up front, calm finish — the right shape for acknowledging an object the user just created.'},
 {g:'Iqbal — Monologue',n:'Pill out A — accelerating fade',e:'cubic-bezier(0.00,-0.06,0.78,0.24)',d:350,
  pv:'RMSE 0.037 · exit accelerates',cf:'tolerance',cl:'ali',demo:'chipremove',
  ideal:'Filter chip removal',
  why:'<b>Why:</b> lingers a beat (undo window!), then commits to leaving. Removal affordances should feel reversible right up until they aren’t.'},
 {g:'Kuznetsov — Agentic OS UI',n:'CTA rise — enters last, cleanest',e:'cubic-bezier(0.51,0.54,0.10,0.86)',d:333,
  pv:'RMSE 0.008 · sequenced after content',cf:'measured',cl:'gk',demo:'ctabar',
  ideal:'Primary action bar entrance',
  why:'<b>Why:</b> measured on a Buy-now bar arriving after the content it acts on — even attack, crisp settle, zero flourish. The call to action should be the most trustworthy motion on screen.'},
 {g:'Kuznetsov — Agentic OS UI',n:'State dissolve — whole-view morph',e:'cubic-bezier(0.46,0.25,0.02,0.87)',d:500,
  pv:'RMSE 0.016 · product → orb graph',cf:'measured',cl:'gk',demo:'viewfade',
  ideal:'View / route crossfade',
  why:'<b>Why:</b> smooth and total — built for interfaces that let one state dissolve entirely into the next rather than rearranging furniture. Route changes with no shared elements are its home.'},
 {g:'Kuznetsov — Agentic OS UI',n:'Reserved reveal — glassy payoff',e:'cubic-bezier(0.08,0.56,0.00,0.78)',d:700,
  pv:'RMSE 0.019 · post-cut closing beat',cf:'measured',cl:'gk',demo:'success',
  ideal:'Success / confirmation state',
  why:'<b>Why:</b> most of the arrival happens early, then a long settling breath — confirmation should land quickly and then give you a moment with it. Pairs beautifully with a blur-in.'},
 {g:'Kuznetsov — Agentic OS UI',n:'The condensation — layered refusal',e:'linear',d:900,
  pv:'no single curve fits (RMSE 0.06–0.35)',cf:'refused',cl:'gk',demo:'aimat',
  ideal:'AI generating / thinking states',
  why:'<b>Why:</b> the measured refusal is the recommendation — AI moments in this grammar are <em>layered condensations</em>, not tracked slides. Ideal for answers materializing: staggered blur-ins that read as thought precipitating. (Demo approximates with per-line stagger; the true structure resists a single curve — that is the point.)'},
 {g:'Kuznetsov — film annex',n:'The glide — constant velocity',e:'linear',d:1400,
  pv:'energy cv 0.10 · travel itself',cf:'measured',cl:'gk',demo:'ticker',
  ideal:'Ticker / ambient marquee',
  why:'<b>Why:</b> linear is honest for motion that is <em>infrastructure</em> — content passing through, asking for no attention. Easing a ticker would make it lie.'},
 {g:'Kuznetsov — film annex',n:'The cut — zero frames',e:'step',d:0,
  pv:'42.883s / 45.817s · single-frame edits',cf:'measured',cl:'gk',demo:'themecut',
  ideal:'Theme switch (light ↔ dark)',
  why:'<b>Why:</b> some identity changes are more truthful as edits. A theme is a world-state — cutting respects that it is not an object moving but reality being re-declared.'},
 {g:'Kuznetsov — film annex',n:'Action beat — heavy with momentum',e:'cubic-bezier(0.52,0.17,0.40,1.16)',d:1200,
  pv:'RMSE 0.016 · composite-derived',cf:'composite',cl:'gk',demo:'onboard',
  ideal:'Onboarding / hero slide',
  why:'<b>Why:</b> big, weighted, with a terminal push past the mark — first-run moments earn cinematic mass. Use once per flow; this is a marked-register move.'},
 {g:'Kuznetsov — film annex',n:'The whip return — fast attack, long settle',e:'cubic-bezier(0.91,0.90,0.63,0.90)',d:633,
  pv:'RMSE 0.019',cf:'measured',cl:'gk',demo:'backswipe',
  ideal:'Back-swipe navigation return',
  why:'<b>Why:</b> nearly everything happens in the first fifth — the gesture is obeyed instantly — then a long settle absorbs the energy. Exactly how a dismissed view should leave under your thumb.'},
 {g:'Kuznetsov — film annex',n:'Drift settle',e:'cubic-bezier(0.52,0.11,0.38,0.85)',d:733,
  pv:'RMSE 0.011',cf:'measured',cl:'gk',demo:'anchorscroll',
  ideal:'Anchor / programmatic scroll',
  why:'<b>Why:</b> calm, even, arrives without ceremony — scrolling the user somewhere they asked to go should feel like being escorted, not launched.'},
 {g:'Kuznetsov — film annex',n:'Return 2 — fast commit',e:'cubic-bezier(0.31,1.02,0.10,0.70)',d:800,
  pv:'RMSE 0.013',cf:'measured',cl:'gk',demo:'sheetdismiss',
  ideal:'Bottom-sheet flick dismiss',
  why:'<b>Why:</b> instant commitment honoring the flick, then a graceful tail as the sheet clears — dismissals should obey first and be pretty second.'},

 /* ================= DESIGNED TIER =================
    Not measured. The source corpus contains no error states, no hovers, and no
    interrupted gestures — presentation films have no one to refuse and no cursor.
    These are authored to fill those holes, derived from the measured system's
    laws where a derivation exists, and labelled so they can never be mistaken
    for measurements. ================================================= */
 {g:'Designed — error & rejection',n:'Refusal shake — damped correction',e:'keyframes',d:360,
  pv:'designed · not in corpus · ±9px decaying ~0.62×',cf:'designed',cl:'des',demo:'shakefield',
  ideal:'Invalid input / rejected submit',
  des:'The corpus has no negative motion — every measured curve is affirmative. Amplitude and decay are authored; the <em>duration ceiling</em> is derived: 360ms keeps it under the composer-expand token so a refusal never outlasts a constructive move.',
  why:'<b>Why:</b> like the condensation, this genuinely is not one bezier — it reverses direction. A refusal must read as correction rather than celebration, so the excursions decay fast (~0.62× each) and stay horizontal; vertical bounce reads as play. <b>Requires a non-motion fallback</b> — shake is exactly the pattern that harms vestibular users, so the reduced-motion variant is colour and icon only, never a shortened shake.'},
 {g:'Designed — error & rejection',n:'Rejection return — refused, not released',e:'cubic-bezier(0.22,0.90,0.30,1.00)',d:420,
  pv:'designed · contrast pair to Row restore',cf:'designed',cl:'des',demo:'dropreject',
  ideal:'Invalid drop / disallowed swipe',
  des:'Authored as the deliberate opposite of the corpus’s one measured overshoot (Row restore, y₁ 1.35). Same job — return to origin — with the reward removed.',
  why:'<b>Why:</b> the measured Row restore overshoots because release is satisfying; refusal must not be. This lands hard at origin with zero overshoot, so the difference between "let go" and "not allowed" is legible in the curve itself, not just the colour.'},
 {g:'Designed — error & rejection',n:'Danger arm — anticipation before harm',e:'cubic-bezier(0.70,-0.30,0.74,0.18)',d:480,
  pv:'designed · extends measured anticipation dips',cf:'designed',cl:'des',demo:'dangerarm',
  ideal:'Hold-to-confirm destructive action',
  des:'Extrapolated from measured anticipation: Ring zoom-in (y₁ −0.09) and Contact fade (y₁ −0.07) both dip before travelling. This exaggerates that dip to −0.30.',
  why:'<b>Why:</b> the corpus already gathers before it moves; destruction deserves the most gathering. The long hold-back gives the hand time to leave, which is the entire point of an arming control — the motion itself is the grace period.'},
 {g:'Designed — error & rejection',n:'Failure collapse — optimism retracting',e:'cubic-bezier(0.55,0.06,0.86,0.28)',d:260,
  pv:'designed · exit-asymmetry law applied',cf:'designed',cl:'des',demo:'failcollapse',
  ideal:'Optimistic UI reverting on failure',
  des:'Duration derived from the measured exit-asymmetry law (exits ≈1.4× faster than entries): the paired entrance is the ~383ms attachment-in, so its failure exit is 260ms.',
  why:'<b>Why:</b> optimistic UI shows success before it is earned; when the server disagrees, the retraction should be quick and slightly downward — accelerating away and deflating, never the gentle reverse of the arrival that lied to you.'},
 {g:'Designed — error & rejection',n:'Alert arrival — authority, no bounce',e:'cubic-bezier(0.12,0.78,0.24,1.00)',d:240,
  pv:'designed · faster sibling of Label rise',cf:'designed',cl:'des',demo:'alertbanner',
  ideal:'Error banner / blocking notice',
  des:'Authored against the measured Label rise (250ms, soft feathered landing) — same arrival job, opposite manners.',
  why:'<b>Why:</b> the measured Label rise is polite because tooltips should never pounce; an error is the one arrival that <em>should</em>. Fast attack, hard settle, no overshoot — a bouncing error reads as cheerful, which is the wrong emotion for a declined payment.'},

 {g:'Designed — micro-states',n:'Hover in — the cheapest motion',e:'cubic-bezier(0.25,0.60,0.30,1.00)',d:120,
  pv:'designed · under the 140ms corpus floor',cf:'designed',cl:'des',demo:'hoverbtn',
  ideal:'Pointer enters an interactive control',
  des:'Duration bounded by measurement: the corpus’s fastest content moves are Label dip 110ms and Text out 140ms. Micro-states must sit <em>below</em> anything that moves content, so 120ms is a derived ceiling, not a taste call.',
  why:'<b>Why:</b> hover fires thousands of times per session, so it belongs to the unmarked register permanently — it may never be the marked device. Short, ease-out, and confined to compositor-cheap properties (transform, opacity, shadow) so it stays free at any scale.'},
 {g:'Designed — micro-states',n:'Hover out — deliberately slower',e:'cubic-bezier(0.35,0.10,0.40,1.00)',d:180,dir:'out',
  pv:'designed · knowingly breaks the exit law',cf:'designed',cl:'des',demo:'hoverbtn',
  ideal:'Pointer leaves an interactive control',
  des:'The one place this system deliberately <b>contradicts</b> a measured law. Exit asymmetry (exits ≈1.4× faster) was measured on <em>content</em> leaving the screen; applying it to <em>state</em> produces flicker when a cursor crosses a toolbar.',
  why:'<b>Why:</b> a fast hover-out makes a row of buttons strobe as the pointer passes over them. Leaving slower than you arrived is forgiving — it holds the highlight just long enough that travel across neighbours reads as one gesture rather than six. Measured laws are scoped to what was measured; extrapolating this one would have been wrong.'},
 {g:'Designed — micro-states',n:'Press down — immediate acknowledgement',e:'cubic-bezier(0.30,0.70,0.40,1.00)',d:90,
  pv:'designed · fastest entry in the book',cf:'designed',cl:'des',demo:'pressbtn',
  ideal:'Pointer / key press on a control',
  des:'Authored at 90ms — below every measured curve — because press is the only motion the user is physically causing in real time.',
  why:'<b>Why:</b> press is the one place latency is felt as broken hardware rather than slow software. It must complete inside the perceptual "instant" window, so it is the fastest thing in the catalogue: a small scale-in and shadow compress, nothing more.'},
 {g:'Designed — micro-states',n:'Press release — settle, never bounce',e:'cubic-bezier(0.20,0.55,0.25,1.00)',d:200,dir:'out',
  pv:'designed · respects the one-overshoot budget',cf:'designed',cl:'des',demo:'pressbtn',
  ideal:'Control returns after a press',
  des:'Explicitly authored <em>without</em> overshoot to protect the corpus’s scarcest rule: Iqbal reserves exactly one genuine overshoot per surface (Row restore).',
  why:'<b>Why:</b> the tempting choice is a springy pop on release, but a control that bounces every single press spends the surface’s one marked device thousands of times an hour and leaves nothing for the payoff. It settles instead.'},
 {g:'Designed — micro-states',n:'Focus ring — keyboard-speed reveal',e:'cubic-bezier(0.15,0.85,0.25,1.00)',d:120,
  pv:'designed · accessibility-bounded',cf:'designed',cl:'des',demo:'focusring',
  ideal:'Keyboard focus lands on a control',
  des:'Duration bounded by task, not taste: keyboard users tab several times per second, so any focus animation longer than ~150ms turns navigation into a queue of pending rings.',
  why:'<b>Why:</b> a focus ring is a location report, not a flourish — it contracts slightly inward as it fades in so the eye is drawn to the target rather than the animation, and it is the first thing to become instant under reduced-motion.'},
];
