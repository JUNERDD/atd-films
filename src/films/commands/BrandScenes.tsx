import { DropsGlyph } from '../../shared/product/DropsGlyph.tsx';
import { SelectionCapsule } from '../../shared/product/SelectionCapsule.tsx';
import { Cursor } from '../../shared/world/Cursor.tsx';
import { cursorAt } from '../../shared/world/cursor.ts';
import { textWidthAt } from '../../shared/world/measure.ts';
import { springAt } from '../../shared/motion/spring.ts';
import { CodingComposer } from './CodingWindow.tsx';
import { PROMPT_BEFORE } from './content.ts';
import { AppIcon, MacDesktop } from './MacDesktop.tsx';
import { CODE } from './timeline.ts';
import { pointerPresence, useChapterTime } from './editing.ts';
import './brand.css';

function Identity() {
  return (
    <div className="cf-brand-identity">
      <DropsGlyph className="cf-atd-glyph" />
      <b>Atd</b>
      <span>Command</span>
    </div>
  );
}

function PromptMacro({ t }: { t: number }) {
  const enter = springAt(t, 0.13, { response: 0.65, damping: 1 });
  const pointer = cursorAt(t, [
    { at: 0, x: 570, y: 228 },
    { at: 0.3, x: 46, y: 71, travel: 0.22 },
    { at: 0.45, x: 46, y: 71, press: 'down' },
    {
      at: 0.85,
      x: 46 + textWidthAt(PROMPT_BEFORE[1] ?? '', 400, 16),
      y: 98,
      press: 'up',
      travel: 0.4,
    },
    { at: 1.22, x: 207, y: 26, travel: 0.22 },
  ]);
  const sceneTime = t < 0.45 ? 0 : t < 0.85 ? CODE.drag : CODE.select;
  return (
    <div className="cf-brand-demo" style={{ '--enter': enter }}>
      <div className="cf-brand-context">
        <AppIcon app="codex" />
        在你正在用的输入框里
      </div>
      <CodingComposer
        t={sceneTime}
        pointer={{ ...pointer, x: pointer.x + 276, y: pointer.y + 486 }}
      />
      {t >= 0.98 && (
        <div className="cf-native-tool" style={{ '--x': 46, '--y': 8 }}>
          <SelectionCapsule
            lang="zh"
            commands={['完善编程需求']}
            more={false}
            options="all"
            entrance={t - 0.98}
            hover={t >= 1.22 ? 1 : undefined}
          />
        </div>
      )}
      <Cursor state={pointer} size={1.05} opacity={pointerPresence(t, 1.4)} />
    </div>
  );
}

export function BrandScene({ closing = false }: { closing?: boolean }) {
  const t = useChapterTime(closing ? 'close' : 'open');
  const first = springAt(t, 0.02, { response: 0.44, damping: 1 });
  const second = springAt(t, 0.16, { response: 0.48, damping: 1 });
  const third = springAt(t, 0.34, { response: 0.52, damping: 1 });
  return (
    <MacDesktop t={t} scene={closing ? 'close' : 'open'}>
      {closing ? (
        <div
          className="cf-brand-close"
          style={{ '--first': first, '--second': second, '--third': third }}
        >
          <div className="cf-close-name">
            <DropsGlyph className="cf-atd-glyph" />
            <b>Atd</b>
          </div>
          <div className="cf-close-word">
            <span>Command</span>
          </div>
          <h1>好方法，随处可用。</h1>
          <div className="cf-close-apps">
            <span>
              <AppIcon app="codex" />
              编码
            </span>
            <span>
              <AppIcon app="mail" />
              写作
            </span>
            <span>
              <AppIcon app="notes" />
              整理
            </span>
          </div>
          <div className="cf-film-disclosure">
            基于现有功能的情景演示 · 示例内容与结果 · 演示节奏经过编排
          </div>
        </div>
      ) : (
        <>
          <div className="cf-brand-open" style={{ '--first': first, '--second': second }}>
            <Identity />
            <h1>
              <span>选中。</span>
              <span>就能用。</span>
            </h1>
            <p>让常用提示词，回到工作现场。</p>
          </div>
          <PromptMacro t={t} />
          <div className="cf-brand-bottom">
            ATD FOR macOS <span>选中 → 调用 → 原位写回</span>
          </div>
        </>
      )}
    </MacDesktop>
  );
}
