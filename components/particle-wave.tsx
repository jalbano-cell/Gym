"use client";

import { useEffect, useRef } from "react";
import type { BufferAttribute, BufferGeometry } from "three";

const COLS = 90;
const ROWS = 36;
const SPACING = 0.52;

export function ParticleWave() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animId: number;
    let disposed = false;

    const init = async () => {
      const THREE = await import("three");
      if (disposed) return;

      const w = container.clientWidth;
      const h = container.clientHeight;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Scene & camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(52, w / h, 0.1, 1000);
      camera.position.set(0, 11, 22);
      camera.lookAt(0, -1, 0);

      // Build particle grid
      const count = COLS * ROWS;
      const positions = new Float32Array(count * 3);
      const baseX = new Float32Array(count);
      const baseZ = new Float32Array(count);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const i = r * COLS + c;
          const x = (c - COLS / 2) * SPACING;
          const z = (r - ROWS / 2) * SPACING;
          baseX[i] = x;
          baseZ[i] = z;
          positions[i * 3]     = x;
          positions[i * 3 + 1] = 0;
          positions[i * 3 + 2] = z;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      // Two-layer material: large soft glow + tight bright core
      const matGlow = new THREE.PointsMaterial({
        color: 0xcc0000,
        size: 0.22,
        transparent: true,
        opacity: 0.32,
        sizeAttenuation: true,
        depthWrite: false,
      });
      const matCore = new THREE.PointsMaterial({
        color: 0xff1111,
        size: 0.075,
        transparent: true,
        opacity: 0.92,
        sizeAttenuation: true,
        depthWrite: false,
      });

      const pointsGlow = new THREE.Points(geometry, matGlow);
      const pointsCore = new THREE.Points(geometry.clone(), matCore);
      scene.add(pointsGlow, pointsCore);

      // Ambient fog-like fade at edges via opacity falloff is handled in shader;
      // here we simply update positions each frame
      let t = 0;

      const tick = () => {
        animId = requestAnimationFrame(tick);
        if (disposed) return;
        t += 0.014;

        const pos  = geometry.attributes.position as BufferAttribute;
        const pos2 = (pointsCore.geometry as BufferGeometry).attributes.position as BufferAttribute;

        for (let i = 0; i < count; i++) {
          const x = baseX[i];
          const z = baseZ[i];
          const dist = Math.sqrt(x * x + z * z);
          // Radial ripple + secondary diagonal wave
          const y =
            Math.sin(dist * 0.42 - t * 1.1) * 1.8 * Math.exp(-dist * 0.045) +
            Math.sin(x * 0.3 + z * 0.2 - t * 0.7) * 0.35;

          pos.setY(i, y);
          pos2.setY(i, y);
        }

        pos.needsUpdate  = true;
        pos2.needsUpdate = true;
        renderer.render(scene, camera);
      };

      tick();

      // Resize
      const onResize = () => {
        const nw = container.clientWidth;
        const nh = container.clientHeight;
        renderer.setSize(nw, nh);
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      // Store cleanup on container so the outer return can reach it
      (container as HTMLDivElement & { _threeCleanup?: () => void })._threeCleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", onResize);
        geometry.dispose();
        pointsCore.geometry.dispose();
        matGlow.dispose();
        matCore.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    init();

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      const el = container as HTMLDivElement & { _threeCleanup?: () => void };
      el._threeCleanup?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ position: "relative" }}
      aria-hidden="true"
    />
  );
}
