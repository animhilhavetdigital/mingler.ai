import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { navData } from "./nav-data";
import { NavItemMobile } from "./NavItems";
import { NavIcon } from "./NavIcon";

import minglerLogo from "@/Group 1000001347.svg";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200/80 bg-white/80 text-neutral-800 transition-colors hover:bg-neutral-100 active:scale-95 md:hidden"
          aria-label="Ouvrir le menu de navigation"
        >
          <NavIcon name="Menu" className="h-5 w-5" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[320px] sm:w-[380px] p-6 flex flex-col justify-between">
        <div>
          <SheetHeader className="text-left border-b border-neutral-100 pb-4 mb-4">
            <SheetTitle>
              <a
                className="flex items-center"
                href="#top"
                onClick={handleLinkClick}
                aria-label="Mingler — accueil"
              >
                <img
                  src={typeof minglerLogo === "string" ? minglerLogo : minglerLogo.src}
                  alt="Mingler Logo"
                  className="h-7 w-auto object-contain"
                />
              </a>
            </SheetTitle>
          </SheetHeader>

          <div className="max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            <Accordion type="single" collapsible className="w-full">
              {navData.map((section) => (
                <AccordionItem key={section.id} value={section.id}>
                  <AccordionTrigger className="text-[15px] font-bold text-neutral-900 hover:text-[#ff4b0b]">
                    {section.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    {section.tagline && (
                      <p className="px-1 pb-2 text-[12px] text-neutral-500 font-medium">
                        {section.tagline}
                      </p>
                    )}
                    <div className="space-y-1">
                      {section.mainCards?.map((card) => (
                        <NavItemMobile key={card.id} item={card} onClick={handleLinkClick} />
                      ))}
                      {section.smallItems?.map((item) => (
                        <NavItemMobile key={item.id} item={item} onClick={handleLinkClick} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-100 mt-auto">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#090909] text-sm font-bold !text-white shadow-lg transition-all hover:bg-[#ff4b0b] active:scale-98"
            href="#contact"
            style={{ color: "#ffffff" }}
            onClick={handleLinkClick}
          >
            <span style={{ color: "#ffffff" }}>Demander une démo</span>
            <NavIcon name="ArrowRight" className="h-4 w-4 text-[#ffb18c]" />
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
