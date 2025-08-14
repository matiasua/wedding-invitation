import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  CalendarHeart,
  MapPin,
  Gift,
  MessageCircleHeart,
} from "lucide-react";
// Usa el import que tengas configurado. Si NO tienes alias "@", cambia por ruta relativa:
// import { cn } from "../lib/utils";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Inicio", href: "#home" },
  { icon: CalendarHeart, label: "Evento", href: "#event" },
  { icon: MapPin, label: "Ubicación", href: "#location" },
  { icon: Gift, label: "Regalo", href: "#gifts" },
  { icon: MessageCircleHeart, label: "Deseos", href: "#wishes" },
];

const BottomBar = () => {
  const [active, setActive] = React.useState("home");

  return (
    // sticky dentro del contenedor que scrollea (el “teléfono”)
    <div
      className="sticky z-50 px-4"
      // eleva la barra por sobre la barra del navegador móvil
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, type: "spring", stiffness: 160 }}
        className="backdrop-blur-md bg-white/90 border border-gray-200/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.07)] px-4 py-2"
        // acolcha por si hay notch / home indicator
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) * 0.5)" }}
      >
        <nav className="flex justify-between items-center">
          {menuItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200",
                "hover:bg-gray-50/80",
                active === item.label.toLowerCase()
                  ? "text-primary bg-primary/5"
                  : "text-gray-600"
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(item.label.toLowerCase())}
            >
              <item.icon
                className={cn(
                  "h-[18px] w-[18px] sm:h-5 sm:w-5 mb-0.5 sm:mb-1 transition-colors duration-200",
                  active === item.label.toLowerCase()
                    ? "stroke-rose-500"
                    : "stroke-gray-600"
                )}
              />
              <span
                className={cn(
                  "text-[10px] sm:text-xs font-medium transition-all duration-200 line-clamp-1",
                  active === item.label.toLowerCase()
                    ? "scale-105 text-rose-500"
                    : "scale-100"
                )}
              >
                {item.label}
              </span>
            </motion.a>
          ))}
        </nav>
      </motion.div>
    </div>
  );
};

export default BottomBar;
