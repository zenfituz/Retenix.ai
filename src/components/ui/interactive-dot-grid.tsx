"use client";

import React, { useEffect, useRef } from "react";

interface DotGridProps {
  gap?: number;
  dotRadius?: number;
  glowRadius?: number;
  baseColor?: string;
  activeColor?: string;
}

export default function InteractiveDotGrid({
  gap = 24,
  dotRadius = 1.2,
  glowRadius = 160,
  baseColor = "rgba(138, 138, 154, 0.15)",
  activeColor = "rgba(232, 255, 71, 0.65)",
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);
    const parent = canvas.parentElement;
    parent?.addEventListener("mousemove", handleMouseMove);
    parent?.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.floor(width / gap);
      const rows = Math.floor(height / gap);

      const offsetX = (width - cols * gap) / 2;
      const offsetY = (height - rows * gap) / 2;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = offsetX + i * gap;
          const y = offsetY + j * gap;

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);

          if (dist < glowRadius) {
            const ratio = 1 - dist / glowRadius;
            ctx.fillStyle = activeColor;
            ctx.shadowColor = "#E8FF47";
            ctx.shadowBlur = 10 * ratio;
          } else {
            ctx.fillStyle = baseColor;
            ctx.shadowBlur = 0;
          }

          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      parent?.removeEventListener("mousemove", handleMouseMove);
      parent?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [gap, dotRadius, glowRadius, baseColor, activeColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
}
