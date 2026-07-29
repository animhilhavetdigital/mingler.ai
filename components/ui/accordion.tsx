"use client";

import React, { useState } from "react";
import { NavIcon } from "@/components/nav/NavIcon";

interface AccordionContextType {
  activeValue: string | null;
  toggleValue: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextType>({
  activeValue: null,
  toggleValue: () => {},
});

export function Accordion({
  children,
  className = "",
}: {
  children: React.ReactNode;
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
}) {
  const [activeValue, setActiveValue] = useState<string | null>(null);

  const toggleValue = (value: string) => {
    setActiveValue((prev) => (prev === value ? null : value));
  };

  return (
    <AccordionContext.Provider value={{ activeValue, toggleValue }}>
      <div className={`w-full ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  children,
  value,
  className = "",
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
}) {
  return (
    <div className={`border-b border-neutral-100 py-1 ${className}`} data-value={value}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ itemValue?: string }>, { itemValue: value });
        }
        return child;
      })}
    </div>
  );
}

export function AccordionTrigger({
  children,
  itemValue,
  className = "",
}: {
  children: React.ReactNode;
  itemValue?: string;
  className?: string;
}) {
  const { activeValue, toggleValue } = React.useContext(AccordionContext);
  const isOpen = activeValue === itemValue;

  return (
    <button
      type="button"
      onClick={() => itemValue && toggleValue(itemValue)}
      className={`flex w-full items-center justify-between py-3 font-semibold text-neutral-900 text-[14.5px] transition-all hover:text-[#ff4b0b] cursor-pointer ${
        isOpen ? "text-[#ff4b0b]" : ""
      } ${className}`}
    >
      <span>{children}</span>
      <NavIcon
        name="ChevronDown"
        className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ${
          isOpen ? "rotate-180 text-[#ff4b0b]" : ""
        }`}
      />
    </button>
  );
}

export function AccordionContent({
  children,
  itemValue,
  className = "",
}: {
  children: React.ReactNode;
  itemValue?: string;
  className?: string;
}) {
  const { activeValue } = React.useContext(AccordionContext);
  const isOpen = activeValue === itemValue;

  if (!isOpen) return null;

  return (
    <div className={`overflow-hidden text-sm pb-3 pt-1 space-y-1 animate-in fade-in-0 slide-in-from-top-1 ${className}`}>
      {children}
    </div>
  );
}
