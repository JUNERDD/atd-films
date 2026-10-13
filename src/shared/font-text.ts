import { strings } from './product/strings.ts';
import { MAC_CHROME } from './world/chrome.ts';
import { collectText } from './text.ts';

/** Product and desktop copy used across films, independent of their stories. */
export const COMMON_TEXT = collectText(strings, MAC_CHROME, '⌘⇧⌥⌃↩︎0123456789·/:°…');
