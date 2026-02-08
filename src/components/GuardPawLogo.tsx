import { Shield, ShieldAlert, ShieldCheck, ShieldX } from "lucide-react";

interface GuardPawLogoProps {
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { icon: 20, text: "text-lg" },
  md: { icon: 28, text: "text-2xl" },
  lg: { icon: 36, text: "text-3xl" },
};

const GuardPawLogo = ({ size = "md" }: GuardPawLogoProps) => {
  const s = sizeMap[size];
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative">
        <Shield className="text-primary" size={s.icon} strokeWidth={2.5} />
        <div className="absolute inset-0 blur-md bg-primary/20 rounded-full" />
      </div>
      <span className={`${s.text} font-bold tracking-tight text-foreground`}>
        Guard<span className="text-primary">Paw</span>
      </span>
    </div>
  );
};

export default GuardPawLogo;
