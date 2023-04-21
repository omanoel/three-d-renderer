export interface IClickable<MouseEvent> {
  onMouseOver: (event: MouseEvent) => void;
  onMouseOut: (event: MouseEvent) => void;
  onMouseClick: (event: MouseEvent) => void;
}
