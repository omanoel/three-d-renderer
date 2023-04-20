export interface IClickable<E> {
  onMouseOver: (event: E) => void;
  onMouseOut: (event: E) => void;
  onMouseClick: (event: E) => void;
}
