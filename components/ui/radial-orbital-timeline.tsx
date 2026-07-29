"use client";
import React, { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavIcon } from "@/components/nav/NavIcon";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  iconName: string;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  
  // Typewriter Animation state for title
  const fullTitle = "20M+ Profils B2B. Explorez l’Écosystème.";
  const [typedTitle, setTypedTitle] = useState("");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 45);
    return () => clearInterval(timer);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.25) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    // Larger orbital circle radius
    const radius = 260;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.6,
      Math.min(1, 0.6 + 0.4 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-[#ff4b0b] border-[#ff4b0b]";
      case "in-progress":
        return "text-neutral-900 bg-amber-300 border-amber-400 font-bold";
      case "pending":
        return "text-neutral-700 bg-neutral-100 border-neutral-300";
      default:
        return "text-neutral-700 bg-neutral-100 border-neutral-300";
    }
  };

  return (
    <div
      className="w-full h-screen min-h-screen flex flex-col items-center justify-between bg-white text-neutral-900 overflow-hidden relative py-10 px-4 select-none"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      {/* Header with Typewriter Animation */}
      <div className="text-center z-20 pointer-events-none w-full max-w-3xl px-4 pt-4 pb-2">
        <small className="text-[12px] font-black font-mono tracking-[0.3em] text-[#ff4b0b] uppercase">
          HD DATA / BASE ACTIVE
        </small>
        <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight mt-1.5 uppercase min-h-[58px]">
          {typedTitle.slice(0, 18)}
          <span className="text-[#ff4b0b]">{typedTitle.slice(18)}</span>
          <span className="animate-pulse text-[#ff4b0b] ml-1">|</span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-2 max-w-xl mx-auto">
          Cliquez sur un nœud orbital pour explorer chaque étape d'acquisition et d'activation.
        </p>
      </div>

      {/* Larger Orbital Circle Canvas */}
      <div className="relative w-full max-w-6xl flex-1 flex items-center justify-center my-auto min-h-[560px]">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Central Mingler Logo Core */}
          <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#ff4b0b] via-amber-500 to-orange-600 animate-pulse flex items-center justify-center z-10 shadow-[0_10px_40px_rgba(255,75,11,0.35)] p-0.5">
            <div className="absolute w-36 h-36 rounded-full border border-[#ff4b0b]/30 animate-ping opacity-60"></div>
            <div
              className="absolute w-48 h-48 rounded-full border border-[#ff4b0b]/15 animate-ping opacity-30"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl p-3 border border-neutral-100">
              <img src="/Group 1000001334.png" alt="Mingler" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Larger Orbital Ring Track (520px) */}
          <div className="absolute w-[520px] h-[520px] rounded-full border-2 border-neutral-200/80 shadow-[0_0_40px_rgba(0,0,0,0.04)]"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1.5 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,75,11,0.25) 0%, rgba(255,75,11,0) 70%)`,
                    width: `${item.energy * 0.55 + 50}px`,
                    height: `${item.energy * 0.55 + 50}px`,
                    left: `-${(item.energy * 0.55 + 50 - 44) / 2}px`,
                    top: `-${(item.energy * 0.55 + 50 - 44) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-[#ff4b0b] text-white shadow-xl shadow-[#ff4b0b]/40 scale-135"
                      : isRelated
                      ? "bg-[#ff4b0b]/80 text-white"
                      : "bg-white text-neutral-900 hover:bg-[#ff4b0b] hover:text-white"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-white"
                      : isRelated
                      ? "border-[#ff4b0b] animate-pulse"
                      : "border-neutral-300 hover:border-[#ff4b0b]"
                  }
                  shadow-md transition-all duration-300 transform
                `}
                >
                  <NavIcon name={item.iconName} className="h-5 w-5" />
                </div>

                <div
                  className={`
                  absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs sm:text-sm font-extrabold tracking-tight
                  transition-all duration-300
                  ${isExpanded ? "text-[#ff4b0b] scale-110" : "text-neutral-800 drop-shadow-sm"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-22 left-1/2 -translate-x-1/2 w-80 bg-white/95 backdrop-blur-xl border-neutral-200 text-neutral-900 shadow-2xl shadow-[#ff4b0b]/20 overflow-visible z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#ff4b0b]"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2.5 py-0.5 text-[10px] ${getStatusStyles(item.status)}`}>
                          {item.status === "completed"
                            ? "QUALIFIÉ"
                            : item.status === "in-progress"
                            ? "EN COURS"
                            : "PRÊT"}
                        </Badge>
                        <span className="text-[11px] font-mono font-bold text-neutral-500">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-base font-black text-neutral-950 mt-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-neutral-600 leading-relaxed">
                      <p>{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-neutral-100">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center text-neutral-500 font-medium text-[11px]">
                            <NavIcon name="Zap" className="h-3 w-3 mr-1 text-[#ff4b0b]" />
                            Intensité d'Activation
                          </span>
                          <span className="font-mono text-[11px] text-[#ff4b0b] font-bold">
                            {item.energy}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-[#ff4b0b]"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-neutral-100">
                          <div className="flex items-center mb-2">
                            <NavIcon name="Share2" className="h-3 w-3 text-neutral-400 mr-1" />
                            <h4 className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">
                              Nœuds Connectés
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2.5 py-0 text-[11px] rounded-md border-neutral-200 bg-neutral-50 hover:border-[#ff4b0b] hover:bg-[#ff4b0b] text-neutral-700 hover:text-white transition-all cursor-pointer font-medium"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <NavIcon name="ArrowRight" className="h-2.5 w-2.5 ml-1 text-[#ff4b0b]" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
