import { Group } from 'three';

export abstract class AbstractCleanableGroup extends Group {
  constructor() {
    super();
    this.userData.cleanable = true;
  }
}

export abstract class AbstractClickableGroup extends AbstractCleanableGroup {
  constructor() {
    super();
    this.userData.clickable = true;
    this.userData.onMouseOver = this.onMouseOver.bind(this);
    this.userData.onMouseOut = this.onMouseOut.bind(this);
    this.userData.onMouseDblClick = this.onMouseDblClick.bind(this);
  }
  public abstract onMouseOver(): void;
  public abstract onMouseOut(): void;
  public abstract onMouseDblClick(): void;
}

export abstract class AbstractTickableGroup extends AbstractClickableGroup {
  constructor() {
    super();
    this.userData.tickable = true;
    this.userData.tick = this.tick.bind(this);
  }
  public abstract tick(delta: number): void;
}
