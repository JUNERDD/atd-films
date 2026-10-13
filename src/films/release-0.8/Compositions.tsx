import { Composition } from 'remotion';
import { RELEASE_SCENES } from './scenes.ts';
import { RELEASE_SECTIONS, FPS, WIDTH, HEIGHT, toFrames } from './timeline.ts';
import { ReleaseWorldSheet, SHEET_LENGTH } from './world/sheet/ReleaseWorldSheet.tsx';
const FRAME = { width: WIDTH, height: HEIGHT, fps: FPS } as const;

export function ReleaseScenes() {
  return (
    <>
      {RELEASE_SCENES.map(({ id, name, Scene }) => (
        <Composition
          key={id}
          id={name}
          component={Scene}
          {...FRAME}
          durationInFrames={toFrames(RELEASE_SECTIONS[id].end - RELEASE_SECTIONS[id].start)}
          defaultProps={{ lang: 'en' as const }}
        />
      ))}
      <Composition
        id="R08WorldSheet"
        component={ReleaseWorldSheet}
        {...FRAME}
        durationInFrames={toFrames(SHEET_LENGTH)}
      />
    </>
  );
}
