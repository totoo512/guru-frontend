"use client";

import { Button } from "antd";
import { AndroidFilled, AppleFilled } from "@ant-design/icons";
import { ASSETS as A } from "@/lib/paths";

export default function AppDownloadContent() {
  return <div className="download-modal"><div className="modal-title"><h3>下载 APP</h3><p>支持 iOS / Android，扫码或选择应用商店下载。</p></div><div className="download-grid"><article className="download-platform"><div className="download-platform-head"><span><AppleFilled/></span><div><b>iOS</b><small>App Store</small></div></div><img className="download-qr" src={`${A}ios.png`} alt="iOS 下载二维码"/><Button className="download-store-link download-store-link--android" size="large" icon={<AppleFilled/>} href="https://apps.apple.com/cn/app/%E5%92%95%E5%99%9C%E5%8F%A3%E8%AF%AD-ai%E5%A4%96%E6%95%991%E5%AF%B91%E7%BB%83%E5%8F%A3%E8%AF%AD/id6462875096" target="_blank" rel="noopener noreferrer">App Store 下载</Button></article><article className="download-platform"><div className="download-platform-head"><span><AndroidFilled/></span><div><b>Android</b><small>应用宝</small></div></div><img className="download-qr" src={`${A}android.png`} alt="Android 下载二维码"/><Button className="download-store-link download-store-link--android" size="large" icon={<AndroidFilled/>} href="https://sj.qq.com/appdetail/com.huoideas.speakguru" target="_blank" rel="noopener noreferrer">Android 下载</Button></article></div><p className="download-tip">使用手机扫码，或点击对应按钮前往应用商店</p></div>;
}
