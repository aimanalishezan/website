export default function SectionHeading({
  eyebrow,
  heading,
  sub
}: {
  eyebrow?: string;
  heading: string;
  sub?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display text-3xl text-ink md:text-4xl">{heading}</h2>
      {sub && <p className="mt-3 text-ink/60">{sub}</p>}
    </div>
  );
}
