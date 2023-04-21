export interface ITickable {
  tick: (delta: number) => void;
  tickable: true;
}
