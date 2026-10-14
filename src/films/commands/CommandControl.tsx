import { Check, ChevronDown } from 'lucide-react';
import { SelectionCapsule } from '../../shared/product/SelectionCapsule.tsx';
import { arrive, fade, visible } from './kinetic-motion.ts';
import './kinetic-controls.css';

/** Magnified crop of the checked-in native selection toolbar, with a saved-value annotation. */
export function CommandControl({
  t,
  at,
  invoke,
  command,
  saved,
}: {
  t: number;
  at: number;
  invoke: number;
  command: string;
  saved?: string;
}) {
  const held = t >= invoke && t < invoke + 0.13;
  return (
    <div
      className="c2-command-control"
      style={{ '--o': visible(t, at, invoke + 0.16), '--lift': 18 * (1 - arrive(t, at)) }}
    >
      <div className="c2-native-toolbar">
        <SelectionCapsule
          lang="zh"
          commands={[command]}
          more={false}
          options="all"
          entrance={t - at}
          hover={t >= invoke - 0.2 ? 1 : undefined}
          pressed={held ? 1 : undefined}
        />
      </div>
      {saved && <div className="c2-saved-value">{saved}</div>}
    </div>
  );
}

/** Authored close-up of the output choice; the selected destination precedes Run. */
export function OutputChoice({
  t,
  at,
  choose,
  invoke,
}: {
  t: number;
  at: number;
  choose: number;
  invoke: number;
}) {
  const selected = t >= choose;
  return (
    <div
      className="c2-output-choice"
      style={{ '--o': visible(t, at, invoke + 0.13), '--lift': 22 * (1 - arrive(t, at, 0.38)) }}
    >
      <div className="c2-output-label">输出位置</div>
      <div className="c2-output-field">
        <span>{selected ? '插入选区后' : '显示在对话中'}</span>
        <ChevronDown />
      </div>
      <div className="c2-output-menu" style={{ '--menu-o': 1 - fade(t, choose + 0.12, 0.16) }}>
        <div className="c2-output-option">显示在对话中</div>
        <div className="c2-output-option" data-picked={selected || undefined}>
          <Check />
          插入选区后
        </div>
      </div>
    </div>
  );
}
