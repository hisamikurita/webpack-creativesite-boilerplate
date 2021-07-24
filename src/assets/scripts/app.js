import Mesh from './module/mesh';
import Stage from './module/stage';

const stage = new Stage();
stage.init();

const mesh = new Mesh(stage);
mesh.init();

window.addEventListener("resize", () => {
    mesh.onResize();
    stage.onResize();
});

const _raf = () => {
    window.requestAnimationFrame(() => {
        _raf();

        mesh.onRaf();
        stage.onRaf();
    });
};
_raf();
