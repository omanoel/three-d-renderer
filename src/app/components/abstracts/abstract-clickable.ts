import { AbstractTickable } from './abstract-tickable';

export abstract class AbstractClickable extends AbstractTickable {
  public abstract onMouseOver(): void;
  public abstract onMouseOut(): void;
  public abstract onMouseEnter(): void;
  public abstract onMouseLeave(): void;
  public abstract onMouseClick(): void;
}
