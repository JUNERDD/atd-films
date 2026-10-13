import '@fontsource-variable/inter/opsz.css';
import '@fontsource-variable/noto-sans-sc/index.css';
import { useEffect, useState } from 'react';
import { useDelayRender } from 'remotion';

/**
 * The faces arrive as unicode-range subsets, which a browser fetches only once text needs them. A
 * frame must not be captured, nor the LED display rasterized, before they are in, so every face is
 * loaded up front for every string the film shows.
 */
const REQUESTS = [
  "400 40px 'Inter Variable'",
  "900 40px 'Inter Variable'",
  "400 40px 'Noto Sans SC Variable'",
  "900 40px 'Noto Sans SC Variable'",
];

const loaded = new Set<string>();
const loading = new Map<string, Promise<void>>();

function loadFonts(sample: string): Promise<void> {
  const existing = loading.get(sample);
  if (existing) return existing;
  const pending = Promise.all(REQUESTS.map((request) => document.fonts.load(request, sample))).then(
    () => {
      loaded.add(sample);
    },
  );
  loading.set(sample, pending);
  return pending;
}

/** Holds the render until the faces are loaded; true once they are. */
export function useFontsReady(sample: string): boolean {
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [ready, setReady] = useState(() => loaded.has(sample));
  const [handle] = useState(() => (loaded.has(sample) ? null : delayRender('Loading fonts')));

  useEffect(() => {
    if (handle === null) return;
    loadFonts(sample)
      .then(() => {
        setReady(true);
        continueRender(handle);
      })
      .catch((error: unknown) => cancelRender(error));
  }, [cancelRender, continueRender, handle, sample]);

  return ready;
}
