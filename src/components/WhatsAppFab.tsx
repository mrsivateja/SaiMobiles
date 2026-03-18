import { WHATSAPP_NUMBER } from "@/lib/data";
import { MessageCircle } from "lucide-react";

const WhatsAppFab = () => (
  <a
    href={`https://wa.me/${WHATSAPP_NUMBER}`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-whatsapp text-whatsapp-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    aria-label="WhatsApp"
  >
    <MessageCircle size={26} fill="currentColor" />
  </a>
);

export default WhatsAppFab;
