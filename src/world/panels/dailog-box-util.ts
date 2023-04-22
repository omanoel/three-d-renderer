import { ThreeDRendererDialogBox } from './dialog-box';
import { ThreeDRendererDialogBoxOptions } from './dialog-box-options';

export class ThreeDRendererDialogBoxUtil {
  private _dialogBoxes: Map<string, ThreeDRendererDialogBox> = new Map();

  add(
    domContainer: HTMLDivElement,
    options: ThreeDRendererDialogBoxOptions
  ): ThreeDRendererDialogBox {
    const dialogBox = new ThreeDRendererDialogBox(domContainer, options);
    this._dialogBoxes.set(options.id, dialogBox);
    return dialogBox;
  }

  get(id: string): ThreeDRendererDialogBox | undefined {
    return this._dialogBoxes.get(id);
  }

  del(id: string): void {
    if (this._dialogBoxes.has(id)) {
      this._dialogBoxes.delete(id);
    }
  }

  show(id: string): void {
    this._dialogBoxes.forEach((db) => db.hide());
    this.get(id)?.show();
  }

  hide(id: string): void {
    this.get(id)?.hide();
  }
}
