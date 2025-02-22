'use client';
import { createPortal } from 'react-dom';
import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)}>안녕</button>
      <Modal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen || !isOpen) return null;

  return createPortal(
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <h2 className="text-3xl font-bold underline">모달 창</h2>
      </div>
    </div>,
    document.body,
  );
}
