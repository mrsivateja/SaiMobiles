import React from "react";
import { useLanguage } from "@/lib/i18n";
import { Branch } from "@/lib/data";
import { MapPin, Phone } from "lucide-react";

const BranchCard: React.FC<{ branch: Branch }> = ({ branch }) => {
  const { t, lang } = useLanguage();
  return (
    <div className="rounded-2xl glass-card p-6 space-y-4 hover-lift">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <MapPin size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">{lang === "en" ? branch.name : branch.nameTe}</h3>
          <p className="text-sm text-muted-foreground">{lang === "en" ? branch.address : branch.addressTe}</p>
        </div>
      </div>
      <div className="space-y-1.5">
        {branch.phones.map((p) => (
          <a key={p} href={`tel:${p}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Phone size={14} /> {p}
          </a>
        ))}
      </div>
      <div className="flex gap-2">
        <a
          href={branch.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-xs font-medium py-2.5 rounded-md border border-border hover:bg-muted transition-colors"
        >
          {t("getDirections")}
        </a>
        <a
          href={`tel:${branch.phones[0]}`}
          className="flex-1 text-center text-xs font-medium py-2.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {t("callNow")}
        </a>
      </div>
    </div>
  );
};

export default BranchCard;
