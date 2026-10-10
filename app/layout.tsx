import type { Metadata } from "next";
import "./globals.css";
import { ASSETS } from "../lib/paths";

export const metadata: Metadata = {
  title: "咕噜口语 - 场景化 AI 英语口语练习",
  description: "咕噜口语，你的场景化 AI 英语口语教练。",
  icons: { icon: `${ASSETS}guru-icon.png` },
};

const themeScript = `try{var d=document.documentElement,t=localStorage.getItem("guru-theme"),m=localStorage.getItem("guru-mode");d.dataset.theme=["guru","mint","violet","sunset","aurora","jade","nebula","ember"].indexOf(t)>-1?t:"aurora";d.dataset.mode=m==="dark"?"dark":"light"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" data-theme="aurora" data-mode="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
