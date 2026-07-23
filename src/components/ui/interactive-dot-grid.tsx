"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface InteractiveDotGridProps {
  /** Spacing between dots in pixels */
  gap?: number;
  /** Base dot radius */
  dotRadius?: number;
  /** How far (px) the cursor glow reaches */
  glowRadius?: number;
  /** Base dot color (rgba) */
  baseColor?: string;
  /** Active dot color near cursor (rgba) */
  activeColor?: string;
  /** Additional className for the canvas wrapper */
  className?: string;
}

export default function InteractiveDotGrid({
  gap = 32,
  dotRadius = 1,
  glowRadius = 180,
  baseColor = "rgba(82, 82, 106, 0.25)",
  activeColor = "rgba(232, 255, 71, 0.8)",
  className = "",
}: InteractiveDotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const dotsRef = useRef<{ x: number; y: number }[]>([]);

  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const dots: { x: number; y: number }[] = [];
    const cols = Math.ceil(rect.width / gap) + 1;
    const rows = Math.ceil(rect.height / gap) + 1;
    const offsetX = (rect.width - (cols - 1) * gap) / 2;
    const offsetY = (rect.height - (rows - 1) * gap) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({ x: offsetX + c * gap, y: offsetY + r * gap });
      }
    }
    dotsRef.current = dots;
  }, [gap]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const glowR2 = glowRadius * glowRadius;

    for (const dot of dotsRef.current) {
      const dx = dot.x - mx;
      const dy = dot.y - my;
      const dist2 = dx * dx + dy * dy;

      let ratio = 0;
      if (dist2 < glowR2) {
        ratio = 1 - Math.sqrt(dist2) / glowRadius;
        ratio = ratio * ratio; // ease-in-quad for smoother falloff
      }

      // Interpolate color
      const r = lerp(parseChannel(baseColor, 0), parseChannel(activeColor, 0), ratio);
      const g = lerp(parseChannel(baseColor, 1), parseChannel(activeColor, 1), ratio);
      const b = lerp(parseChannel(baseColor, 2), parseChannel(activeColor, 2), ratio);
      const a = lerp(parseAlpha(baseColor), parseAlpha(activeColor), ratio);

      const radius = dotRadius + ratio * 1.8;

      ctx.beginPath();
      ctx.arc(dot.x * dpr, dot.y * dpr, radius * dpr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [dotRadius, glowRadius, baseColor, activeColor]);

  useEffect(() => {
    buildGrid();
    rafRef.current = requestAnimationFrame(draw);

    const handleResize = () => {
      buildGrid();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [buildGrid, draw]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      style={{ zIndex: 0 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}

/* ---- helpers ---- */
function parseChannel(rgba: string, idx: number): number {
  const match = rgba.match(/[\d.]+/g);
  return match ? parseFloat(match[idx]) : 0;
}
function parseAlpha(rgba: string): number {
  const match = rgba.match(/[\d.]+/g);
  return match && match.length >= 4 ? parseFloat(match[3]) : 1;
}
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
