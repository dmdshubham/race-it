import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  cancelText: string;
  confirmText: string;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  cancelText,
  confirmText,
  onConfirm,
}) => {
  const modal = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!modal.current || !trigger.current) return;
      if (
        !isOpen ||
        modal.current.contains(event.target as Node) ||
        trigger.current.contains(event.target as Node)
      ) {
        return;
      }
      onClose();
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [isOpen, onClose]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (isOpen && keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed left-0 top-0 z-999999 flex h-full w-full items-center justify-center bg-black/90 px-4 py-5 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        ref={modal}
        className="dark:bg-boxdark w-full max-w-142.5 rounded-lg bg-white px-8 py-12 text-center md:px-12.5 md:py-10"
      >
        <span className="mx-auto inline-block">
          <svg
            width="80"
            height="80"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect opacity="0.1" width="60" height="60" rx="30" fill="#DC2626" />
            <path
              d="M30 27.2498V29.9998V27.2498ZM30 35.4999H30.0134H30ZM20.6914 41H39.3086C41.3778 41 42.6704 38.7078 41.6358 36.8749L32.3272 20.3747C31.2926 18.5418 28.7074 18.5418 27.6728 20.3747L18.3642 36.8749C17.3296 38.7078 18.6222 41 20.6914 41Z"
              stroke="#DC2626"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="mt-5.5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
          {title}
        </h3>
        <p className="mb-10">{subtitle}</p>
        <div className="-mx-3 flex flex-wrap gap-y-4">
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              onClick={onClose}
              className=" dark:border-strokedark dark:bg-meta-4 dark:hover:border-meta-1 dark:hover:bg-meta-1 block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition  dark:text-white"
            >
              {cancelText}
            </button>
          </div>
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              onClick={onConfirm}
              className="border-meta-1 bg-meta-1 block w-full rounded border bg-red p-3 text-center font-medium text-white transition hover:bg-opacity-90"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
