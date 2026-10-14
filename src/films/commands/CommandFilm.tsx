import { Audio } from '@remotion/media';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { useFilmFonts } from './fonts.ts';
import { KineticTitles } from './KineticTitles.tsx';
import { MailObject } from './MailObject.tsx';
import { PromptObject } from './PromptObject.tsx';
import { NotesObject } from './NotesObject.tsx';
import { ClosingBrand } from './ClosingBrand.tsx';
import { COMMAND_FPS } from './timeline.ts';
import './kinetic-film.css';
import './kinetic-objects.css';

/** A single editorial stage; objects retain their identity across the narrative landmarks. */
export function CommandFilm() {
  useFilmFonts();
  const t = useCurrentFrame() / COMMAND_FPS;
  return (
    <AbsoluteFill className="film command-film-v2">
      <NotesObject t={t} />
      <MailObject t={t} />
      <PromptObject t={t} />
      <KineticTitles t={t} />
      <ClosingBrand t={t} />
      <Audio src={staticFile('audio/command-film.wav')} />
    </AbsoluteFill>
  );
}
