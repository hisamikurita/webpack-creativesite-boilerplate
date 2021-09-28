import Sphere from './module/sphere';
import Stage from './module/stage';

const stage = new Stage();
stage.init();

const sphere = new Sphere(stage);
sphere.init();

window.addEventListener("resize", () => {
    sphere.onResize();
    stage.onResize();
});

const _raf = () => {
    window.requestAnimationFrame(() => {
        _raf();

        sphere.onRaf();
        stage.onRaf();
    });
};
_raf();
