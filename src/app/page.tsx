/**
 * Phase 1 placeholder — verifies the design-token foundation renders.
 * This is replaced in Phase 2 by the full single-page section build.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-caption uppercase tracking-widest text-volt">
        FitZone Gym
      </p>
      <h1 className="text-display-xl md:text-display-xl-d">
        Get to Work.
      </h1>
      <p className="max-w-md text-body-lg text-steel">
        Foundation ready. Design tokens, fonts, and the static-export
        pipeline are wired. The full site arrives in Phase 2.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
        <button className="btn-primary">Join Now</button>
        <button className="btn-secondary text-volt">Take a Tour</button>
      </div>
    </main>
  );
}
