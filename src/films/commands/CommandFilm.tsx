import { Audio } from '@remotion/media';
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { useFilmFonts } from './fonts.ts';
import { BrandScene } from './BrandScenes.tsx';
import { SetupScene } from './SetupScene.tsx';
import { CodeScene } from './CodeScene.tsx';
import { MailScene } from './MailScene.tsx';
import { NotesScene } from './NotesScene.tsx';
import { DesktopBackdrop } from './MacDesktop.tsx';
import { CHAPTERS, COMMAND_FPS, chapterLead, chapterTail, frames } from './timeline.ts';

const SCENES = {
  open: BrandScene,
  setup: SetupScene,
  code: CodeScene,
  mail: MailScene,
  notes: NotesScene,
  close: BrandScene,
};

/** Offline, source-grounded UI animation. No app automation, screen capture, or network model calls. */
export function CommandFilm() {
  useFilmFonts();
  const t = useCurrentFrame() / COMMAND_FPS;
  return (
    <AbsoluteFill className="film command-film">
      <DesktopBackdrop t={t} />
      {CHAPTERS.map((chapter) => {
        const Scene = SCENES[chapter.id];
        return (
          <Sequence
            key={chapter.id}
            from={frames(chapter.start - chapterLead(chapter.id))}
            durationInFrames={frames(
              chapter.end - chapter.start + chapterLead(chapter.id) + chapterTail(chapter.id),
            )}
            name={chapter.id}
          >
            <Scene closing={chapter.id === 'close'} />
          </Sequence>
        );
      })}
      <Audio src={staticFile('audio/command-film.wav')} />
    </AbsoluteFill>
  );
}
