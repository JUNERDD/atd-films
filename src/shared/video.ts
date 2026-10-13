/** The existing kits' design canvas and the launch/release films' frame rate. */
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FPS = 60;

export function toFrames(seconds: number): number {
  return Math.round(seconds * FPS);
}
