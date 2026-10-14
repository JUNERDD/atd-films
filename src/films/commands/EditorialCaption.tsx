import { springAt } from '../../shared/motion/spring.ts';
import { smoothstep } from '../../shared/motion/ease.ts';
import { MAIL, NOTES } from './timeline.ts';
import './editorial.css';

const COPY = {
  mail: { start: 0.02, end: MAIL.press - 0.15, words: ['中文写下。', '英文写回。'] },
  setup: { start: 0.02, end: 0.8, words: ['好方法，', '存下来。'] },
  code: { start: 0.02, end: 1.3, words: ['下一次，', '直接用。'] },
  notes: { start: NOTES.dismiss + 0.4, end: 11, words: ['保留原文。', '接上下一步。'] },
} as const;
/** Withdraw editorial copy while the product asks the viewer to read controls. */
export function EditorialCaption({ scene, t }: { scene: keyof typeof COPY; t: number }) {
  const copy = COPY[scene];
  const enter = springAt(t, copy.start, { response: 0.46, damping: 1 });
  const leave = smoothstep(copy.end - 0.22, copy.end, t);
  return (
    <div
      className="cf-editorial-copy"
      data-scene={scene}
      style={{ '--copy-o': enter * (1 - leave), '--copy-y': (1 - enter) * 22 }}
    >
      <span>{copy.words[0]}</span>
      <strong>{copy.words[1]}</strong>
    </div>
  );
}
