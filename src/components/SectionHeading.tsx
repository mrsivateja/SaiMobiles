const SectionHeading = ({ title, subtitle, className = "" }: { title: string; subtitle?: string; className?: string }) => (
  <div className={`text-center mb-10 ${className}`}>
    <h2 className="text-3xl md:text-4xl font-black tracking-tighter">{title}</h2>
    {subtitle && <p className="text-muted-foreground mt-2 max-w-lg mx-auto font-medium">{subtitle}</p>}
  </div>
);

export default SectionHeading;
