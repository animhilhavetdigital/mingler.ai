"use client";

import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navData } from "./nav-data";
import { NavGridCard, NavSmallItem } from "./NavItems";
import { MobileNav } from "./MobileNav";
import { NavIcon } from "./NavIcon";

import minglerLogo from "@/Group 1000001347.svg";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-[18px] left-1/2 z-50 flex h-[68px] w-[min(1180px,calc(100%-40px))] -translate-x-1/2 items-center justify-between rounded-2xl px-4 md:px-6 transition-all duration-350 ${
        scrolled
          ? "bg-white/95 border border-neutral-900/10 shadow-[0_18px_55px_rgba(34,18,10,0.09)] backdrop-blur-xl top-2.5"
          : "bg-white/90 border border-neutral-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] backdrop-blur-md"
      }`}
    >
      {/* Brand Logo */}
      <a
        className="flex items-center transition-opacity hover:opacity-90 shrink-0"
        href="#top"
        aria-label="Mingler — accueil"
      >
        <img
          src={typeof minglerLogo === "string" ? minglerLogo : minglerLogo.src}
          alt="Mingler Logo"
          className="h-7 md:h-8 w-auto object-contain"
        />
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-2">
        <NavigationMenu>
          <NavigationMenuList>
            {navData.map((section) => (
              <NavigationMenuItem key={section.id} id={section.id}>
                {section.hasDropdown ? (
                  <>
                    <NavigationMenuTrigger sectionId={section.id}>
                      {section.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent sectionId={section.id}>
                      <div className="w-[620px] lg:w-[720px] p-5 bg-white rounded-2xl">
                        {/* Dropdown Header */}
                        <div className="mb-4 pb-3 border-b border-neutral-100 flex items-center justify-between">
                          <div>
                            {section.kicker && (
                              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#ff4b0b]">
                                {section.kicker}
                              </span>
                            )}
                            {section.tagline && (
                              <p className="text-[12.5px] font-semibold text-neutral-700 mt-0.5">
                                {section.tagline}
                              </p>
                            )}
                          </div>
                          <NavigationMenuLink href={section.href}>
                            <span className="text-[12px] font-bold text-[#ff4b0b] hover:underline flex items-center gap-1 shrink-0">
                              <span>Voir tout</span>
                              <NavIcon name="ArrowRight" className="h-3.5 w-3.5" />
                            </span>
                          </NavigationMenuLink>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-2 gap-3">
                          {section.mainCards?.map((card) => (
                            <NavigationMenuLink key={card.id} href={card.href}>
                              <NavGridCard item={card} />
                            </NavigationMenuLink>
                          ))}
                        </div>

                        {/* Extra Small Items if available */}
                        {section.smallItems && section.smallItems.length > 0 && (
                          <div className="mt-3.5 pt-3 border-t border-neutral-100 grid grid-cols-2 gap-2">
                            {section.smallItems.map((item) => (
                              <NavigationMenuLink key={item.id} href={item.href}>
                                <NavSmallItem item={item} />
                              </NavigationMenuLink>
                            ))}
                          </div>
                        )}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink href={section.href}>
                    <span className="inline-flex h-9 w-max items-center justify-center rounded-lg px-3 py-2 text-[13.5px] font-semibold text-[#423f3c] transition-all hover:bg-neutral-100 hover:text-[#ff4b0b]">
                      {section.label}
                    </span>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* CTA & Mobile Controls */}
      <div className="flex items-center gap-3">
        <a
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#090909] px-5 py-2.5 text-[13px] font-bold !text-white transition-all duration-200 hover:bg-[#ff4b0b] hover:shadow-lg hover:shadow-[#ff4b0b]/20 active:scale-98"
          href="#contact"
          style={{ color: "#ffffff" }}
        >
          <span style={{ color: "#ffffff" }}>Demander une démo</span>
          <span className="text-[#ffb18c] text-[15px] font-mono leading-none">↗</span>
        </a>

        {/* Mobile Navigation Drawer */}
        <MobileNav />
      </div>
    </header>
  );
}
