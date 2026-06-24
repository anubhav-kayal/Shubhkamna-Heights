'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

export type CustomSelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  id?: string;
  name?: string;
  label?: string;
  labelClassName?: string;
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  disabled?: boolean;
};

export default function CustomSelect({
  id,
  name,
  label,
  labelClassName,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className,
  triggerClassName,
  disabled = false,
}: CustomSelectProps) {
  const autoId = useId();
  const controlId = id ?? autoId;
  const listboxId = `${controlId}-listbox`;
  const labelId = label ? `${controlId}-label` : undefined;

  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setHighlightIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [open, selectedIndex]);

  const selectOption = (index: number) => {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setOpen(false);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        if (!open) {
          setOpen(true);
          return;
        }
        setHighlightIndex((prev) => {
          const delta = event.key === 'ArrowDown' ? 1 : -1;
          return (prev + delta + options.length) % options.length;
        });
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (open) {
          selectOption(highlightIndex);
        } else {
          setOpen(true);
        }
        break;
      case 'Home':
        event.preventDefault();
        setHighlightIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setHighlightIndex(options.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      {label ? (
        <label id={labelId} htmlFor={controlId} className={labelClassName}>
          {label}
        </label>
      ) : null}

      {name ? <input type="hidden" name={name} value={value} /> : null}

      <button
        id={controlId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={labelId}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          'flex w-full items-center justify-between gap-3 border border-border-gold bg-bg-primary px-3 py-2.5 text-left font-inter text-sm text-text-primary transition-colors',
          'hover:border-gold focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30',
          disabled && 'cursor-not-allowed opacity-60',
          label && 'mt-2',
          triggerClassName,
        )}
      >
        <span className={cn('min-w-0 truncate', !selected && 'text-text-secondary')}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          size={18}
          className={cn('shrink-0 text-gold transition-transform duration-200', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          className="absolute z-[70] mt-1 max-h-60 w-full overflow-y-auto border border-gold/50 bg-bg-card/95 py-1 shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-md"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isHighlighted = index === highlightIndex;

            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlightIndex(index)}
                  onClick={() => selectOption(index)}
                  className={cn(
                    'flex w-full items-center gap-2.5 px-3 py-2.5 text-left font-inter text-sm transition-colors',
                    isHighlighted && 'bg-gold/10',
                    isSelected ? 'text-gold' : 'text-text-primary',
                  )}
                >
                  <Check
                    size={16}
                    className={cn('shrink-0', isSelected ? 'opacity-100' : 'opacity-0')}
                    aria-hidden
                  />
                  <span className="min-w-0 truncate">{option.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
