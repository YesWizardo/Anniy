import React, { useState, useEffect, useRef } from "react";

export const WatchingEyes: React.FC = () => {
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const [pupilOffsets, setPupilOffsets] = useState({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const calcOffset = (el: HTMLDivElement | null) => {
        if (!el) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - eyeCenterX;
        const deltaY = e.clientY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(6, Math.hypot(deltaX, deltaY) / 25);

        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance
        };
      };

      setPupilOffsets({
        left: calcOffset(leftEyeRef.current),
        right: calcOffset(rightEyeRef.current)
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 bg-black/90 p-3 rounded-2xl border-2 border-rage-pink shadow-xl pointer-events-auto flex flex-col items-center gap-1 group">
      <div className="text-[9px] font-pixel text-rage-neon tracking-tighter">
        WE SEE YOU
      </div>
      <div className="flex gap-2">
        {/* Left Eye */}
        <div
          ref={leftEyeRef}
          className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center relative overflow-hidden"
        >
          <div
            className="w-4 h-4 rounded-full bg-rage-blood border border-black absolute"
            style={{
              transform: `translate(${pupilOffsets.left.x}px, ${pupilOffsets.left.y}px)`
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white ml-0.5 mt-0.5" />
          </div>
        </div>

        {/* Right Eye */}
        <div
          ref={rightEyeRef}
          className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center relative overflow-hidden"
        >
          <div
            className="w-4 h-4 rounded-full bg-rage-blood border border-black absolute"
            style={{
              transform: `translate(${pupilOffsets.right.x}px, ${pupilOffsets.right.y}px)`
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white ml-0.5 mt-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
