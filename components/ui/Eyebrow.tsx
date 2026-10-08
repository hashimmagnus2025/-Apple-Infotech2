export default function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-4 ${className}`}>
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
      {children}
    </p>
  );
}
