"use client";

import { useState } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import SiteHeader from "@/components/SiteHeader";
import AppDownloadContent from "@/components/AppDownloadContent";
import AnimatedModal from "@/components/AnimatedModal";
import { useSiteTheme } from "@/lib/useSiteTheme";

export default function NewsHeader() {
  const siteTheme = useSiteTheme();
  const [downloadOpen, setDownloadOpen] = useState(false);
  return <ConfigProvider theme={{ algorithm: siteTheme.mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm, token: { colorPrimary: siteTheme.current.brand, borderRadius: 12, fontFamily: '"MiSans Normal","PingFang SC",-apple-system,system-ui,sans-serif' } }}>
    <SiteHeader theme={siteTheme} onDownload={() => setDownloadOpen(true)} />
    <AnimatedModal open={downloadOpen} onClose={() => setDownloadOpen(false)} className="modal--download">
      <AppDownloadContent />
    </AnimatedModal>
  </ConfigProvider>;
}
