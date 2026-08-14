/**
 * Motion Cookbook data — cascade recipes.
 *
 * Copied from ~/UI Trace an replication/motion-cookbook rather than rewritten.
 * The cookbook's own note applies: a JSX rewrite of 18 multi-element
 * choreographies would risk silent drift, so the imperative builders stay
 * there and what travels here is the specification — the part you design from.
 */

export type Step = {
  /** element label */ l: string;
  /** E token key */ c: string;
  /** onset ms */ o: number;
  /** role: structure | content | accent | marked | exit */ r: string;
  /** per-element rationale */ n: string;
};

export type Recipe = {
  grp: string;
  name: string;
  /** stagger quantum in ms, or a descriptive string */
  q: number | string;
  why: string;
  steps: Step[];
};

/** Easing token registry: key → [easing, duration ms, provenance, frames?] */
export const E: Record<string, [string, number, string, number?]> = {
  SysS:['cubic-bezier(0.78,0.23,0.22,0.78)',500,'Iqbal · system S'],
  Hop:['cubic-bezier(0.32,0.05,0.42,0.97)',190,'Iqbal · hop morph'],
  Rise:['cubic-bezier(0.20,0.20,0.02,0.67)',250,'Iqbal · label rise'],
  Reem:['cubic-bezier(0.07,0.82,1.00,0.77)',150,'Iqbal · re-emerge'],
  Grow:['cubic-bezier(0.13,0.69,0.26,0.98)',400,'Iqbal · card growth'],
  Tout:['cubic-bezier(0.85,0.07,1.00,0.42)',140,'Iqbal · text out'],
  Cfade:['cubic-bezier(0.36,-0.07,0.00,0.76)',333,'Iqbal · contact fade'],
  Rpop:['cubic-bezier(0.15,1.03,0.33,0.89)',317,'Iqbal · reporting pop'],
  DotPop:['cubic-bezier(0.32,0.83,0.00,0.94)',217,'Iqbal · dot pop'],
  Halo:['cubic-bezier(0.73,0.34,0.12,0.79)',483,'Iqbal · focus halo'],
  Resto:['cubic-bezier(0.19,1.35,0.00,1.05)',467,'Iqbal · restore overshoot'],
  Cexp:['cubic-bezier(0.46,0.28,0.04,0.76)',750,'Iqbal · composer expand'],
  Swin:['cubic-bezier(0.08,0.49,0.54,0.85)',383,'Iqbal · attachment in'],
  PoutA:['cubic-bezier(0.00,-0.06,0.78,0.24)',350,'Iqbal · pill out'],
  CTA:['cubic-bezier(0.51,0.54,0.10,0.86)',333,'Kuznetsov · CTA rise'],
  Dissolve:['cubic-bezier(0.46,0.25,0.02,0.87)',500,'Kuznetsov · state dissolve'],
  Resv:['cubic-bezier(0.08,0.56,0.00,0.78)',700,'Kuznetsov · reserved reveal'],
  Beat1:['cubic-bezier(0.52,0.17,0.40,1.00)',1200,'Kuznetsov · action beat (clamped)',24],
  Ret2:['cubic-bezier(0.31,1.02,0.10,0.70)',800,'Kuznetsov · fast commit'],
  Cond:['cubic-bezier(0.25,0.1,0.25,1)',500,'Kuznetsov · condensation (layered)',21],
  CUT:['step',0,'Kuznetsov · the cut',23],
  R1blur:['cubic-bezier(0.22,1.18,0.24,1.02)',300,'Relay demo · marked blur-overshoot'],
  /* designed tier — see the DESIGNED entries in Part I */
  Shake:['keyframes',360,'designed · refusal shake'],
  Reject:['cubic-bezier(0.22,0.90,0.30,1.00)',420,'designed · rejection return'],
  Arm:['cubic-bezier(0.70,-0.30,0.74,0.18)',480,'designed · danger arm'],
  Fail:['cubic-bezier(0.55,0.06,0.86,0.28)',260,'designed · failure collapse'],
  Alert:['cubic-bezier(0.12,0.78,0.24,1.00)',240,'designed · alert arrival'],
  HovIn:['cubic-bezier(0.25,0.60,0.30,1.00)',120,'designed · hover in'],
  HovOut:['cubic-bezier(0.35,0.10,0.40,1.00)',180,'designed · hover out'],
  PressDn:['cubic-bezier(0.30,0.70,0.40,1.00)',90,'designed · press down'],
  PressUp:['cubic-bezier(0.20,0.55,0.25,1.00)',200,'designed · press release'],
  FocusR:['cubic-bezier(0.15,0.85,0.25,1.00)',120,'designed · focus ring'],
};

export const RECIPES: Recipe[] = [
  {grp:'Overlays & summons',name:'Modal dialog',q:60,
 why:'<b>Why this combination:</b> the scrim prepares the room, the panel claims space on the growth curve measured for exactly that job, content settles calmly, and the primary action arrives last on the corpus’s most trustworthy curve — sequencing as consent: nothing asks for a decision before everything is readable.',
 steps:[
  {l:'Scrim',c:'Cfade',o:0,r:'structure',n:'dims the room symmetrically — a state change, not an event'},
  {l:'Panel',c:'Grow',o:60,r:'structure',n:'claims space on the curve measured for anchored expansion'},
  {l:'Title',c:'Cfade',o:120,r:'content',n:'first read: what is being asked'},
  {l:'Body',c:'Cfade',o:180,r:'content',n:'consequences stated before controls appear'},
  {l:'Primary action',c:'CTA',o:240,r:'accent',n:'arrives only after everything it commits you to is readable'}]
  },
  {grp:'Overlays & summons',name:'Command palette',q:40,
 why:'<b>Why:</b> summoned surfaces must exist immediately — the panel rides the re-emerge curve (most of its progress in the first frames), rows cascade on the tightest quantum in the set, and the accent is the <em>selection highlight</em> gliding onto the first result via the focus-halo curve: attention custody made literal.',
 steps:[
  {l:'Scrim',c:'Cfade',o:0,r:'structure',n:'quiet backdrop shift'},
  {l:'Panel',c:'Reem',o:0,r:'structure',n:'re-emerge: ~80% of progress in the first frames — summoned surfaces exist now'},
  {l:'Input row',c:'Rpop',o:40,r:'content',n:'one blink of emphasis on the caret’s home'},
  {l:'Results ×4',c:'Cfade',o:80,r:'content ·+40 each',n:'candidates, staggered under one quantum'},
  {l:'Selection highlight',c:'Halo',o:280,r:'accent',n:'the accent is attention itself — the halo glides onto the default choice'}]
  },
  {grp:'Overlays & summons',name:'Bottom sheet open → dismiss',q:60,
 why:'<b>Why:</b> the sheet rises on the deliberate structural token (a container changing the page’s commitments), content settles inside it, the CTA closes the entrance cascade — and the dismissal is a different animal entirely: the fast-commit curve honors the flick first and looks pretty second.',
 steps:[
  {l:'Scrim',c:'Cfade',o:0,r:'structure',n:'the page steps back'},
  {l:'Sheet',c:'Cexp',o:0,r:'structure',n:'a container changing the page’s commitments — the deliberate token'},
  {l:'Rows ×2',c:'Cfade',o:120,r:'content ·+60',n:'options in reading order'},
  {l:'Primary action',c:'CTA',o:240,r:'accent',n:'the commit affordance closes the entrance'},
  {l:'Flick dismiss',c:'Ret2',o:2500,r:'exit',n:'obeys the gesture first, looks good second'}]
  },
  {grp:'Overlays & summons',name:'Notification with auto-dismiss',q:50,
 why:'<b>Why:</b> arrival explains itself in rank order — container, icon, message, then the one actionable word last. The dismissal obeys the measured exit asymmetry: it leaves on the accelerating text-out curve, ~1.4× faster than it arrived. Entrances explain; exits excuse themselves.',
 steps:[
  {l:'Toast container',c:'Rise',o:0,r:'structure',n:'soft structural arrival from the edge'},
  {l:'Icon',c:'Rpop',o:50,r:'content',n:'instant identity: what kind of news this is'},
  {l:'Message',c:'Cfade',o:100,r:'content',n:'the news itself, calmly'},
  {l:'Action link',c:'CTA',o:150,r:'accent',n:'the one tappable word closes the entrance'},
  {l:'Auto-dismiss (all)',c:'Tout',o:2300,r:'exit',n:'exit asymmetry: leaves ~1.4× faster than it came'}]
  },
  {grp:'Expansion & detail',name:'Row → detail expansion — the measured original',q:'as measured',
 why:'<b>Why:</b> this is Ali’s T-04 cascade at its <em>actual measured onsets</em> — container +0, contact +100, title +117, reporting +133, actions +200, presence dot +300. Structure leads, detail follows, the single color accent lands last. The recipe every other entry here descends from.',
 steps:[
  {l:'Container',c:'Grow',o:0,r:'structure',n:'measured: growth claims the space before anything reads'},
  {l:'Contact block',c:'Cfade',o:100,r:'content',n:'+100ms measured onset'},
  {l:'Title',c:'Cfade',o:117,r:'content',n:'+117ms — one subliminal quantum later'},
  {l:'Reporting block',c:'Rpop',o:133,r:'content',n:'+133ms, on the pop that spends its energy up front'},
  {l:'Action icons',c:'Cfade',o:200,r:'content',n:'affordances after information'},
  {l:'Presence dot',c:'DotPop',o:300,r:'accent',n:'the single color accent, measured landing last at +300ms'}]
  },
  {grp:'Expansion & detail',name:'Mini-player → full player',q:60,
 why:'<b>Why:</b> a media surface unfolding is a chain of claims — the shell grows, artwork arrives as the identity object, metadata reads in order, the scrubber (a nested structural element) draws itself on the long deliberate token, and the play control lands last because it is the whole point of the expansion.',
 steps:[
  {l:'Container',c:'Grow',o:0,r:'structure',n:'the shell unfolds from its anchor'},
  {l:'Artwork',c:'Swin',o:60,r:'content',n:'identity object first — what is playing'},
  {l:'Title / artist',c:'Cfade',o:120,r:'content',n:'names after image'},
  {l:'Scrubber',c:'Cexp',o:180,r:'structure',n:'nested structural claim: the timeline draws on the deliberate token'},
  {l:'Transport row',c:'Cfade',o:240,r:'content',n:'secondary controls settle quietly'},
  {l:'Play button',c:'CTA',o:300,r:'accent',n:'the reason the widget exists arrives last'}]
  },
  {grp:'Expansion & detail',name:'Search: focus → results',q:50,
 why:'<b>Why:</b> the field expanding on focus is a promise of more room (the Monologue token was measured on exactly this), and the answer set assembles beneath it in rank order — count, candidates, refinements — with the halo landing on the best hit last: the interface finishing your gesture by proposing where your attention should go.',
 steps:[
  {l:'Search field',c:'Grow',o:0,r:'structure',n:'focus expansion — the promise of more room'},
  {l:'Result count',c:'Rise',o:100,r:'content',n:'the scope of the answer before the answer'},
  {l:'Result rows ×3',c:'Cfade',o:150,r:'content ·+50 each',n:'candidates in relevance order'},
  {l:'Filter chips',c:'Swin',o:300,r:'content',n:'refinements offered after results, never before'},
  {l:'Top-hit highlight',c:'Halo',o:350,r:'accent',n:'attention escorted to the best answer, last'}]
  },
  {grp:'Assembly & load',name:'Dashboard load-in',q:90,
 why:'<b>Why:</b> chunk-mode staggering (90ms — Kuznetsov’s legible quantum rather than Ali’s subliminal one) suits first-paint moments where the user should <em>see</em> the assembly. The chart takes the long structural curve its consequence deserves; the delta badge — the only judgment on the screen — arrives last.',
 steps:[
  {l:'Header',c:'Rise',o:0,r:'structure',n:'names the page before the page exists'},
  {l:'KPI cards ×3',c:'Swin',o:90,r:'content ·+90 each',n:'chunk stagger: assembly meant to be seen'},
  {l:'Chart panel',c:'Cexp',o:360,r:'structure',n:'nested structural claim — the largest surface takes the longest curve'},
  {l:'Delta badge',c:'Rpop',o:460,r:'accent',n:'the only judgment on screen lands last'}]
  },
  {grp:'Assembly & load',name:'Data table load',q:40,
 why:'<b>Why:</b> tables are read, not watched — so the stagger drops to Ali’s subliminal 40ms tier, where rows feel <em>prepared</em> rather than performed. The header declares the schema first; the summary line, the table’s one conclusion, arrives last as the accent.',
 steps:[
  {l:'Header row',c:'Rise',o:0,r:'structure',n:'schema before data'},
  {l:'Rows ×4',c:'Cfade',o:40,r:'content ·+40 each',n:'subliminal tier: felt as readiness, not watched as motion'},
  {l:'Summary line',c:'Rpop',o:240,r:'accent',n:'the table’s one conclusion, emphasized last'}]
  },
  {grp:'Assembly & load',name:'Checkout summary',q:60,
 why:'<b>Why:</b> a purchase surface is an argument — items are the premises, the total is the conclusion, the pay button is the ask. The recipe animates it in exactly that logical order, with the total taking the emphasis pop and the ask arriving last on the trustworthy CTA curve.',
 steps:[
  {l:'Panel',c:'Grow',o:0,r:'structure',n:'the receipt surface claims its space'},
  {l:'Line items ×3',c:'Cfade',o:60,r:'content ·+60 each',n:'premises, in order'},
  {l:'Total',c:'Rpop',o:240,r:'content',n:'the conclusion gets the one emphasis pop'},
  {l:'Pay button',c:'CTA',o:300,r:'accent',n:'the ask — last, on the most trustworthy curve'}]
  },
  {grp:'Assembly & load',name:'Upload → success  [marked ×1]',q:70,
 why:'<b>Why:</b> the attachment-in curve was measured on literally this object; the progress fill takes the patient structural token because waiting honestly is structural work. Completion spends the marked budget on the corpus’s single genuine overshoot — the one bounce, reserved for the one moment of release — and the follow-up link still lands last.',
 steps:[
  {l:'Upload card',c:'Cfade',o:0,r:'structure',n:'the surface that will hold the outcome'},
  {l:'File chip',c:'Swin',o:70,r:'content',n:'measured on an attachment arriving — used as one'},
  {l:'Progress fill',c:'Cexp',o:140,r:'content',n:'waiting honestly, on the patient token'},
  {l:'Success check',c:'Resto',o:900,r:'marked',n:'the one overshoot: elastic release after held tension'},
  {l:'View link',c:'CTA',o:1150,r:'accent',n:'what to do next still arrives after the celebration'}]
  },
  {grp:'Marked moments',name:'Onboarding step advance  [marked ×1]',q:70,
 why:'<b>Why:</b> the once-per-flow moment spends the marked budget: the incoming panel arrives on the heavy action-beat curve (cinematic mass, terminal push), while the outgoing one exits fast per the asymmetry law. Content settles only after the mass lands; the progress dot — the flow’s bookkeeping accent — closes the cascade.',
 steps:[
  {l:'Outgoing panel',c:'Tout',o:0,r:'exit',n:'exits fast — the asymmetry law'},
  {l:'Incoming panel',c:'Beat1',o:80,r:'marked',n:'the marked spend: cinematic mass, once per flow'},
  {l:'Headline',c:'Cfade',o:1000,r:'content',n:'content waits for the mass to land'},
  {l:'Bullets ×2',c:'Cfade',o:1070,r:'content ·+70',n:'supporting claims on the quantum'},
  {l:'Progress dot',c:'DotPop',o:1210,r:'accent',n:'the flow’s bookkeeping closes the cascade'}]
  },
  {grp:'Marked moments',name:'AI answer assembly  [marked ×1: condensation]',q:160,
 why:'<b>Why:</b> the whole assembly is one budgeted marked event in Kuznetsov’s AI register — the container reveals on the glassy payoff curve, then answer lines <em>condense</em> as staggered blur-ins (the measured refusal, honored as a device). The citation chip — the answer’s accountability accent — lands last.',
 steps:[
  {l:'Answer container',c:'Resv',o:0,r:'structure',n:'the glassy payoff reveal opens the scene'},
  {l:'Answer lines ×4',c:'Cond',o:240,r:'marked ·+160 each',n:'condensation: thought precipitating — the refusal honored as a device'},
  {l:'Citation chip',c:'Swin',o:880,r:'accent',n:'accountability lands last'}]
  },
  {grp:'Marked moments',name:'Chat payoff card — glass  [marked ×1]',q:50,
 why:'<b>Why:</b> the Relay demo’s hard-won ruling, as a recipe: the marked device (blur-overshoot) applies to the <em>hero container only</em>, while every child rides the unmarked register — that is what keeps register purity above 90% with the payoff intact. Glass needs a declared ambient under-layer, or the blur has nothing to prove.',
 steps:[
  {l:'Ambient glow',c:'Cfade',o:0,r:'structure',n:'the declared under-layer that gives glass something to blur'},
  {l:'Glass card (hero)',c:'R1blur',o:0,r:'marked',n:'blur-overshoot on the hero only — the Relay purity ruling'},
  {l:'Detail rows ×2',c:'Cfade',o:50,r:'content ·+50',n:'children stay in the unmarked register'},
  {l:'Confirm chip',c:'CTA',o:150,r:'accent',n:'the actionable close, last'}]
  },
  {grp:'Marked moments',name:'Theme switch — cut + dissolve',q:120,
 why:'<b>Why:</b> a theme is a world-state, and the measured grammar re-declares worlds with a single-frame cut rather than a slide. The recipe composes the cut (surface truth, zero frames) with a content dissolve (the one crossfade token) and a popped icon accent — an edit, annotated. Demo holds the before-state ~500ms so the cut is visible, then cuts back the other way.',
 steps:[
  {l:'Surface swap',c:'CUT',o:0,r:'structure',n:'zero frames: reality re-declared, not moved'},
  {l:'Content re-render',c:'Dissolve',o:0,r:'content',n:'the whole-view crossfade token softens the re-read'},
  {l:'Mode icon',c:'DotPop',o:120,r:'accent',n:'one blink to confirm which world you are in'}]
  },
  {grp:'Removal & repair',name:'Delete with undo',q:50,
 why:'<b>Why:</b> three grammars cooperating — the row leaves on the lingering-then-committed removal curve (an undo window in curve form), the neighbors close ranks on the symmetric System S (a negotiated reorganization, not a collapse), and the undo toast assembles with its actionable word last. Destruction, choreographed as courtesy.',
 steps:[
  {l:'Deleted row',c:'PoutA',o:0,r:'exit',n:'lingers a beat — the undo window in curve form'},
  {l:'Neighbors close ranks',c:'SysS',o:100,r:'structure',n:'symmetric System S: a negotiated reorganization'},
  {l:'Undo toast',c:'Rise',o:150,r:'structure',n:'the second scene’s container'},
  {l:'Toast text',c:'Cfade',o:200,r:'content',n:'what just happened, stated plainly'},
  {l:'Undo action',c:'CTA',o:250,r:'accent',n:'the repair affordance, last'}]
  },
  {grp:'Designed — negative & interactive',name:'Invalid submit  [designed]',q:60,
 why:'<b>Why:</b> a refusal is still a cascade, and it still obeys accent-last — but the order inverts what it means. The offending field is corrected <em>first</em> (it is where the hand already is), the explanation follows, and the blocking banner arrives last as the accent. <b>Designed, not measured:</b> the corpus contains no error states at all.',
 steps:[
  {l:'Offending field',c:'Shake',o:0,r:'structure',n:'correction lands where the cursor already is'},
  {l:'Inline reason',c:'Alert',o:126,r:'content',n:'the fix, adjacent to the problem'},
  {l:'Sibling fields dim',c:'HovOut',o:180,r:'content',n:'the unaffected recede rather than compete'},
  {l:'Blocking banner',c:'Alert',o:240,r:'accent',n:'system-level consequence lands last'}]
  },
  {grp:'Designed — negative & interactive',name:'Control lifecycle  [designed]',q:'event-driven',
 why:'<b>Why:</b> the only recipe here with no fixed onsets — every step is triggered by the user, not a timeline. It exists to show the whole micro-state budget in one place: hover in, press down, release, focus. Every step stays in the unmarked register permanently, because a control that spends the marked device on every press has nothing left for the payoff.',
 steps:[
  {l:'Hover in',c:'HovIn',o:0,r:'content',n:'120ms — under the corpus’s 140ms floor'},
  {l:'Press down',c:'PressDn',o:600,r:'content',n:'90ms — fastest in the book; press is felt as hardware'},
  {l:'Release',c:'PressUp',o:900,r:'content',n:'settles without overshoot — protects the one-overshoot budget'},
  {l:'Focus ring',c:'FocusR',o:1400,r:'accent',n:'keyboard-speed; first to go instant under reduced-motion'},
  {l:'Hover out',c:'HovOut',o:1900,r:'exit',n:'slower than in — deliberately breaks the exit-asymmetry law'}]
  },
];
