import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileCode2,
  Folder,
  GitBranch,
  Globe,
  Mic,
  PanelLeft,
  Plus,
  RotateCw,
  Settings2,
  Sparkles,
  Square,
  SquarePen,
  Terminal,
} from 'lucide-react';
import { MacWindow } from '../../shared/world/MacWindow.tsx';
import type { CursorState } from '../../shared/world/cursor.ts';
import { textWidthAt } from '../../shared/world/measure.ts';
import { PROMPT_AFTER, PROMPT_BEFORE } from './content.ts';
import { StorePreview } from './StorePreview.tsx';
import { CODE as B } from './timeline.ts';
import './code.css';

function Sidebar() {
  return (
    <div className="cf-agent-sidebar">
      <div>
        <SquarePen />
        新建任务
      </div>
      <div>
        <Clock3 />
        自动化
      </div>
      <div>
        <Sparkles />
        技能
      </div>
      <small>
        项目 <Plus />
      </small>
      <div className="cf-agent-project">
        <ChevronDown />
        <Folder />
        atlas-store
      </div>
      <div data-current="">购物车金额修复</div>
      <div className="cf-agent-recent">完成购物袋页面</div>
      <div className="cf-agent-recent">调整移动端布局</div>
      <footer>
        <Settings2 />
        设置
      </footer>
    </div>
  );
}

function Transcript({ t }: { t: number }) {
  const submitted = t >= B.sent;
  return (
    <div className="cf-agent-transcript">
      {!submitted ? (
        <>
          <div className="cf-agent-user">做一个简洁的购物袋页面，支持修改商品数量。</div>
          <p className="cf-agent-reply">页面已完成。你可以在右侧预览，继续描述需要调整的地方。</p>
          <div className="cf-agent-file">
            <FileCode2 />
            App.tsx <span>+86 −12</span>
          </div>
        </>
      ) : (
        <>
          <div className="cf-agent-user">
            {PROMPT_AFTER.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
          {t >= B.respond && (
            <p className="cf-agent-reply">我会检查总价计算，补上数量，并验证小数金额。</p>
          )}
          {t >= B.inspect && (
            <div className="cf-agent-activity">
              <div>
                <ChevronRight />
                <span>{t < B.edit ? '正在检查 src/cart.ts' : '已检查 src/cart.ts'}</span>
              </div>
              {t >= B.edit && (
                <div>
                  <FileCode2 />
                  <span>已修改 cart.ts</span>
                  <em>+4 −1</em>
                </div>
              )}
              {t >= B.verify && (
                <div>
                  <Terminal />
                  <span>{t < B.verified ? '正在运行金额计算测试…' : '数量与小数金额测试通过'}</span>
                  {t >= B.verified && <Check />}
                </div>
              )}
            </div>
          )}
          {t >= B.complete && (
            <div className="cf-agent-result">
              <p>
                已修复。示例总价为 <strong>¥755</strong>，页面预览已更新。
              </p>
              <span>
                <GitBranch />
                查看更改 <b>+4</b>
                <em>−1</em>
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function CodingComposer({ t, pointer }: { t: number; pointer: CursorState }) {
  const submitted = t >= B.sent;
  const written = t >= B.written;
  const lines = written ? PROMPT_AFTER : PROMPT_BEFORE;
  const selecting = t >= B.drag && t < B.written;
  const selection = (line: string, index: number) => {
    if (!selecting) return 0;
    if (t >= B.select) return 1;
    const lineY = 557 + index * 27;
    if (pointer.y > lineY + 12) return 1;
    if (pointer.y < lineY - 12) return 0;
    return Math.min(1, Math.max(0, (pointer.x - 322) / textWidthAt(line, 400, 16)));
  };
  return (
    <div className="cf-agent-composer" data-submitted={submitted || undefined}>
      <div className="cf-agent-input">
        {submitted ? (
          <span className="cf-agent-placeholder">继续描述你想做的修改…</span>
        ) : (
          lines.map((line, i) => (
            <div key={line}>
              <span style={{ '--selection': selection(line, i) }}>{line}</span>
            </div>
          ))
        )}
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
        <div
          className="cf-agent-send"
          data-hover={(t >= B.sendHover && t < B.sent) || undefined}
          data-pressed={(t >= B.sendClick && t < B.sent) || undefined}
        >
          {submitted && t < B.complete ? <Square /> : <ArrowUp />}
        </div>
      </div>
    </div>
  );
}

export function CodingWindow({ t, pointer }: { t: number; pointer: CursorState }) {
  return (
    <div className="cf-agent-window">
      <MacWindow
        box={{ x: 64, y: 164, width: 1472, height: 592 }}
        sidebar={<Sidebar />}
        sidebarWidth={204}
        title="购物车金额修复"
        toolbar={
          <div className="cf-agent-window-tools">
            <GitBranch />
            main
            <PanelLeft />
          </div>
        }
      >
        <div className="cf-agent-layout">
          <section className="cf-agent-thread">
            <Transcript t={t} />
            {t >= B.respond && t < B.complete && (
              <div className="cf-agent-working">
                {t < B.edit ? '思考中' : t < B.verified ? '处理中' : '正在更新预览'}
                <span />
              </div>
            )}
            <CodingComposer t={t} pointer={pointer} />
            <div className="cf-agent-context">
              <Globe />
              本地 <ChevronDown />
              <GitBranch />
              main
            </div>
          </section>
          <section className="cf-agent-browser">
            <div className="cf-agent-browser-bar">
              <ArrowLeft />
              <ArrowRight />
              <RotateCw />
              <span>localhost:5173</span>
              <Plus />
            </div>
            <StorePreview fixed={t >= B.preview} />
          </section>
        </div>
      </MacWindow>
    </div>
  );
}
