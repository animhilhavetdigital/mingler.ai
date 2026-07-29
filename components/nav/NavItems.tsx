import React from "react";
import { GridPattern } from "./GridPattern";
import { NavIcon } from "./NavIcon";
import { NavSubItem } from "./nav-data";

export function GridCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl border border-neutral-200/90 bg-white p-4.5 transition-all duration-250 hover:-translate-y-1 hover:border-[#ff4b0b]/40 hover:bg-amber-50/20 hover:shadow-[0_12px_32px_rgba(255,75,11,0.11)] ${className}`}
    >
      <GridPattern className="opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function NavGridCard({ item, onClick }: { item: NavSubItem; onClick?: () => void }) {
  return (
    <a href={item.href} onClick={onClick} className="block group">
      <GridCard>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff4b0b]/10 text-[#ff4b0b] transition-transform duration-200 group-hover:scale-110 group-hover:bg-[#ff4b0b] group-hover:text-white">
            <NavIcon name={item.iconName} className="h-4.5 w-4.5" />
          </div>
          {item.stat && (
            <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-600 border border-neutral-200/80 group-hover:border-[#ff4b0b]/20 group-hover:bg-[#ff4b0b]/10 group-hover:text-[#ff4b0b] transition-colors">
              {item.stat}
            </span>
          )}
          {item.badge && (
            <span className="inline-flex items-center rounded-full bg-[#ff4b0b] px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-xs">
              {item.badge}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-[13.5px] font-bold text-neutral-900 group-hover:text-[#ff4b0b] transition-colors">
            {item.title}
          </h4>
          <NavIcon name="ArrowRight" className="h-3.5 w-3.5 text-neutral-400 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#ff4b0b]" />
        </div>
        <p className="mt-1 text-[12px] leading-relaxed text-neutral-600 line-clamp-2">
          {item.description}
        </p>
      </GridCard>
    </a>
  );
}

export function NavSmallItem({ item, onClick }: { item: NavSubItem; onClick?: () => void }) {
  return (
    <a
      href={item.href}
      onClick={onClick}
      className="group flex items-start gap-3 rounded-lg p-2.5 transition-all duration-200 hover:bg-[#ff4b0b]/5 border border-transparent hover:border-[#ff4b0b]/20"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-700 transition-all duration-200 group-hover:bg-[#ff4b0b] group-hover:text-white">
        <NavIcon name={item.iconName} className="h-4 w-4" />
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-semibold text-neutral-800 group-hover:text-[#ff4b0b] transition-colors">
            {item.title}
          </span>
        </div>
        {item.description && (
          <p className="text-[11.5px] text-neutral-500 line-clamp-1">{item.description}</p>
        )}
      </div>
    </a>
  );
}

export function NavLargeItem({ item, onClick }: { item: NavSubItem; onClick?: () => void }) {
  return (
    <a href={item.href} onClick={onClick} className="block group h-full">
      <GridCard className="h-full bg-gradient-to-br from-white via-white to-orange-50/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff4b0b] text-white shadow-md shadow-[#ff4b0b]/20 mb-3 group-hover:scale-105 transition-transform">
          <NavIcon name={item.iconName} className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-[15px] font-extrabold text-neutral-900 group-hover:text-[#ff4b0b] transition-colors">
            {item.title}
          </h4>
          {item.badge && (
            <span className="rounded-full bg-[#ff4b0b] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              {item.badge}
            </span>
          )}
        </div>
        <p className="text-[12.5px] leading-relaxed text-neutral-600 mb-3">
          {item.description}
        </p>
        {item.stat && (
          <div className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#ff4b0b]">
            <span>{item.stat}</span>
            <NavIcon name="ArrowRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        )}
      </GridCard>
    </a>
  );
}

export function NavItemMobile({ item, onClick }: { item: NavSubItem; onClick?: () => void }) {
  return (
    <a
      href={item.href}
      onClick={onClick}
      className="flex items-center justify-between rounded-lg p-3 text-neutral-800 transition-colors hover:bg-neutral-100 hover:text-[#ff4b0b]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#ff4b0b]/10 text-[#ff4b0b]">
          <NavIcon name={item.iconName} className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[13.5px] font-semibold">{item.title}</div>
          {item.description && (
            <div className="text-[11.5px] text-neutral-500 line-clamp-1">{item.description}</div>
          )}
        </div>
      </div>
      <NavIcon name="ArrowRight" className="h-4 w-4 text-neutral-400" />
    </a>
  );
}
