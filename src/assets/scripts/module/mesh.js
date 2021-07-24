import * as THREE from 'three';
import { gsap } from 'gsap';
import * as dat from 'dat.gui';
import vertexShader from '../shaders/vertexshader.vert';
import fragmentShader from '../shaders/fragmentshader.frag';

export default class Mesh {
  constructor(stage) {
    this.color = '#fff';
    this.stage = stage;
  }

  init() {
    this._setMesh();
    this._setDev();
  }

  _setMesh() {
    const geometry = new THREE.SphereBufferGeometry(0.20, 32, 32);
    const material = new THREE.RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        u_scale: { type: "f", value: 1.5 },
        u_color: { type: "v3", value: new THREE.Color(this.color) },
      },
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.stage.scene.add(this.mesh);

    gsap.to(this.mesh.material.uniforms.u_scale, {
      duration: 1.0,
      ease: 'none',
      value: 1.0,
    })
  }

  _setDev() {
    const parameter = {
      color: this.color,
    };
    const gui = new dat.GUI();
    gui.addColor(parameter, "color")
      .name("color")
      .onChange((value) => {
        this.mesh.material.uniforms.u_color.value = new THREE.Color(value);
      });
  }

  _render() {
    //
  }

  onResize() {
    //
  }

  onRaf() {
    this._render();
  }
}