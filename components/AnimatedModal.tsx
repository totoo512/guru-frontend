"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type AnimatedModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

export default function AnimatedModal({ open, onClose, children, className = "" }: AnimatedModalProps) {
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);
  const contentRef = useRef(children);
  const classNameRef = useRef(className);

  if (open) {
    contentRef.current = children;
    classNameRef.current = className;
  }

  useEffect(() => {
    if (open) {
      setRendered(true);
      setVisible(false);
      const timer = window.setTimeout(() => setVisible(true), 30);
      return () => window.clearTimeout(timer);
    }

    setVisible(false);
    const timer = window.setTimeout(() => setRendered(false), 260);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!rendered) return;

    const root = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const previousRootOverflow = root.style.overflow;
    const previousRootScrollBehavior = root.style.scrollBehavior;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;
    const previousBodyPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      root.style.overflow = previousRootOverflow;
      root.style.scrollBehavior = "auto";
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      body.style.paddingRight = previousBodyPadding;
      window.scrollTo(0, scrollY);
      root.style.scrollBehavior = previousRootScrollBehavior;
    };
  }, [rendered]);

  useEffect(() => {
    if (!rendered) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, rendered]);

  if (!rendered) return null;

  return (
    <div className={`modal-backdrop ${visible ? "is-open" : ""}`} onMouseDown={onClose}>
      <div className={`modal ${classNameRef.current}`} role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" aria-label="关闭弹窗" onClick={onClose}>×</button>
        {contentRef.current}
      </div>
    </div>
  );
}
