import { DropsGlyph } from '../../shared/product/DropsGlyph.tsx';
import { SelectionCapsule } from '../../shared/product/SelectionCapsule.tsx';
import { smoothstep } from '../../shared/motion/ease.ts';
import { springAt } from '../../shared/motion/spring.ts';
import { MacDesktop } from './MacDesktop.tsx';
import { useChapterTime } from './editing.ts';
import './brand.css';

export function BrandScene({ closing = false }: { closing?: boolean }) {
  const t = useChapterTime(closing ? 'close' : 'open');
  const first = springAt(t, 0.02, { response: 0.5, damping: 1 });
  const second = springAt(t, closing ? 0.24 : 0.65, { response: 0.5, damping: 1 });
  const third = springAt(t, closing ? 0.42 : 0.24, { response: 0.58, damping: 1 });
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
          <h1>好方法，随手可用。</h1>
          <div className="cf-film-disclosure">
            情景演示 · 示例内容 · 节奏经过编排 · 快捷键为自定义示例
          </div>
        </div>
      ) : (
        <div
          className="cf-brand-open"
          style={{
            '--first': first,
            '--second': second,
            '--third': third,
            '--light': smoothstep(1.05, 1.8, t),
          }}
        >
          <div className="cf-open-label">
            <DropsGlyph className="cf-atd-glyph" />
            Atd Command
          </div>
          <h1>
            <span>常用的提示词。</span>
            <strong>选中，就能用。</strong>
          </h1>
          <div className="cf-open-toolbar">
            <SelectionCapsule
              lang="zh"
              commands={['翻译', '完善编程需求', '提取待办事项']}
              more={false}
              options="all"
              entrance={t - 0.3}
            />
          </div>
        </div>
      )}
    </MacDesktop>
  );
}
