import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// IMGS SKIN SKYBOX
import img_texture_ft from "../assets/img/box-inner-skin/arid2_ft.jpg";
import img_texture_bk from "../assets/img/box-inner-skin/arid2_ft.jpg";
import img_texture_up from "../assets/img/box-inner-skin/arid2_ft.jpg";
import img_texture_dn from "../assets/img/box-inner-skin/arid2_ft.jpg";
import img_texture_rt from "../assets/img/box-inner-skin/arid2_ft.jpg";
import img_texture_lf from "../assets/img/box-inner-skin/arid2_ft.jpg";

// DEFS
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGL1Renderer;

// FUNCTIONS
export function animate() {
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

export default () => {
	const app = document.querySelector<HTMLDivElement>("#app")!;

	// SCENE & CAMERA
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		55,
		window.innerWidth / window.innerHeight,
		45,
		30000
	);
	camera.position.set(-900, -200, -900);

	renderer = new THREE.WebGL1Renderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);

	app.appendChild(renderer.domElement);

	// ORBIT CONTROL
	const orbitControls = new OrbitControls(camera, renderer.domElement);

	// BOX TEXTURE
	let materialArray = [];
	let texture_ft = new THREE.TextureLoader().load(img_texture_ft),
		texture_bk = new THREE.TextureLoader().load(img_texture_bk),
		texture_up = new THREE.TextureLoader().load(img_texture_up),
		texture_dn = new THREE.TextureLoader().load(img_texture_dn),
		texture_rt = new THREE.TextureLoader().load(img_texture_rt),
		texture_lf = new THREE.TextureLoader().load(img_texture_lf);

	materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
	materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
	materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
	materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
	materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
	materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

	// BOX GEOMETRY
	const skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
	const skybox = new THREE.Mesh(skyboxGeo, materialArray);
	scene.add(skybox);

	// ANIMATION LOOP
	animate();
};
