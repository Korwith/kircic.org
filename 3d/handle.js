import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { OBJLoader } from 'OBJLoader';
import { MTLLoader } from 'MTLLoader';
import { GLTFLoader } from 'GLTFLoader';
import { FBXLoader } from 'FBXLoader';

const content = document.querySelector('.content');
const preview_holder = document.querySelector('.object_select');

const sidebar = document.querySelector('nav.sidebar');
const left_sidebar = document.querySelector('.left_sidebar');
const right_sidebar = document.querySelector('.right_sidebar');
const import_button = left_sidebar.querySelector('.open');
const rotate_button = left_sidebar.querySelector('.rotate');
const minimize_button = left_sidebar.querySelector('.minimize');
const plus_button = left_sidebar.querySelector('.plus');
const hover_tag = left_sidebar.querySelector('.hover_tag');

const model_name = content.querySelector('.model_info .model_name');
const profile_username = content.querySelector('.model_info .username');
const source_text = content.querySelector('.model_info .source_text');

const preview_list = {
    'Discord': {
        icon: 'qr_preview.png',
        url: { mtl: 'preset/discord_qr.mtl', obj: 'preset/discord_qr.obj' },
        type: 'obj',
        credit: 'Kircic',
        source: 'Tinkercad'
    },

    'Dark Church': {
        icon: 'darkchurch_preview.png',
        url: { glb: 'preset/dark_church.glb' },
        type: 'gltf',
        credit: 'Kircic',
        source: 'WTRB',
    },

    'Spaceship': {
        icon: 'ship_preview.png',
        url: { glb: 'preset/ship.glb' },
        type: 'gltf',
        credit: 'vite',
        source: 'WTRB',
    },

    'Skull': {
        icon: 'skull.png',
        url: { glb: 'preset/82skull.glb' },
        type: 'gltf',
        credit: 'PinkSock82',
        source: 'WTRBU',
    },
    
    'Stone Steve': {
        icon: 'stone_steve.png',
        url: { mtl: 'preset/StoneSteve.mtl', obj: 'preset/StoneSteve.obj'},
        type: 'obj',
        credit: 'Kircic',
        source: 'jmc2obj'
    }
}

let url_blob = [

]

let current = {
    scene: null,
    camera: null,
    render: null,
}

// handle three
let loop_running = false;
function renderLoop() {
    current.controls.update();
    current.render.render(current.scene, current.camera);
    requestAnimationFrame(renderLoop);
}

function handleLoading(xhr) {
    let percent = xhr.loaded / xhr.total;
    if (percent < 1) {
        document.body.classList.add('loading');
    } else {
        document.body.classList.remove('loading');
    }
}

function handleGLB(url_object, scene, camera, render) {
    const glb_loader = new GLTFLoader();
    glb_loader.load(url_object.glb, function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.material.depthWrite = true;
            }
        });

        defaultView(gltf.scene, camera);
        scene.add(gltf.scene);
        render.render(scene, camera);
    }, handleLoading);
}

function handleOBJ(url_object, scene, camera, render) {
    const mtl_loader = new MTLLoader();
    mtl_loader.load(url_object.mtl, function (materials) {
        materials.preload();
        const obj_loader = new OBJLoader();
        obj_loader.setMaterials(materials);
        obj_loader.load(url_object.obj, function (object) {
            defaultView(object, camera);
            scene.add(object);
            render.render(scene, camera);
        }, handleLoading);
    });
}

function makeObject(url_object, scene, camera, render) {
    const map = {
        'glb': handleGLB,
        'obj': handleOBJ,
    }

    for (var i in url_object) {
        let to_run = map[i];
        if (!to_run) { continue };
        to_run(url_object, scene, camera, render);
    }
}

function objectSelect(url_object, element) {
    let scaleFactor = 0.8;
    if (!element) {
        clearBoard();
        element = content;
        scaleFactor = 1;
    }

    let rect = element.getBoundingClientRect();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000);
    let render = new THREE.WebGLRenderer();
    if (element == content) {
        let controls = new OrbitControls(camera, render.domElement);
        current.scene = scene;
        current.camera = camera;
        current.render = render;
        current.controls = controls;

        if (!loop_running) {
            renderLoop();
            loop_running = true;
        }

        if (rotate_button.classList.contains('active')) {
            controls.autoRotate = true;
        }
    }

    render.setSize(rect.width, rect.height);
    render.setPixelRatio(window.devicePixelRatio * scaleFactor);
    render.setClearColor(0x000000, 0);
    element.appendChild(render.domElement);

    addLighting(scene);
    makeObject(url_object, scene, camera, render);
}

function clearBoard() {
    if (!current.scene) { return false; }
    current.controls.dispose();
    current.render.dispose();
    current.scene.remove.apply(current.scene, current.scene.children);
    content.querySelector('canvas').remove();
    THREE.Cache.clear();
    return true;
}

function addLighting(scene) {
    let light = new THREE.AmbientLight(0xffffff, 0.5);
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(light);
    scene.add(directionalLight);
}

function defaultView(object, camera) {
    object.scale.set(0.1, 0.1, 0.1);
    object.position.set(0, 0, 0);

    let bounding = new THREE.Box3().setFromObject(object);
    let center = bounding.getCenter(new THREE.Vector3());
    let size = bounding.getSize(new THREE.Vector3());

    let maxDim = Math.max(size.x, size.y, size.z);
    let fov = camera.fov * (Math.PI / 180);
    let cameraDistance = 1.25 * (Math.abs(maxDim / (2 * Math.tan(fov / 2))));

    if (window.innerWidth < 767) {
        cameraDistance *= 1.4;
    }

    camera.position.copy(center);
    camera.position.z += cameraDistance;
    camera.lookAt(center);
}

function handleWindowResize() {
    if (!current.scene) { return false };
    let rect = content.getBoundingClientRect();
    current.camera.aspect = rect.width / rect.height;
    current.camera.updateProjectionMatrix();
    current.render.setSize(rect.width, rect.height);
}

function handleAutoRotate() {
    if (!current.controls) { return false };
    if (!rotate_button.classList.contains('active')) {
        current.controls.autoRotate = true;
        current.controls.autoRotateSpeed = 2.75;
        rotate_button.classList.add('active');
    } else {
        current.controls.autoRotate = false;
        rotate_button.classList.remove('active');
    }
}

// handle ui
function objectClick(event) {
    if (!event.target.classList.contains('preview')) { return false };
    let is_preset = event.target.getAttribute('preset');

    if (is_preset) {
        let found_preset = event.target.getAttribute('object');
        let preset_info = preview_list[found_preset];
        let preset_url_object = preset_info.url;
        objectSelect(preset_url_object);
        updateProfile(preset_info, found_preset);
    } else {
        let found_index = parseInt(event.target.getAttribute('importindex'));
        let found_info = url_blob[found_index];
        objectSelect(found_info.files, false);
    }

    if (window.innerWidth < 767) {
        handleMobileButton();
    }
};

function updateProfile(preset_info, name) {
    model_name.innerHTML = 'Name: ' + name;
    profile_username.innerHTML = 'Creator: ' + preset_info.credit;
    source_text.innerHTML = 'Source: ' + preset_info.source;
}

function makePreview(name, url) {
    let clone = document.createElement('div');
    clone.classList.add('preview');
    clone.onclick = objectClick;

    if (url) {
        clone.style.backgroundImage = `url(preset_img/${url})`;
        clone.setAttribute('preset', true);
        clone.setAttribute('object', name);
    } else {
        clone.setAttribute('importindex', url_blob.length - 1);
    }

    return preview_holder.appendChild(clone);
}

function loadPreview() {
    for (var i in preview_list) {
        let preview_data = preview_list[i];
        makePreview(i, preview_data.icon)
    }
}

const valid = ['obj', 'mtl', 'glb']
function startImport() {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.style.display = 'none';
    document.body.appendChild(input);

    input.addEventListener('change', function (event) {
        let files = event.target.files;
        let file_object = {};

        for (var i = 0; i < files.length; i++) {
            let this_file = files[i];
            let this_extension = this_file.name.split('.').pop().toLowerCase();

            if (valid.includes(this_extension)) {
                let this_url = URL.createObjectURL(this_file);
                file_object[this_extension] = this_url;
            }
        }

        if (Object.keys(file_object).length == 0) { return false };

        url_blob.push({
            files: file_object,
            name: 'Import ' + url_blob.length + 1,
        });
        let new_preview = makePreview('test');
        objectSelect(file_object, new_preview);
        objectSelect(file_object);
    });

    input.click();
}

function hideHoverTag() {
    hover_tag.classList.add('hide');
}

function handleHoverTag(event) {
    if (!event.target.classList.contains('left_button')) { hideHoverTag(); return false };
    let target_rect = event.target.getBoundingClientRect();
    hover_tag.style.top = target_rect.y - target_rect.height + 'px';
    hover_tag.style.left = target_rect.x + 43 + 'px';

    let text_content = event.target.getAttribute('hovertext') || 'N/A';
    hover_tag.innerHTML = text_content;

    hover_tag.classList.remove('hide');
};

function handleSidebarMinimize() {
    if (!sidebar.classList.contains('shrink')) {
        sidebar.classList.add('shrink');
        content.classList.add('expand');
        minimize_button.classList.add('active');
    } else {
        sidebar.classList.remove('shrink');
        content.classList.remove('expand');
        minimize_button.classList.remove('active');
    }

    setTimeout(handleWindowResize, 200);
}

function handleMobileButton() {
    let sidebar_showing = right_sidebar.classList.contains('show');
    if (!sidebar_showing) {
        right_sidebar.classList.add('show');
        content.classList.add('hide');
        plus_button.classList.add('active');
    } else {
        right_sidebar.classList.remove('show');
        content.classList.remove('hide');
        plus_button.classList.remove('active');
    }
}

loadPreview();
import_button.addEventListener('mouseup', startImport);
rotate_button.addEventListener('mouseup', handleAutoRotate);
left_sidebar.addEventListener('mousemove', handleHoverTag);
left_sidebar.addEventListener('mouseleave', hideHoverTag);
minimize_button.addEventListener('mouseup', handleSidebarMinimize);
plus_button.addEventListener('mouseup', handleMobileButton);
window.onresize = handleWindowResize;

objectSelect({
    obj: 'preset/discord_qr.obj',
    mtl: 'preset/discord_qr.mtl'
})