import type { ReactNode } from 'react';
import { Img, staticFile } from 'remotion';
import { MenuBar } from '../../shared/world/MenuBar.tsx';
import { DropsGlyph } from '../../shared/product/DropsGlyph.tsx';
import { Camera } from '../../shared/world/Camera.tsx';
import { smoothstep } from '../../shared/motion/ease.ts';
import { filmCameraAt } from './shots.ts';
import { chapterPresence } from './editing.ts';
import { chapterAt, CUTS, type ChapterId } from './timeline.ts';
import './desktop.css';

const APPS = ['finder', 'safari', 'codex', 'mail', 'notes'] as const;

export function AppIcon({ app }: { app: (typeof APPS)[number] }) {
  return <Img src={staticFile(`command-film/${app}.png`)} alt={app} />;
}

/** One continuous desktop sits below the overlapping windows throughout the film. */
export function DesktopBackdrop({ t }: { t: number }) {
  const chapter = chapterAt(t);
  const app = {
    open: 'Finder',
    code: 'Codex',
    mail: '邮件',
    notes: '备忘录',
    setup: 'Atd',
    close: 'Atd',
  }[chapter.id];
  const chrome =
    smoothstep(CUTS.code.start - 0.3, CUTS.code.start + 0.3, t) *
    (1 - smoothstep(CUTS.close.start - 0.45, CUTS.close.start + 0.15, t));
  return (
    <Camera state={filmCameraAt(chapter.id, t - chapter.start)}>
      <div className="cf-desktop">
        <Img
          className="cf-wallpaper"
          src={staticFile('command-film/wallpaper.jpg')}
          alt="Atd website Mac desktop wallpaper"
        />
        <div className="cf-wallpaper-shade" />
        <div className="cf-point-space cf-desktop-chrome" style={{ '--chrome': chrome }}>
          <MenuBar
            appName={app}
            menus={['文件', '编辑', '显示', '窗口', '帮助']}
            clock="10月13日 周二  9:41"
          />
          <div className="cf-dock">
            {APPS.map((name) => (
              <div
                className="cf-dock-item"
                data-active={name === 'finder' || name === 'codex' || undefined}
                key={name}
              >
                <AppIcon app={name} />
              </div>
            ))}
            <i className="cf-dock-divider" />
            <div className="cf-dock-item" data-active="">
              <div className="cf-dock-atd">
                <DropsGlyph className="cf-atd-glyph" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Camera>
  );
}

/** Window-only camera layer. The wallpaper and chrome are owned once by DesktopBackdrop. */
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
  const presence = chapterPresence(scene, t);
  return (
    <>
      <div
        className="cf-scene-layer"
        style={{
          '--layer-o': presence.opacity,
          '--layer-x': presence.x,
          '--layer-y': presence.y,
          '--layer-s': presence.scale,
          '--layer-blur': presence.blur,
        }}
      >
        <Camera state={filmCameraAt(scene, t)}>
          <div className="cf-point-space">
            <div className="cf-scene-content">{children}</div>
          </div>
        </Camera>
      </div>
      <div className="cf-film-hud" style={{ '--hud-o': presence.caption }}>
        {overlay}
      </div>
    </>
  );
}

export function KeyHint({
  keys,
  label,
  side = false,
  pressed = false,
}: {
  keys: readonly string[];
  label: string;
  side?: boolean;
  pressed?: boolean;
}) {
  return (
    <div className="cf-key-hint" data-side={side || undefined} data-pressed={pressed || undefined}>
      {keys.map((key) => (
        <kbd key={key}>{key}</kbd>
      ))}
      <span>{label}</span>
    </div>
  );
}
