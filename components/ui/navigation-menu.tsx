"use client";

import React, { useState, useRef, useEffect } from "react";
import { NavIcon } from "@/components/nav/NavIcon";

interface NavigationMenuContextType {
  activeItem: string | null;
  setActiveItem: (id: string | null) => void;
}

const NavigationMenuContext = React.createContext<NavigationMenuContextType>({
  activeItem: null,
  setActiveItem: () => {},
});

export function NavigationMenu({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveItem(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <NavigationMenuContext.Provider value={{ activeItem, setActiveItem }}>
      <div ref={containerRef} className={`relative z-50 flex items-center justify-center ${className}`}>
        {children}
      </div>
    </NavigationMenuContext.Provider>
  );
}

export function NavigationMenuList({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex items-center gap-1 list-none ${className}`}>{children}</div>;
}

export function NavigationMenuItem({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return <div className="relative group/menuitem">{children}</div>;
}

export function NavigationMenuTrigger({
  children,
  sectionId,
  className = "",
}: {
  children: React.ReactNode;
  sectionId: string;
  className?: string;
}) {
  const { activeItem, setActiveItem } = React.useContext(NavigationMenuContext);
  const isOpen = activeItem === sectionId;

  return (
    <button
      type="button"
      onClick={() => setActiveItem(isOpen ? null : sectionId)}
      onMouseEnter={() => setActiveItem(sectionId)}
      aria-expanded={isOpen}
      className={`group inline-flex h-9 w-max items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[13.5px] font-semibold transition-all duration-200 cursor-pointer ${
        isOpen
          ? "bg-neutral-100 text-[#ff4b0b]"
          : "text-[#423f3c] hover:bg-neutral-100 hover:text-[#ff4b0b]"
      } ${className}`}
    >
      {children}
      <NavIcon
        name="ChevronDown"
        className={`h-3.5 w-3.5 text-neutral-500 transition-transform duration-250 ${
          isOpen ? "rotate-180 text-[#ff4b0b]" : ""
        }`}
      />
    </button>
  );
}

export function NavigationMenuContent({
  children,
  sectionId,
  className = "",
}: {
  children: React.ReactNode;
  sectionId: string;
  className?: string;
}) {
  const { activeItem } = React.useContext(NavigationMenuContext);
  const isOpen = activeItem === sectionId;

  if (!isOpen) return null;

  return (
    <div
      className={`absolute left-1/2 top-full mt-2.5 -translate-x-1/2 origin-top-center overflow-hidden rounded-2xl border border-neutral-200/90 bg-white text-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.09)] transition-all duration-300 animate-in fade-in-0 zoom-in-95 ${className}`}
    >
      {children}
    </div>
  );
}

export function NavigationMenuLink({
  children,
  href,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  asChild?: boolean;
}) {
  const { setActiveItem } = React.useContext(NavigationMenuContext);

  const handleClick = (e: React.MouseEvent) => {
    setActiveItem(null);
    if (onClick) onClick();
  };

  if (href) {
    return (
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>
    );
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
}
