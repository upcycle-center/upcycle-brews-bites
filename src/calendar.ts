import {
  CALENDAR_EVENTS_BY_MONTH,
  RECURRING_EVENTS,
  US_HOLIDAYS_BY_MONTH,
  type EventCategory,
} from './data';

export interface CalendarEventTile {
  key: string;
  label: string;
  category: EventCategory;
  canRsvp: boolean;
  location?: string;
}

export interface CalendarDay {
  hasDay: true;
  day: number;
  holidayLabel: string | null;
  eventTiles: CalendarEventTile[];
}

export interface CalendarBlank {
  hasDay: false;
}

export type CalendarCell = CalendarDay | CalendarBlank;

export function buildCalendarCells(year: number, month: number): CalendarCell[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = new Date(year, month, 1).getDay();
  const monthKey = `${year}-${month}`;
  const monthOverrides = CALENDAR_EVENTS_BY_MONTH[monthKey] ?? {};
  const monthHolidays = US_HOLIDAYS_BY_MONTH[monthKey] ?? {};

  const cells: CalendarCell[] = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push({ hasDay: false });

  for (let day = 1; day <= daysInMonth; day++) {
    const weekday = new Date(year, month, day).getDay();

    const isClosed = weekday === 1 || weekday === 2;
    const isRetailOnly = weekday === 3;

    let dayEvents: { label: string; category: EventCategory; canRsvp: boolean; location?: string }[] = [];

    if (isClosed) {
      dayEvents = [{ label: 'CLOSED', category: 'closed', canRsvp: false }];
    } else if (isRetailOnly) {
      dayEvents = [
        {
          label: 'Meet the Farmers — Vendors Market only, no food/bar service. 4P–7P',
          category: 'retail',
          canRsvp: false,
        },
      ];
    } else {
      const override = monthOverrides[day];
      if (override) {
        dayEvents = [{ label: override.label, category: override.category, canRsvp: true }];
      } else {
        for (const rec of RECURRING_EVENTS) {
          if (rec.weekdays.includes(weekday)) {
            dayEvents.push({ label: rec.label, category: rec.category, canRsvp: true, location: rec.location });
          }
        }
      }
    }

    const holidayLabel = monthHolidays[day] ?? null;

    cells.push({
      hasDay: true,
      day,
      holidayLabel,
      eventTiles: dayEvents.map((event, idx) => ({
        key: `${day}-${idx}`,
        label: event.label,
        category: event.category,
        canRsvp: event.canRsvp,
        location: event.location,
      })),
    });
  }

  return cells;
}

export const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
