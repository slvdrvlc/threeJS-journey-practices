import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 * */
// const geometry = new THREE.SphereGeometry(1,32,32)
/* Create an empty BufferGeometry */
const geometry = new THREE.SphereBufferGeometry(1, 32, 32);
/* Create a Float32Array containing the vertices position (3 by 3) */
// const positionsArray = new Float32Array([
//     0, 0, 0, // First vertex
//     0, 1, 0, // Second vertex
//     1, 0, 0  // Third vertex
// ])
// Create 50 triangles (450 values)

// const count = 50
// const positionsArray = new Float32Array(count * 3 * 3)
// for(let i = 0; i < count * 3 * 3; i++)
// {
//     positionsArray[i] = (Math.random() - 0.5) * 4
// }

/* Create the attribute and name it 'position' */
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute('position', positionsAttribute)
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 * */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});

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

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate

const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
