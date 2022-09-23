import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import testVertexShader from "./shaders/test/vertex.glsl";
import testFragmentShader from "./shaders/test/fragment.glsl";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const flagTexture = textureLoader.load("./textures/flag-french.jpg");
// const flagTexture = textureLoader.load('/textures/1.jpg')

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneBufferGeometry(2, 1, 64, 64);
// const geometry = new THREE.BoxBufferGeometry(1,1,1)
// const geometry = new THREE.TorusGeometry(1,0.5,16,12)

// Customize
const { count } = geometry.attributes.position;
const randoms = new Float32Array(count);
for (let i = 0; i < count; i += 1) {
  randoms[i] = Math.random();
  // randoms[i] = Math.sin(i) / 2 + 0.5
}
geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

// Material
// const material = new THREE.RawShaderMaterial({
const material = new THREE.ShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  // wireframe: true,
  // transparent: true,
  uniforms: {
    uFrequency: { value: new THREE.Vector2(50, 50) },
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("orange") },
    uTexture: { value: flagTexture },
  },
});
gui
  .add(material.uniforms.uFrequency.value, "x")
  .min(50)
  .max(100)
  .step(1.0)
  .name("frequencyX");
gui
  .add(material.uniforms.uFrequency.value, "y")
  .min(50)
  .max(100)
  .step(1.0)
  .name("frequencyY");

// Mesh
const mesh = new THREE.Mesh(geometry, material);
// mesh.scale.y = 2 / 3
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 0.5);
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  // Update material
  material.uniforms.uTime.value = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
