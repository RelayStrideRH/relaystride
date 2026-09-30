'use client';

import { useEffect, useRef } from 'react';

/* ── Vertex shader: fullscreen triangle ── */
const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

/* ── Fragment shader: halftone dots from FBM at cell centres ── */
const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_pointer;
uniform float u_intensity;

// ── Hash-based value noise ──
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

// ── Six-octave FBM ──
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 6; i++) {
    v += a * vnoise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

// ── Two-level domain warp ──
vec2 warp(vec2 p) {
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0)),
    fbm(p + vec2(5.2, 1.3))
  );
  vec2 r = vec2(
    fbm(p + 4.0 * q + vec2(1.7, 9.2)),
    fbm(p + 4.0 * q + vec2(8.3, 2.8))
  );
  return p + r * 0.4;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float asp = u_res.x / u_res.y;

  // ── 34-cell lattice ──
  float cells = 34.0;
  vec2 grid = vec2(uv.x * cells * asp, uv.y * cells);
  vec2 id   = floor(grid);
  vec2 f    = fract(grid);

  // Cell centre in normalised coords
  vec2 centre = (id + 0.5) / vec2(cells * asp, cells);

  // ── FBM sampled once at cell centre ──
  vec2 w     = warp(centre * 3.0 + u_time * 0.04);
  float field = fbm(w);

  // ── Pointer proximity ──
  float pd = distance(
    centre * vec2(asp, 1.0),
    u_pointer * vec2(asp, 1.0)
  );
  float pe = smoothstep(0.28, 0.0, pd) * u_intensity;

  // ── Dot radius from field value ──
  float rad = field * 0.36 + pe * 0.14;
  rad = clamp(rad, 0.01, 0.46);

  // ── Circle SDF ──
  float d   = length(f - 0.5);
  float dot = 1.0 - smoothstep(rad - 0.016, rad + 0.016, d);

  // ── Palette: black ground, dark-grey dots ──
  vec3 ground = vec3(0.031, 0.035, 0.051);          // #08090D
  vec3 accent  = vec3(0.13, 0.137, 0.16);            // ~#21232A
  vec3 bright  = vec3(0.17, 0.178, 0.21);            // ~#2B2D35 near pointer

  vec3 dotCol = mix(accent, bright, pe);
  vec3 col    = mix(ground, dotCol, dot);

  gl_FragColor = vec4(col, 1.0);
}`;

export default function HalftoneBackground() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number>(0);

  useEffect(() => {
    const canvas   = canvasRef.current;
    const fallback = fallbackRef.current;
    if (!canvas || !fallback) return;

    /* ── WebGL context ── */
    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      canvas.style.display   = 'none';
      fallback.style.display = 'block';
      return;
    }

    /* ── Compile helper ── */
    function compile(type: number, src: string): WebGLShader | null {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl!.getShaderInfoLog(s));
        gl!.deleteShader(s);
        return null;
      }
      return s;
    }

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      canvas.style.display   = 'none';
      fallback.style.display = 'block';
      return;
    }

    const pgm = gl.createProgram()!;
    gl.attachShader(pgm, vs);
    gl.attachShader(pgm, fs);
    gl.linkProgram(pgm);
    if (!gl.getProgramParameter(pgm, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(pgm));
      canvas.style.display   = 'none';
      fallback.style.display = 'block';
      return;
    }
    gl.useProgram(pgm);

    /* ── Fullscreen triangle ── */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(pgm, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    /* ── Uniform locations ── */
    const uRes       = gl.getUniformLocation(pgm, 'u_res');
    const uTime      = gl.getUniformLocation(pgm, 'u_time');
    const uPointer   = gl.getUniformLocation(pgm, 'u_pointer');
    const uIntensity = gl.getUniformLocation(pgm, 'u_intensity');

    /* ── Pointer state ── */
    let ptrX = 0.5;
    let ptrY = 0.5;
    let intensity       = 0;
    let targetIntensity = 0;
    let lastMoveTime    = 0;

    const onMove = (e: PointerEvent) => {
      ptrX = e.clientX / window.innerWidth;
      ptrY = 1.0 - e.clientY / window.innerHeight;
      targetIntensity = 1.0;
      lastMoveTime = performance.now();
    };
    const onLeave = () => {
      targetIntensity = 0;
    };

    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);

    /* ── Resize ── */
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Reduced motion ── */
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    /* ── Render loop ── */
    const t0 = performance.now();

    const frame = () => {
      const now     = performance.now();
      const elapsed = (now - t0) * 0.001;

      // Smooth intensity: rises fast, decays slowly
      if (now - lastMoveTime > 150) {
        targetIntensity *= 0.985;
      }
      intensity += (targetIntensity - intensity) * 0.07;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reducedMotion ? 0 : elapsed);
      gl.uniform2f(uPointer, ptrX, ptrY);
      gl.uniform1f(uIntensity, intensity);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (reducedMotion) return;          // single-frame path
      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(pgm);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      <div
        ref={fallbackRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full bg-rs-black"
        style={{ zIndex: 0, display: 'none' }}
      />
    </>
  );
}
