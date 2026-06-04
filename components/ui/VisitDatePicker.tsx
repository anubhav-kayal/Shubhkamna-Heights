'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/context/LocaleContext';
import { cn } from '@/lib/cn';

type VisitDatePickerProps = {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  minDaysFromToday?: number;
  maxDaysFromToday?: number;
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

function parseIso(iso: string) {
  if (!iso) return null;
  const date = new Date(`${iso}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toIso(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDisplay(iso: string) {
  const date = parseIso(iso);
  if (!date) return null;
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(12, 0, 0, 0);
  return next;
}

function addDays(base: Date, days: number) {
  const next = new Date(base);
  next.setDate(next.getDate() + days);
  return startOfDay(next);
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function monthMatrix(year: number, month: number) {
  const first = new Date(year, month, 1, 12);
  const startOffset = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];

  for (let i = 0; i < startOffset; i += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day, 12));
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  return cells;
}

export default function VisitDatePicker({
  id: idProp,
  name = 'visitDate',
  value,
  onChange,
  className,
  minDaysFromToday = 1,
  maxDaysFromToday = 120,
}: VisitDatePickerProps) {
  const { t } = useTranslation();
  const generatedId = useId();
  const inputId = idProp ?? generatedId;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const bounds = useMemo(() => {
    const today = startOfDay(new Date());
    return {
      min: addDays(today, minDaysFromToday),
      max: addDays(today, maxDaysFromToday),
    };
  }, [minDaysFromToday, maxDaysFromToday]);

  const selected = parseIso(value);

  const [viewYear, setViewYear] = useState(() =>
    (selected ?? bounds.min).getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(() => (selected ?? bounds.min).getMonth());

  useEffect(() => {
    if (!selected) return;
    setViewYear(selected.getFullYear());
    setViewMonth(selected.getMonth());
  }, [value]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const display = formatDisplay(value);
  const cells = monthMatrix(viewYear, viewMonth);
  const monthLabel = new Date(viewYear, viewMonth, 1, 12).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });

  const viewMonthStart = new Date(viewYear, viewMonth, 1, 12);
  const minMonthStart = new Date(bounds.min.getFullYear(), bounds.min.getMonth(), 1, 12);
  const maxMonthStart = new Date(bounds.max.getFullYear(), bounds.max.getMonth(), 1, 12);
  const canGoPrev = viewMonthStart > minMonthStart;
  const canGoNext = viewMonthStart < maxMonthStart;

  const goPrevMonth = () => {
    if (!canGoPrev) return;
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (!canGoNext) return;
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const isDisabled = (date: Date) => date < bounds.min || date > bounds.max;

  const pickDate = (date: Date) => {
    if (isDisabled(date)) return;
    onChange(toIso(date));
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex w-full items-center gap-3 border border-border-gold bg-bg-primary/80 px-4 py-3.5 text-left',
          'transition-[border-color,box-shadow,background] duration-200',
          'hover:border-gold/60 hover:bg-bg-primary',
          'focus-visible:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/25',
          open && 'border-gold ring-2 ring-gold/20',
          display ? 'text-text-primary' : 'text-text-secondary/70',
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${inputId}-calendar`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/30 bg-gold/10 text-gold">
          <Calendar size={18} strokeWidth={1.75} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-inter text-sm font-medium leading-snug">
            {display ?? t('enquiry.visitPlaceholder')}
          </span>
          {!display && (
            <span className="mt-0.5 block text-xs text-text-secondary">
              {t('enquiry.visitHint', { min: minDaysFromToday, max: maxDaysFromToday })}
            </span>
          )}
        </span>
        <ChevronDown
          size={18}
          className={cn('shrink-0 text-gold/70 transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      <input type="hidden" id={inputId} name={name} value={value} />

      {open && (
        <div
          id={`${inputId}-calendar`}
          role="dialog"
          aria-label="Choose visit date"
          className="absolute top-[calc(100%+0.375rem)] right-0 z-50 w-[15.5rem] max-w-[calc(100vw-2rem)] border border-gold/35 bg-bg-card p-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.5)] sm:left-auto sm:right-0"
        >
          <div className="mb-2 flex items-center justify-between gap-1">
            <button
              type="button"
              onClick={goPrevMonth}
              disabled={!canGoPrev}
              aria-label="Previous month"
              className=" border border-border-gold p-1 text-gold transition-colors hover:border-gold hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={14} />
            </button>
            <p className="font-cormorant text-sm font-semibold text-gold">{monthLabel}</p>
            <button
              type="button"
              onClick={goNextMonth}
              disabled={!canGoNext}
              aria-label="Next month"
              className=" border border-border-gold p-1 text-gold transition-colors hover:border-gold hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0.5 text-center">
            {WEEKDAYS.map((day) => (
              <span
                key={day}
                className="py-0.5 font-inter text-[0.5625rem] font-semibold uppercase tracking-wide text-text-secondary"
              >
                {day.slice(0, 1)}
              </span>
            ))}
            {cells.map((date, index) => {
              if (!date) {
                return <span key={`empty-${index}`} className="h-7" aria-hidden />;
              }

              const disabled = isDisabled(date);
              const isSelected = selected ? sameDay(date, selected) : false;
              const isToday = sameDay(date, startOfDay(new Date()));

              return (
                <button
                  key={toIso(date)}
                  type="button"
                  disabled={disabled}
                  onClick={() => pickDate(date)}
                  className={cn(
                    'mx-auto flex h-7 w-7 items-center justify-center font-inter text-xs transition-colors',
                    disabled && 'cursor-not-allowed text-text-secondary/25',
                    !disabled && !isSelected && 'text-text-primary hover:bg-gold/15',
                    isSelected &&
                      'bg-gradient-to-br from-gold to-gold-light font-semibold text-text-dark',
                    isToday && !isSelected && !disabled && 'ring-1 ring-gold/50',
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="mt-2 font-inter text-xs font-medium text-gold/80 transition-colors hover:text-gold"
        >
          {t('enquiry.clearDate')}
        </button>
      )}
    </div>
  );
}
