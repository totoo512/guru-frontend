import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "咕噜口语企业版 - 团队英语口语训练解决方案",
  description: "咕噜口语企业版，让团队口语训练可布置、可量化、可汇报。支持组织管理、任务打卡、学习排行与能力数据报告。",
};

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
