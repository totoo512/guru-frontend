"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { Segmented } from "antd";
import { CheckOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";

const palettes = [
  { key: "guru", name: "云朵蓝粉", brand: "#89a9f8", grad: "linear-gradient(135deg,#8fc6ff,#b8b5ff 50%,#ffacd8)" },
  { key: "mint", name: "薄荷青紫", brand: "#73cbbd", grad: "linear-gradient(135deg,#88ded0,#a9d5ec 52%,#c8b5f7)" },
  { key: "violet", name: "雾霭丁香", brand: "#a296eb", grad: "linear-gradient(135deg,#b9acf8,#d1baf2 50%,#edbadf)" },
  { key: "sunset", name: "蜜桃奶杏", brand: "#eeae82", grad: "linear-gradient(135deg,#ffd19f,#ffb9b8 52%,#f7a9c9)" },
  { key: "aurora", name: "极光蓝粉", brand: "#5b7cff", grad: "linear-gradient(135deg,#5b7cff,#9b7bfb 50%,#ec4fd6)" },
  { key: "jade", name: "翡翠薄荷", brand: "#0ebd8d", grad: "linear-gradient(135deg,#0a9a74,#0ebd8d 50%,#3dd4c4)" },
  { key: "nebula", name: "星云紫", brand: "#7c5cff", grad: "linear-gradient(135deg,#7c5cff,#a66bff 50%,#ff6fb5)" },
  { key: "ember", name: "活力橙", brand: "#ff7a45", grad: "linear-gradient(135deg,#ff5e62,#ff7a45 50%,#ffb020)" },
] as const;

type PaletteKey = (typeof palettes)[number]["key"];
type Mode = "light" | "dark";
type ViewTransitionDoc = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

export function useSiteTheme() {
  const [palette, setPalette] = useState<PaletteKey>("aurora");
  const [mode, setMode] = useState<Mode>("light");
  const current = palettes.find((p) => p.key === palette) ?? palettes[0];

  useEffect(() => {
    const d = document.documentElement.dataset;
    if (palettes.some((p) => p.key === d.theme)) setPalette(d.theme as PaletteKey);
    setMode(d.mode === "dark" ? "dark" : "light");
  }, []);

  const changePalette = (key: PaletteKey) => {
    setPalette(key);
    document.documentElement.dataset.theme = key;
    localStorage.setItem("guru-theme", key);
  };

  const changeMode = (next: Mode, e?: MouseEvent) => {
    if (next === mode) return;
    const root = document.documentElement;
    const apply = () => {
      flushSync(() => setMode(next));
      root.dataset.mode = next;
      localStorage.setItem("guru-mode", next);
    };
    const doc = document as ViewTransitionDoc;
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();
    const x = e?.clientX ?? window.innerWidth - 40;
    const y = e?.clientY ?? 34;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    doc.startViewTransition(apply).ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 520, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  const themePanel = (
    <div className="theme-pop">
      <p className="theme-pop-title">主题色</p>
      <div className="theme-swatches">
        {palettes.map((p) => (
          <button key={p.key} type="button" className={`theme-swatch ${palette === p.key ? "is-active" : ""}`} onClick={() => changePalette(p.key)}>
            <i style={{ background: p.grad }}>{palette === p.key && <CheckOutlined />}</i>
            <span>{p.name}</span>
          </button>
        ))}
      </div>
      <p className="theme-pop-title">显示模式</p>
      <Segmented<Mode>
        block
        value={mode}
        onChange={(v) => changeMode(v)}
        options={[
          { value: "light", label: <span className="theme-seg"><SunOutlined />白天</span> },
          { value: "dark", label: <span className="theme-seg"><MoonOutlined />夜间</span> },
        ]}
      />
    </div>
  );

  return { mode, current, changeMode, themePanel };
}
