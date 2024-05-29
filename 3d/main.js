import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { OBJLoader } from 'OBJLoader';
import { MTLLoader } from 'MTLLoader';
import { GLTFLoader } from 'GLTFLoader';

const object_sidebar = document.querySelector('.object_sidebar');
const render_header = document.querySelector('.render_header');
const list_holder = document.querySelector('.list_holder');
const name_input = document.querySelector('.name_text');
const name_button = document.querySelector('.name_edit');
const placeholder = document.querySelector('#placeholder');
const frame = document.querySelector('.main_view');
const render_info = document.querySelector('.render_info');
const user_credit = document.querySelector('.user_credit');
const credit_icon = document.querySelector('.user_credit .icon');
const credit_user = document.querySelector('.user_credit .username');
const percent_text = document.querySelector('.percent_text');

const delete_button = document.querySelector('.delete');
const display_button = document.querySelector('.plus');

let current = {
    scene: null,
    camera: null,
    render: null,
    controls: null,
    obj: null,
    mtl: null,
    glb: null
}
let autoRotate = false;

function renderLoop() {
    requestAnimationFrame(renderLoop);
    current.render.render(current.scene, current.camera);
}

function loadObject(element, fileTable, reload, saveName, fromLoad) {
    let scaleFactor = 1;
    let setMain = false;

    // Determines whether or not to set the main scene
    // Otherwise, lower the quality as it will appear in sidebar
    if (!element) {
        setMain = true;
        element = frame;
    } else {
        scaleFactor = 0.75;
    }

    // clear board before next main load
    if (setMain && current.scene) { clearBoard(current.scene) };

    // Main
    let parentRect = element.getBoundingClientRect();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, parentRect.width / parentRect.height, 0.1, 1000);
    let render;
    if (setMain && current.render) {
        render = current.render;
    } else {
        render = new THREE.WebGLRenderer();
    }
    let controls = new OrbitControls(camera, render.domElement);
    render.setSize(parentRect.width, parentRect.height);
    render.setPixelRatio(window.devicePixelRatio * scaleFactor);
    render.setClearColor(0x000000, 0);
    render.domElement.classList.add('three_render');
    element.appendChild(render.domElement);

    // Lighting
    addLighting(scene);

    // Object
    if (!fromLoad) {
        makeObject(fileTable, scene, camera, render, setMain);
        if (saveName) {
            name_input.value = saveName;
        } else {
            name_input.value = '';
        }
    }

    if (setMain) {
        current.scene = scene;
        current.camera = camera;
        current.render = render;
        current.controls = controls;
        current.mtl = fileTable.mtl;
        current.obj = fileTable.obj;
        current.glb = fileTable.glb;

        renderLoop();

        if (!reload) {
            let clone = makeClone(fileTable, saveName);
            loadObject(clone, fileTable);
            name_input.placeholder = 'Name Here...';
        } else {
            let button_select = findButtonSelect(fileTable);
            let set_name = button_select.getAttribute('name');

            if (set_name) {
                name_input.value = '';
                name_input.placeholder = 'Name Here...'
            }
        }
    }
}

function makeObject(fileTable, scene, camera, render, setMain) {
    let mtlName = fileTable.mtl;
    let objName = fileTable.obj;
    let glbName = fileTable.glb;

    if (fileTable.glb) {
        const glbLoad = new GLTFLoader();
        glbLoad.load(glbName, function (gltf) {
            gltf.scene.traverse(function (child) {
                if (child.isMesh) { //also tried without this if statement
                    child.material.depthWrite = true;
                }
            });

            defaultView(gltf.scene, camera, setMain);
            scene.add(gltf.scene);
            render.render(scene, camera);
        }, displayLoadingText)
    } else if (fileTable.mtl && fileTable.obj) {
        const mtlLoad = new MTLLoader();

        mtlLoad.load(mtlName, function (materials) {
            materials.preload();

            const objLoad = new OBJLoader();
            objLoad.setMaterials(materials);
            objLoad.load(objName, function (object) {
                defaultView(object, camera, setMain);

                scene.add(object);
                render.render(current.scene, current.camera);
            });
        }, displayLoadingText)
    }
}

function displayLoadingText(xhr) {
    const percentComplete = ((xhr.loaded / xhr.total) * 100).toFixed(2);
    percent_text.classList.add('show');

    if (percentComplete < 100) {
        percent_text.innerHTML = `${percentComplete}% Loaded`;
    } else {
        percent_text.innerHTML = '100% Loaded';
        setTimeout(function () { percent_text.classList.remove('show') }, 100);
    }
}

function addLighting(scene) {
    let light = new THREE.AmbientLight(0xffffff, 0.5);
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(light);
    scene.add(directionalLight);
}

function defaultView(object, camera, setMain) {
    object.scale.set(0.1, 0.1, 0.1);
    object.position.set(0, 0, 0);

    let boundingBox = new THREE.Box3().setFromObject(object);
    let center = boundingBox.getCenter(new THREE.Vector3());
    let size = boundingBox.getSize(new THREE.Vector3());

    let maxDim = Math.max(size.x, size.y, size.z);
    let fov = camera.fov * (Math.PI / 180);
    let cameraDistance = Math.abs(maxDim / (2 * Math.tan(fov / 2)));

    if (setMain) {
        if ((window.innerWidth < 767) && current.scene) {
            cameraDistance += 4;
        }
    }

    camera.position.copy(center);
    camera.position.z += (cameraDistance + 1);
    camera.lookAt(center);
}

function clearBoard(scene, noDispose) {
    if (!noDispose) {
        current.controls.dispose();
        current.render.dispose();
    }
    scene.remove.apply(scene, scene.children);
    THREE.Cache.clear();
}

function findButtonSelect(fileTable) {
    let query;

    if (fileTable.glb) {
        query = list_holder.querySelector(`[glb="${fileTable.glb}"]`);
    } else if (fileTable.obj && fileTable.mtl) {
        query = list_holder.querySelector(`[mtl="${fileTable.mtl}"][obj="${fileTable.obj}"]`);
    }

    return query;
}

function makeClone(fileTable, saveName, img, preset, creditTable) {
    let clone = placeholder.cloneNode(true);
    if (fileTable.glb) {
        clone.setAttribute('glb', fileTable.glb)
    } else if (fileTable.obj && fileTable.mtl) {
        clone.setAttribute('mtl', fileTable.mtl);
        clone.setAttribute('obj', fileTable.obj);
    }

    if (saveName) {
        clone.setAttribute('name', saveName);
    } else {
        clone.setAttribute('name', 'none yet');
    }

    if (img) {
        clone.style.backgroundImage = `url(preview_img/${img})`;
    }

    if (preset) {
        clone.setAttribute('preset', preset);
    }

    clone.removeAttribute('id');
    list_holder.appendChild(clone);

    (function (clone) {
        let thisMTL = clone.getAttribute('mtl');
        let thisOBJ = clone.getAttribute('obj');
        let thisGLB = clone.getAttribute('glb');

        clone.onclick = function () {
            loadObject(null, { mtl: thisMTL, obj: thisOBJ, glb: thisGLB }, true);
            handleMobileUI();
            updateObjectName(clone, creditTable, preset, saveName);
        };
    })(clone);

    return clone;
}

function updateObjectName(clone, creditTable, preset, saveName, noSet) {
    name_input.classList = 'name_text';
    name_button.classList = 'name_edit';
    if (preset) {
        name_input.value = saveName;
        name_input.classList.add('no_edit');
        name_button.classList.add('no_edit');

        if (!noSet) {
            let presetID = clone.getAttribute('preset');
            setState(presetID);
        }
    }

    if (creditTable) {
        render_info.classList.remove('hide');
        credit_icon.style.backgroundImage = `url(usericon/${creditTable.icon})`;
        credit_user.innerHTML = `@${creditTable.user}`;
    } else {
        render_info.classList.add('hide');
    }
}

function setState(presetID) {
    let pageName = window.location.href;
    let editURL;

    if (!pageName.includes('#')) {
        editURL = pageName;
    } else {
        editURL = pageName.split('#')[0];
    }

    if (presetID) {
        let newURL = editURL + `#id=${presetID}`
        history.pushState(null, null, newURL);
    } else {
        history.pushState(null, null, editURL);
    }
}

function deleteObject() {
    let check = confirm('Are you sure you want to delete this render?');
    let button_select =
        list_holder.removeChild(button_select);
    clearBoard(mainScene);
    name_input.placeholder = 'No Render Selected...'
    name_input.value = '';
    saveInstance();
}

function handleMobileUI() {
    let shown = object_sidebar.classList.contains('show');

    if (shown) {
        object_sidebar.classList.remove('show');
        frame.classList.remove('hide');
        render_info.classList.add('hide');
    } else {
        object_sidebar.classList.add('show');
        frame.classList.add('hide');
        render_info.classList.add('hide');
    }
}

function renameRender() {
    let new_name = name_input.value;
    let button_select = findButtonSelect({ obj: current.obj, mtl: current.mtl, glb: current.glb });
    button_select.setAttribute('name', new_name);
    saveInstance();
}

function nameFieldFocus() {
    renameRender();
}

function enableTransitions() {
    document.body.classList.remove('no-transition');
}

function keyListener(event) {
    if (event.which == 13) {
        if (document.activeElement == name_input) {
            renameRender();
            name_input.blur()
        }
    }
}

function handleResizeComplete() {
    if (current.scene) {
        // not finished
    }
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
        console.log('Resize event finished.');
        handleResizeComplete();
    }, 300);
});

// Default

let presetDB = {
    1: {
        fileTable: { 
            obj: 'preset/discord_qr.obj', 
            mtl: 'preset/discord_qr.mtl' 
        },
        name: 'Discord',
        image: 'qr_preview.png',
        presetID: 1,
        credit: {
            user: 'kircic',
            icon: 'kircic.webp'
        }
    },
    2: {
        fileTable: { 
            glb: 'preset/ship.glb',
        },
        name: 'Spaceship',
        image: 'ship_preview.png',
        presetID: 2,
        credit: {
            user: 'vite',
            icon: 'vite.webp'
        }
    },
    3: {
        fileTable: { 
            glb: 'preset/dark_church.glb',
        },
        name: 'Dark Church',
        image: 'darkchurch_preview.png',
        presetID: 3,
        credit: {
            user: 'kircic',
            icon: 'kircic.webp'
        }
    },
    4: {
        fileTable: { 
            glb: 'preset/castle_1.glb', 
        },
        name: 'Castle',
        image: 'castle_preview.png',
        presetID: 4,
        credit: {
            user: 'variberry',
            icon: 'variberry.webp'
        }
    },
    5: {
        fileTable: {
            glb: 'preset/82skull.glb',
        },
        name: 'Skull',
        image: 'skull.png',
        presetID: 5,
        credit: {
            user: 'pinksock82',
            icon: 'pinksock.webp'
        }
    }
}

function loadPresets() {
    for (var i in presetDB) {
        let thisData = presetDB[i];
        makeClone(
            thisData.fileTable,
            thisData.name,
            thisData.image,
            thisData.presetID,
            thisData.credit
        );
    }
}
function findState() {
    let pageName = window.location.href;
    let firstPreset = presetDB[1];
    let firstClone = list_holder.querySelector(`[preset="1"]`);

    function defaultLoad() {
        loadObject(null, firstPreset.fileTable, true, firstPreset.name, false);
        updateObjectName(firstClone, firstPreset.credit, 1, firstPreset.name, true);
    }
    if (pageName.includes('#')) {
        let presetID = pageName.split('#id=')[1];
        let thisData = presetDB[presetID];
        if (thisData) {
            let thisClone = list_holder.querySelector(`[preset="${presetID}"]`);
            loadObject(null, thisData.fileTable, true, thisData.name, false);
            updateObjectName(thisClone, thisData.credit, presetID, thisData.name);
        } else {
            // invalid state
            setState(null);
            defaultLoad();
        }
    } else {
        // no state
        defaultLoad()
    }
}

loadPresets();
setTimeout(enableTransitions, 200);

window.onload = findState;
document.addEventListener('keydown', keyListener);
name_button.addEventListener('mouseup', nameFieldFocus);
delete_button.addEventListener('mouseup', deleteObject);
display_button.addEventListener('mouseup', handleMobileUI);

export { loadObject };