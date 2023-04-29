import { Color, Object3D } from 'three';
import { App } from './app';
import './style.css';

const container = document.querySelector<HTMLDivElement>('#scene-container');

const states = {
  grid: true,
  axes: true
};
if (container !== null) {
  const app = new App(container);
  const cube = app.appApi?.buildCube({
    onMouseOver: (event: Event, obj: Object3D) => {
      (obj.children[0] as any).material.color = new Color('blue');
    },
    onMouseOut: (event: Event, obj: Object3D) => {
      (obj.children[0] as any).material.color = new Color('brown');
    }
  });
  if (cube) {
    app.worldApi?.addObject(cube);
  }
  app.render();
  document.getElementById('reset-btn')?.addEventListener(
    'click',
    (mouseEvent: MouseEvent) => {
      app.worldApi?.resetView();
      mouseEvent.stopPropagation();
    },
    false
  );
  document.getElementById('grid-btn')?.addEventListener(
    'click',
    (mouseEvent: MouseEvent) => {
      states.grid = !states.grid;
      if (states.grid) {
        app.worldApi?.showByType('ThreeDRendererGridsHelper');
      } else {
        app.worldApi?.hideByType('ThreeDRendererGridsHelper');
      }
      mouseEvent.stopPropagation();
    },
    false
  );
  document.getElementById('focus-btn')?.addEventListener(
    'click',
    (mouseEvent: MouseEvent) => {
      app.worldApi?.focusView([]);
      mouseEvent.stopPropagation();
    },
    false
  );
}
