import { Composition, Folder } from 'remotion';
import { CommandFilm } from './films/commands/CommandFilm.tsx';
import { COMMAND_DURATION, COMMAND_FPS } from './films/commands/timeline.ts';
// The base stylesheet loads before the components' own, which build on it.
import './shared/styles/film.css';
import { ProductSheet } from './shared/product/Sheet.tsx';
import { WorldSheet } from './shared/world/Sheet.tsx';
import { Promo } from './films/launch/Promo.tsx';
import { ReleaseFilm } from './films/release-0.8/ReleaseFilm.tsx';
import { ReleaseScenes } from './films/release-0.8/Compositions.tsx';
import { RELEASE_DURATION } from './films/release-0.8/timeline.ts';
import { LaunchScenes } from './films/launch/Compositions.tsx';
import { DURATION } from './films/launch/timeline.ts';
import { FPS, HEIGHT, toFrames, WIDTH } from './shared/video.ts';

const FRAME = { width: WIDTH, height: HEIGHT, fps: FPS } as const;

/**
 * Keep full-film IDs and inline defaultProps in the discoverable root: Remotion Studio's
 * props editor locates them here when saving. Film implementation and scene previews remain
 * film-owned; this file only assembles the Studio catalog.
 */
export function RemotionRoot() {
  return (
    <>
      <Composition
        id="AtdCommandsZh"
        component={CommandFilm}
        width={1920}
        height={1080}
        fps={COMMAND_FPS}
        durationInFrames={COMMAND_DURATION * COMMAND_FPS}
      />
      <Composition
        id="AtdPromo"
        component={Promo}
        {...FRAME}
        durationInFrames={toFrames(DURATION)}
        defaultProps={{ lang: 'en' }}
      />
      <Composition
        id="AtdPromoZh"
        component={Promo}
        {...FRAME}
        durationInFrames={toFrames(DURATION)}
        defaultProps={{ lang: 'zh' }}
      />
      <LaunchScenes />
      <Folder name="Release">
        <Composition
          id="AtdRelease"
          component={ReleaseFilm}
          {...FRAME}
          durationInFrames={toFrames(RELEASE_DURATION)}
          defaultProps={{ lang: 'en' as const }}
        />
        <Composition
          id="AtdReleaseZh"
          component={ReleaseFilm}
          {...FRAME}
          durationInFrames={toFrames(RELEASE_DURATION)}
          defaultProps={{ lang: 'zh' as const }}
        />
        <ReleaseScenes />
      </Folder>
      <Folder name="Kits">
        <Composition
          id="WorldSheet"
          component={WorldSheet}
          {...FRAME}
          durationInFrames={toFrames(8)}
        />
        <Composition
          id="ProductSheet"
          component={ProductSheet}
          {...FRAME}
          durationInFrames={toFrames(8)}
          defaultProps={{ lang: 'en' as const }}
        />
      </Folder>
    </>
  );
}
