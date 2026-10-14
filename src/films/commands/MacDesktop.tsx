import type { ReactNode } from 'react';
import { Img, staticFile } from 'remotion';
import { Camera } from '../../shared/world/Camera.tsx';
import { smoothstep } from '../../shared/motion/ease.ts';
import { filmCameraAt } from './shots.ts';
import { chapterVisible } from './editing.ts';
import { CUTS, type ChapterId } from './timeline.ts';
import './desktop.css';

export function AppIcon({ app }: { app: 'codex' | 'mail' | 'notes' }) {
  return <Img src={staticFile(`command-film/${app}.png`)} alt={app} />;
}
/** The blue entrance clears to a quiet stage before the first full proof. */
export function DesktopBackdrop({ t }: { t: number }) {
  return (
    <div className="cf-backdrop" data-closing={t >= CUTS.close.start || undefined}>
      {t < CUTS.mail.start && (
        <div className="cf-blue-intro" style={{ '--blue-o': 1 - smoothstep(1.05, 1.8, t) }}>
          <Img
            className="cf-wallpaper"
            src={staticFile('command-film/wallpaper.jpg')}
            alt="Atd desktop wallpaper"
          />
          <div className="cf-wallpaper-shade" />
        </div>
      )}
    </div>
  );
}
/** A filmed point space, with the pointer and UI passing through the same camera. */
export function MacDesktop({
  children,
  t,
  scene,
  overlay,
}: {
  children: ReactNode;
  t: number;
  scene: ChapterId;
  overlay?: ReactNode;
}) {
  return (
    <div className="cf-scene-layer" style={{ '--layer-o': chapterVisible(scene, t) }}>
      <Camera state={filmCameraAt(scene, t)}>
        <div className="cf-point-space">{children}</div>
      </Camera>
      <div className="cf-film-hud">{overlay}</div>
    </div>
  );
}
export function KeyHint({
  keys,
  label,
  pressed = false,
}: {
  keys: readonly string[];
  label: string;
  pressed?: boolean;
}) {
  return (
    <div className="cf-key-hint" data-pressed={pressed || undefined}>
      {keys.map((key) => (
        <kbd key={key}>{key}</kbd>
      ))}
      <span>{label}</span>
    </div>
  );
}
