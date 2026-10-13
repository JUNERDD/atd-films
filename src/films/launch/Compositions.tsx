import { Composition, Folder } from 'remotion';
import { SCENES } from './scenes.ts';
import { FPS, HEIGHT, SECTIONS, toFrames, WIDTH } from './timeline.ts';
const FRAME = { width: WIDTH, height: HEIGHT, fps: FPS } as const;

export function LaunchScenes() {
  return (
    <>
      <Folder name="Scenes">
        {SCENES.map(({ id, name, Scene }) => (
          <Composition
            key={id}
            id={name}
            component={Scene}
            {...FRAME}
            durationInFrames={toFrames(SECTIONS[id].end - SECTIONS[id].start)}
            defaultProps={{ lang: 'en' as const }}
          />
        ))}
      </Folder>
    </>
  );
}
