import './style.css'

import * as THREE from 'three';
import { OrbitControls} from  'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight,0.1 , 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);   


const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color: 0xff6347});
const torus = new THREE.Mesh(geometry, material);   

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement)



function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 25,25);
  const material = new THREE.MeshStandardMaterial({color: 0x6c5ce7});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z]  = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); 
  star.position.set(x,y,z);
  scene.add(star);



}

Array(200).fill().forEach(addStar) 

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

//avatar
const lishuTexture = new THREE.TextureLoader().load('meself.jpeg');
const lishu = new THREE.Mesh(
  new THREE.BoxGeometry(5,5,5),
  new THREE.MeshBasicMaterial({map:lishuTexture})
  )
  scene.add(lishu);

// moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
  )
  scene.add(moon);

// reposition moon
moon.position.z = 30;
moon.position.setX(-10);

function moveCamera() {
  const t= document.body.getBoundingClientRect().top();

  moon.rotate.X += 0.05;
  moon.rotate.y += 0.075;
  moon.rotate.z += 0.05;

  lishu.rotation.y += 0.01;
  lishu.rotation.z += 0.01;

  camera.position.z  = t * -0.01;
  camera.position.x  = t * -0.0002;
  camera.position.y  = t * -0.0002;
}

document.body.onscroll = moveCamera


animate();
