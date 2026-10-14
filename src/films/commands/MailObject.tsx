import { ArrowUpRight, Languages, Mail, Paperclip } from 'lucide-react';
import { Cursor } from '../../shared/world/Cursor.tsx';
import { cursorAt } from '../../shared/world/cursor.ts';
import { MAIL_AFTER, MAIL_BEFORE } from './content.ts';
import { CommandControl } from './CommandControl.tsx';
import { controlTarget } from './selection-geometry.ts';
import { arrive, anticipate, fade, visible } from './kinetic-motion.ts';
import { CUTS, MOTION, TRANSLATE } from './timeline.ts';

export function MailObject({ t }: { t: number }) {
  const at = CUTS.translate.start;
  const clock = t - at;
  const wide = arrive(t, 0.76, 0.46, 0.78);
  const unfold = arrive(t, MOTION.draft, 0.6, 0.8);
  const fold = arrive(t, MOTION.fan, 0.68, 0.77);
  const pull = anticipate(clock, TRANSLATE.fold - 0.15);
  const leave = arrive(t, 8.7, 0.64, 0.85);
  const written = clock >= TRANSLATE.written;
  const target = controlTarget('翻译', 84, 304);
  const cursor = cursorAt(clock, [
    { at: 0.13, x: 115, y: 214, press: 'down' },
    { at: TRANSLATE.select, x: 650, y: 214, travel: 0.32, press: 'up' },
    { at: TRANSLATE.invoke - 0.06, ...target, travel: 0.33 },
    { at: TRANSLATE.invoke, ...target, press: true },
    { at: TRANSLATE.invoke + 0.38, x: 1080, y: 374, travel: 0.28 },
  ]);
  return (
    <div
      className="c2-object c2-mail-object"
      style={{
        '--x': 650 - wide * 330 - unfold * 10 - fold * 60 - leave * 1200,
        '--y': 425 - unfold * 95 + fold * 75 + pull * 13 + leave * 270,
        '--w': 620 + wide * 660 + unfold * 20 - fold * 740,
        '--h': 180 + unfold * 320 - fold * 135,
        '--r': 16 + unfold * 24 - fold * 8,
        '--rotate': -fold * 12 - leave * 14 + pull * 1.6,
        '--o': 1 - fade(t, 9.05, 0.22),
        '--blue': 1 - fade(t, 1.82, 0.3),
        '--shadow': fade(t, 1.85, 0.25),
      }}
    >
      <div className="c2-surface" />
      <div
        className="c2-paper-content"
        style={{
          '--o': visible(t, 2.04, at + TRANSLATE.fold + 0.15, 0.17),
          '--paper-scale': (1300 - 740 * fold) / 1300,
        }}
      >
        <div className="c2-document-header">
          <Mail />
          <span>Alex</span>
          <small>草稿 · 未发送</small>
        </div>
        <div className="c2-mail-text">
          <span
            data-result={written || undefined}
            style={{ '--selection': written ? 0 : fade(clock, 0.16, TRANSLATE.select - 0.16) }}
          >
            {written ? MAIL_AFTER[0] : MAIL_BEFORE[0]}
          </span>
        </div>
        <div className="c2-mail-accessory">
          <Paperclip />
        </div>
        <div className="c2-mail-command">
          <CommandControl
            t={clock}
            at={TRANSLATE.select + 0.035}
            invoke={TRANSLATE.invoke}
            command="翻译"
            saved="英语 · 已保存"
          />
        </div>
        <Cursor state={cursor} size={2.8} opacity={visible(clock, 0.1, TRANSLATE.invoke + 0.4)} />
      </div>
      <div className="c2-command-face" style={{ '--o': fade(clock, TRANSLATE.fold + 0.32, 0.2) }}>
        <Languages />
        <div>
          <span>翻译</span>
          <small>英语</small>
        </div>
        <ArrowUpRight className="c2-face-arrow" />
      </div>
    </div>
  );
}
