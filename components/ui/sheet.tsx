"use client";

import React, { useEffect } from "react";
import { NavIcon } from "@/components/nav/NavIcon";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onOpenChange(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in-0"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Sheet Content Container */}
      <div className="relative z-50 h-full w-full max-w-md bg-white p-6 shadow-2xl transition-transform duration-300 animate-in slide-in-from-right flex flex-col justify-between">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-5 top-5 rounded-full p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none transition-colors"
          aria-label="Fermer le menu"
        >
          <NavIcon name="X" className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function SheetTrigger({
  children,
  onClick,
  asChild,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  asChild?: boolean;
}) {
  return <div onClick={onClick}>{children}</div>;
}

export function SheetContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  side?: string;
  className?: string;
}) {
  return <div className={`flex flex-col justify-between h-full ${className}`}>{children}</div>;
}

export function SheetHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-col space-y-2 text-left ${className}`}>{children}</div>;
}

export function SheetTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-lg font-bold text-neutral-900 ${className}`}>{children}</h2>;
}
