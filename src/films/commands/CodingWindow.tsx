import { ArrowUp, ChevronDown, GitBranch, Mic, Plus } from 'lucide-react';
import type { CursorState } from '../../shared/world/cursor.ts';
import { textWidthAt } from '../../shared/world/measure.ts';
import { PROMPT_AFTER, PROMPT_BEFORE } from './content.ts';
import { AppIcon } from './MacDesktop.tsx';
import { CODE as B } from './timeline.ts';
import './code.css';

/** The only coding outcome is an unsent prompt, replaced in this same composer. */
export function CodingWindow({ t, pointer }: { t: number; pointer: CursorState }) {
  const written = t >= B.written;
  const lines = written ? PROMPT_AFTER : PROMPT_BEFORE;
  const selection = (line: string, index: number) => {
    if (t < B.drag || written) return 0;
    if (t >= B.select) return 1;
    const lineY = 400 + index * 40;
    if (pointer.y > lineY + 18) return 1;
    if (pointer.y < lineY - 18) return 0;
    return Math.min(1, Math.max(0, (pointer.x - 452) / textWidthAt(line, 400, 24)));
  };
  return (
    <div className="cf-code-artifact">
      <div className="cf-app-context">
        <AppIcon app="codex" />
        <span>Codex</span>
        <i />
        atlas-store
      </div>
      <div className="cf-agent-composer">
        <div className="cf-agent-input">
          {lines.map((line, index) => (
            <div key={line}>
              <span style={{ '--selection': selection(line, index) }}>{line}</span>
            </div>
          ))}
        </div>
        <div className="cf-agent-composer-tools">
          <Plus />
          <span>
            Codex <ChevronDown />
          </span>
          <span>
            高 <ChevronDown />
          </span>
          <Mic />
          <div className="cf-agent-send">
            <ArrowUp />
          </div>
        </div>
      </div>
      <div className="cf-agent-context">
        <GitBranch />
        main
      </div>
    </div>
  );
}
