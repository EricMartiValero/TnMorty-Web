"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  neonColor?: "purple" | "blue";
}

export function Modal({ isOpen, onClose, title, children, neonColor = "purple" }: ModalProps) {
  // Bloquear scroll al abrir
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const neonStyles = {
    purple: "border-fuchsia-500/80 shadow-[0_0_20px_rgba(217,70,239,0.3)]",
    blue: "border-cyan-500/80 shadow-[0_0_20px_rgba(34,211,238,0.3)]",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1,
                opacity: 1 
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                mass: 1
              }}
              className={`pointer-events-auto relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border bg-[#0a0a0a]/90 p-8 sm:p-12 backdrop-blur-2xl ${neonStyles[neonColor]}`}
            >
              {/* Botón Cerrar */}
              <button
                onClick={onClose}
                className="absolute right-6 top-6 z-10 p-2 text-white/40 hover:text-white transition-all hover:rotate-90"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="relative z-10">
                <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-white/90 mb-8 border-b border-white/5 pb-4">
                  {title}
                </h2>
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
