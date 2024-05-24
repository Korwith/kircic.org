import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { saveInstance } from './import.js';
import { unpackInstance } from './import.js';
import { startFile } from './import.js';

const object_sidebar = document.querySelector('.object_sidebar');
const render_header = document.querySelector('.render_header');
const list_holder = document.querySelector('.list_holder');
const name_input = document.querySelector('.name_text');
const name_button = document.querySelector('.name_edit');
const placeholder = document.querySelector('#placeholder');
const frame = document.querySelector('.main_view');
const delete_button = document.querySelector('.delete');
const display_button = document.querySelector('.plus');
const import_button = document.querySelector('#import');

let mainScene;
let mainCamera;
let mainRender;
let mainControls;
let selectedOBJ;
let selectedMTL;

let autoRotate = true;

function renderLoop() {
    requestAnimationFrame(renderLoop);
    mainRender.render(mainScene, mainCamera);
}

function loadObject(parentElement, mtlName, objName, reload, saveName, fromLoad) {
    var setMain = false;
    var scaleFactor = 1;

    if (!parentElement) {
        setMain = true;
        parentElement = frame;
    } else {
        scaleFactor = 0.75;
    }

    // Hault if currently loaded + clear before load
    //if (setMain && ((selectedOBJ == objName) || (selectedMTL == mtlName))) { return };
    if (setMain && mainScene) { clearBoard(mainScene) }

    // Main
    let parentRect = parentElement.getBoundingClientRect();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, parentRect.width / parentRect.height, 0.1, 1000);
    let render;
    if (setMain && mainRender) {
        render = mainRender;
    } else {
        render = new THREE.WebGLRenderer();
    }
    render.setSize(parentRect.width, parentRect.height);
    render.setPixelRatio(window.devicePixelRatio * scaleFactor);
    let controls = new OrbitControls(camera, render.domElement);

    render.setClearColor(0x000000, 0);
    render.domElement.classList.add('three_render');
    parentElement.appendChild(render.domElement);

    // Lighting
    let light = new THREE.AmbientLight(0xffffff, 0.5);
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(light);
    scene.add(directionalLight);

    // Object
    if (!fromLoad) {
        makeObject(mtlName, objName, scene, camera, render, setMain);
        if (saveName) {
            name_input.value = saveName;
        } else {
            name_input.value = '';
        }
    }

    if (setMain) {
        mainScene = scene;
        mainCamera = camera;
        mainRender = render;
        mainControls = controls;
        selectedMTL = mtlName;
        selectedOBJ = objName;

        renderLoop();
        assignInputFunctions(controls);

        if (!reload) {
            let clone = makeClone(mtlName, objName, saveName);
            loadObject(clone, mtlName, objName);
            name_input.placeholder = 'Name Here...';
        } else {
            let button_select = list_holder.querySelector(`[mtl="${selectedMTL}"][obj="${selectedOBJ}"]`);
            let set_name = button_select.getAttribute('name');

            if (set_name) {
                name_input.value = set_name;
            } else {
                name_input.value = '';
                name_input.placeholder = 'Name Here...'
            }
        }
    }
}

function makeObject(mtlName, objName, scene, camera, render, main) {
    const mtlLoad = new MTLLoader();
    mtlLoad.load(mtlName, function (materials) {
        materials.preload();

        const objLoad = new OBJLoader();
        objLoad.setMaterials(materials);
        objLoad.load(objName, function (object) {
            object.scale.set(0.1, 0.1, 0.1);
            object.position.set(0, 0, 0);

            let boundingBox = new THREE.Box3().setFromObject(object);
            let center = boundingBox.getCenter(new THREE.Vector3());
            let size = boundingBox.getSize(new THREE.Vector3());
            
            let maxDim = Math.max(size.x, size.y, size.z);
            let fov = camera.fov * (Math.PI / 180);
            let cameraDistance = Math.abs(maxDim / (2 * Math.tan(fov / 2)));
            
            if ((window.innerWidth < 767) && main) {
                cameraDistance += 3;
            }

            camera.position.copy(center);
            camera.position.z += (cameraDistance + 2);
            camera.lookAt(center);

            scene.add(object);
            render.render(scene, camera);
        });
    });
}

function makeClone(mtlName, objName, saveName) {
    let clone = placeholder.cloneNode(true);
    clone.removeAttribute('id');
    clone.setAttribute('mtl', mtlName);
    clone.setAttribute('obj', objName);
    if (saveName) {
        clone.setAttribute('name', saveName);
    }
    list_holder.appendChild(clone);

    (function (clone) {
        let thisMTL = clone.getAttribute('mtl');
        let thisOBJ = clone.getAttribute('obj');

        clone.onclick = function () {
            loadObject(null, thisMTL, thisOBJ, true);
            handleMobileUI();
        };
    })(clone);

    return clone;
}

function clearBoard(scene) {
    mainControls.dispose();
    mainRender.dispose();
    scene.remove.apply(scene, scene.children);
    THREE.Cache.clear();
}

function deleteObject() {
    let check = confirm('Are you sure you want to delete this render?');
    let button_select = list_holder.querySelector(`[mtl="${selectedMTL}"][obj="${selectedOBJ}"]`);
    list_holder.removeChild(button_select);
    clearBoard(mainScene);
    name_input.placeholder = 'No Render Selected...'
    name_input.value = '';
    saveInstance();
}

function renameRender() {
    let new_name = name_input.value;
    let button_select = list_holder.querySelector(`[mtl="${selectedMTL}"][obj="${selectedOBJ}"]`);
    button_select.setAttribute('name', new_name);
    saveInstance();
}

function handleResize() {
    if (mainScene) {
        loadObject(null, selectedMTL, selectedOBJ, true);
    }
}

function startInput() {
    autoRotate = false;
}

function endInput() {
    autoRotate = true;
}

function assignInputFunctions(controls) {
    mainControls.addEventListener('start', startInput);
    mainControls.addEventListener('end', endInput);
}

function nameFieldFocus() {
    renameRender();
}

function keyListener(event) {
    if (event.which == 13) {
        if (document.activeElement == name_input) {
            renameRender();
            name_input.blur()
        }
    }
}

function handleMobileUI() {
    let shown = object_sidebar.classList.contains('show');
    
    if (shown) {
        object_sidebar.classList.remove('show');
        render_header.classList.remove('hide');
        frame.classList.remove('hide');
    } else {
        object_sidebar.classList.add('show');
        render_header.classList.add('hide');
        frame.classList.add('hide');
    }
}

function enableTransitions() {
    document.body.classList.remove('no-transition');
}

// Default
handleResize();
loadObject(false, 'obj.mtl', 'tinker.obj', false, 'QR Code', false);
loadObject(false, 'discord_qr.mtl', 'discord_qr.obj', false, 'Discord', false);
unpackInstance();
setTimeout(enableTransitions, 200);

window.onresize = handleResize;
document.addEventListener('keydown', keyListener);
name_button.addEventListener('mouseup', nameFieldFocus);
delete_button.addEventListener('mouseup', deleteObject);
import_button.addEventListener('mouseup', startFile);
display_button.addEventListener('mouseup', handleMobileUI);

export { loadObject };