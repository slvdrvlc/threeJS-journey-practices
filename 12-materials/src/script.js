import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

/**
 * Debug
 * */
const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Textures
 */
// const textureLoader = new THREE.TextureLoader();
//
// const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
// const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
// const doorAmbientOcclusionTexture = textureLoader.load(
//   "/textures/door/ambientOcclusion.jpg"
// );
// const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
// const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
// const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
// const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
// const matcapTexture = textureLoader.load("/textures/matcaps/10.jpg");
// const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");

/**
 * Cube texture
 * */
const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
  "./textures/environmentMaps/3/px.jpg",
  "./textures/environmentMaps/3/nx.jpg",
  "./textures/environmentMaps/3/py.jpg",
  "./textures/environmentMaps/3/ny.jpg",
  "./textures/environmentMaps/3/pz.jpg",
  "./textures/environmentMaps/3/nz.jpg",
]);

/**
 * Materials
 */
/* MeshBasicMaterial */
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.wireframe = true
// material.color = new THREE.Color('cyan')
// material.transparent = true
// material.opacity = .5
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

/* MeshNormalMaterial */
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

/* MeshMatcapMaterial */
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

/* MeshDepthMaterial */
// const material = new THREE.MeshDepthMaterial()

/* MeshLambertMaterial */
// const material = new THREE.MeshLambertMaterial()

/* MeshPhongMaterial */
// const material = new THREE.MeshPhongMaterial()
// material.color = new THREE.Color('gray')
// material.shininess = 100
// material.specular = new THREE.Color('red')

/* MeshToonMaterial */
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false

/* MeshStandardMaterial */
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.45
// material.roughness = 0.65
// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(1, 1)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

/* Environment map */
const material = new THREE.MeshStandardMaterial();
material.metalness = 1.0;
material.roughness = 0.0;
gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
material.envMap = environmentMapTexture;

/**
 * Objects
 * */
const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 64, 64),
  material
);
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);
// sphere.position.x = -2

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1, 100, 100),
  material
);
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);
plane.position.x = -2;

// const cube = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(0, 1),
//     material
// )
// cube.geometry.setAttribute('uv2', new THREE.BufferAttribute(cube.geometry.attributes.uv.array, 2))
// cube.rotation.y = Math.PI * .5

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128),
  material
);
torus.position.x = 2;
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

scene.add(sphere, plane, torus);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Resize
 * */
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

/**
 * Animate
 */
// const clock = new THREE.Clock();

const tick = () => {
  // const elapsedTime = clock.getElapsedTime();

  /* Update objects */
  // sphere.rotation.y = 0.5 * elapsedTime
  // plane.rotation.y = 0.5 * elapsedTime
  // torus.rotation.y = 0.5 * elapsedTime

  // sphere.rotation.x = .5 * elapsedTime
  // plane.rotation.x = .5 * elapsedTime
  // torus.rotation.x = .5 * elapsedTime

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
