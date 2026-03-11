"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2  u_res;
uniform vec3  u_color;
uniform vec2  u_mouse;
uniform float u_hover;

/* ── simplex 2-D noise ─────────────────────────────────────────── */
vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x,289.0); }
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,
                    -0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
  i=mod(i,289.0);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m; m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0;
  vec3 h=abs(x)-0.5;
  vec3 ox=floor(x+0.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x =a0.x*x0.x +h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

void main(){
  vec2 uv=(gl_FragCoord.xy-u_res*0.5)/min(u_res.x,u_res.y);

  /* mouse influence */
  vec2 mUV=(u_mouse-u_res*0.5)/min(u_res.x,u_res.y);
  float mDist=length(uv-mUV);
  float mPull=smoothstep(0.7,0.0,mDist)*u_hover;

  /* layered noise — slow, wispy */
  float n1=snoise(uv*1.6+u_time*0.14);
  float n2=snoise(uv*3.2-u_time*0.09+vec2(5.1,2.3));
  float n3=snoise(uv*0.8+u_time*0.07+vec2(1.7,8.4));
  float noise=n1*0.5+n2*0.3+n3*0.2;

  /* displace coordinates by noise — wispy edge */
  vec2 disp=uv+noise*0.07*(1.0+mPull*0.5);
  float dist=length(disp);

  /* glow layers — visible but not solid */
  float nebula = exp(-dist*2.8)*0.55;          /* wide ambient cloud  */
  float mid    = exp(-dist*6.0)*0.40;           /* slightly tighter    */
  float inner  = exp(-dist*13.0)*0.22;          /* hot center          */
  float total  = nebula+mid+inner;

  /* noise modulates the cloud — organic edge */
  total *= 0.55 + noise*0.45;

  /* 3 orbiting sparks */
  for(int i=0;i<3;i++){
    float spd=0.18+float(i)*0.11;
    float ang=u_time*spd+float(i)*2.094;
    float r  =0.18+float(i)*0.07;
    vec2 lp  =vec2(cos(ang)*r,sin(ang)*r);
    float ld =length(uv-lp);
    total   +=exp(-ld*20.0)*0.12;
  }

  /* hover: noticeable brightening */
  total *= 1.0+mPull*0.7;

  /* additive output — color sits on top of dark bg */
  vec3 col=u_color*total;
  gl_FragColor=vec4(col,1.0);
}
`;

function hexToRgb01(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

function initGL(canvas, color) {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
  if (!gl) return null;

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE); /* additive — glow adds to dark bg */

  return {
    gl,
    u_time:  gl.getUniformLocation(prog, "u_time"),
    u_res:   gl.getUniformLocation(prog, "u_res"),
    u_color: gl.getUniformLocation(prog, "u_color"),
    u_mouse: gl.getUniformLocation(prog, "u_mouse"),
    u_hover: gl.getUniformLocation(prog, "u_hover"),
    rgb: hexToRgb01(color),
  };
}

export default function NovaGlowOrb({ color = "#00F5FF", style = {} }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ mouse: [0, 0], hover: 0, raf: null, ctx: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width  = width  * dpr;
      canvas.height = height * dpr;
      if (stateRef.current.ctx) {
        const { gl } = stateRef.current.ctx;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    const ctx = initGL(canvas, color);
    if (!ctx) return;
    stateRef.current.ctx = ctx;
    ctx.gl.clearColor(0.02, 0.04, 0.08, 1); /* matches #050A14 dark bg */

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // mouse tracking relative to canvas
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.mouse = [
        (e.clientX - rect.left) * dpr,
        (rect.height - (e.clientY - rect.top)) * dpr,
      ];
    };
    const onEnter = () => { stateRef.current.hoverTarget = 1; };
    const onLeave = () => { stateRef.current.hoverTarget = 0; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);
    stateRef.current.hoverTarget = 0;

    const start = performance.now();
    const tick = () => {
      const s = stateRef.current;
      s.hover += ((s.hoverTarget ?? 0) - s.hover) * 0.06;

      const t = (performance.now() - start) / 1000;
      const { gl, u_time, u_res, u_color, u_mouse, u_hover, rgb } = ctx;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(u_time, t);
      gl.uniform2f(u_res, canvas.width, canvas.height);
      gl.uniform3fv(u_color, rgb);
      gl.uniform2fv(u_mouse, s.mouse);
      gl.uniform1f(u_hover, s.hover);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      s.raf = requestAnimationFrame(tick);
    };
    stateRef.current.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        ...style,
      }}
    />
  );
}
