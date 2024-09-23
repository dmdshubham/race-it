import React from "react";
import Link from "next/link";

interface ButtonPropTypes {
  label: string;
  link?: string;
  customClasses: string;
  onClick?: () => void; // Add onClick for button behavior
  children?: React.ReactNode;
}

const ButtonDefault = ({
  label,
  link,
  customClasses,
  onClick,
  children,
}: ButtonPropTypes) => {
  return (
    <>
      {link ? (
        // Render as a Link if a `link` is provided
        <Link
          className={`inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90 ${customClasses}`}
          href={link}
        >
          {children}
          {label}
        </Link>
      ) : (
        // Render as a button if no `link` is provided
        <button
          className={`inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90 ${customClasses}`}
          onClick={onClick}
        >
          {children}
          {label}
        </button>
      )}
    </>
  );
};

export default ButtonDefault;
