"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { BaseSyntheticEvent, ReactNode, useCallback, useRef } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const onDismiss = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlay]
  );

  return (
    <div ref={overlay} className="modal" onClick={handleClick}>
      <button type="button" className="absolute right-8 top-3 cursor-pointer" onClick={onDismiss}>
        <Image src="/close.svg" width={17} height={17} alt="close" />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
};

export default Modal;
