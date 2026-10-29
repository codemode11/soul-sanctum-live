import { IconColorTheme, IconFrameStyle } from './emblems';

export type MastheadLayoutVariant = 'classic-split' | 'solemn-centered' | 'horizon-banner';

export interface ScheduledMastheadLayout {
  id: string;
  dateStr: string; // YYYY-MM-DD
  occasionName: string;
  enabled: boolean;
  layoutVariant: MastheadLayoutVariant;
  establishingImageId: string;
  emblemId: string;
  colorTheme: IconColorTheme;
  frameStyle: IconFrameStyle;
  mottoText: string;
  mottoCitation: string;
  calloutLine1?: string;
  calloutLine2?: string;
}

/**
 * Code-only scheduled masthead layouts managed privately in Google AI Studio.
 * No public UI is shown to visitors. Add or edit entries here when requested in AI Studio chat.
 */
export const SCHEDULED_MASTHEAD_LAYOUTS: ScheduledMastheadLayout[] = [];

export function getActiveScheduledMastheadForDate(
  dateStr: string
): ScheduledMastheadLayout | undefined {
  return SCHEDULED_MASTHEAD_LAYOUTS.find((s) => s.enabled && s.dateStr === dateStr);
}
