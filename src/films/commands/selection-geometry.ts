import type { Point } from '../../shared/world/points.ts';
import { textWidthAt } from '../../shared/world/measure.ts';
import { strings } from '../../shared/product/strings.ts';

/** Native toolbar spacing from SelectionCapsule; measure only after the film fonts are ready. */
export function toolbarTargets(origin: Point, command: string) {
  const askWidth = 20 + 14 + 6 + textWidthAt(strings.zh.selection.ask, 500, 13);
  const commandLeft = origin.x + 4 + 16 + 2 + askWidth + 2;
  const commandWidth = 20 + textWidthAt(command, 500, 13);
  return {
    command: { x: commandLeft + commandWidth / 2, y: origin.y + 18 },
    chevron: { x: commandLeft + commandWidth + 14, y: origin.y + 18 },
  };
}
