attribute vec3 position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float u_scale;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position * u_scale, 1.0 );
}