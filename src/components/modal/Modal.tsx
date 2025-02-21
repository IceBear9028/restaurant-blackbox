'use client';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { css } from '@emotion/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)} />
      <Modal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen || !isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      css={css`
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(100, 100, 100, 0.3);
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>모달 창</h2>
      </div>
    </div>,
    document.body,
  );
}
