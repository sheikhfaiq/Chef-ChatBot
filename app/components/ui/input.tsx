'use client';

import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
} from 'react';

type InputProps = {
  as?: 'input' | 'textarea';
  rows?: number;
} & (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>);

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ as = 'input', rows = 1, className = '', onKeyDown, ...props }, ref) => {
    // Unified onKeyDown handler type supporting both input and textarea
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (onKeyDown) {
        onKeyDown(e as any); // cast here to bypass TS incompatibility
      }
    };

    if (as === 'textarea') {
      return (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          rows={rows}
          className={`flex-1 border border-blue-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          onKeyDown={handleKeyDown}
        />
      );
    }

    return (
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        className={`border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...(props as InputHTMLAttributes<HTMLInputElement>)}
        onKeyDown={handleKeyDown}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
