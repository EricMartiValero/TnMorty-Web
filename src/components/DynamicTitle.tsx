"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function DynamicTitle() {
  const pathname = usePathname();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fullText = pathname === "/PerfilProfesional" ? "Eric Martí" : "TnMorty";
    let currentIdx = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const animate = () => {
      if (!isDeleting) {
        setTitle(fullText.substring(0, currentIdx + 1));
        currentIdx++;

        if (currentIdx === fullText.length) {
          isDeleting = true;
          timeoutId = setTimeout(animate, 3000); // Pausa más larga al final
        } else {
          timeoutId = setTimeout(animate, 250); // Velocidad de escritura más lenta (antes 150)
        }
      } else {
        setTitle(fullText.substring(0, currentIdx - 1));
        currentIdx--;

        if (currentIdx === 0) {
          isDeleting = false;
          timeoutId = setTimeout(animate, 1000); // Pausa al estar vacío
        } else {
          timeoutId = setTimeout(animate, 150); // Velocidad de borrado más lenta (antes 100)
        }
      }
    };

    animate();

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  useEffect(() => {
    document.title = title || " ";
  }, [title]);

  return null;
}
