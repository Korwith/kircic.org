import { loadObject } from './main.js';

const list_holder = document.querySelector('.list_holder');

let selectedOBJ;
let selectedMTL;

function startFile(clickEvent, condition) {
    let newInput = document.createElement('input');
    newInput.type = 'file';
    newInput.accept = '.obj,.mtl';
    newInput.multiple = true;
    newInput.style.display = 'none';
    document.body.appendChild(newInput);

    newInput.addEventListener('change', function (event) {
        let files = event.target.files;
        if (files.length > 2) {
            alert('Only select one or two files.');
        } else {
            for (var i = 0; i < files.length; i++) {
                let thisFile = files[i];
                let thisFileExtension = thisFile.name.split('.').pop().toLowerCase();
                let thisFilePath = URL.createObjectURL(thisFile);

                if (thisFileExtension == 'obj') {
                    selectedOBJ = thisFilePath;
                } else if (thisFileExtension == 'mtl') {
                    selectedMTL = thisFilePath;
                }
            }

            loadFromImport();
        }
    });

    var check = confirm('Select the OBJ and the optional MTL (styles) file you would like to render.');
    if (check) {
        newInput.click();
    }
}

function loadFromImport() {
    loadObject(null, selectedMTL, selectedOBJ);
    saveInstance();
}

function getAllSaves() {
    let allButtons = list_holder.querySelectorAll('div[obj]');
    let toReturn = [];

    for (var i = 0; i < allButtons.length; i++) {
        let thisButton = allButtons[i];
        let mtlURL = thisButton.getAttribute('mtl');
        let objURL = thisButton.getAttribute('obj');
        let renderName = thisButton.getAttribute('name');
        console.log(renderName);
        let info = { mtl: mtlURL, obj: objURL, name: renderName };

        if (mtlURL.includes('http') && objURL.includes('http')) {
            toReturn.push(info);
        }
    }

    return toReturn;
}

async function saveInstance() {
    let saves = getAllSaves();
    let setLocalStorage = [];

    for (var i = 0; i < saves.length; i++) {
        let saveTable = saves[i];
        let thisSetLocal = {};

        for (var fileType in saveTable) {
            let fileURL = saveTable[fileType];
            if (fileType != 'name') {
                try {
                    const response = await fetch(fileURL);
                    const blob = await response.blob();
                    const base64String = await blobToBase64(blob);
                    thisSetLocal[fileType] = base64String;
                } catch (error) {
                    console.log('Error saving: ', error);
                }
            } else {
                thisSetLocal['name'] = fileURL;
            }
        }

        setLocalStorage.push(thisSetLocal);
    }

    localStorage.setItem('render_saves', JSON.stringify(setLocalStorage));
}

function unpackInstance() {
    let loadData = localStorage.getItem('render_saves');

    if (loadData) {
        let dataUnpack = JSON.parse(loadData);
        let newURL = [];

        for (var i = 0; i < dataUnpack.length; i++) {
            let thisRenderData = dataUnpack[i];
            let loadedURL = {};

            for (var fileType in thisRenderData) {
                let saveString = thisRenderData[fileType];

                if (fileType != 'name') {
                    try {
                        const blob = base64ToBlob(saveString, 'text/plain');
                        const objectURL = URL.createObjectURL(blob);
                        loadedURL[fileType] = objectURL;
                    } catch (error) {
                        console.log('error', error);
                    }
                } else {
                    loadedURL['name'] = saveString;
                }
            }

            newURL.push(loadedURL);
        }

        loadInstance(newURL);
    }
}

function loadInstance(loadedURL) {
    for (var i = 0; i < loadedURL.length; i++) {
        let thisRenderURL = loadedURL[i];
        loadObject(false, thisRenderURL.mtl, thisRenderURL.obj, false, thisRenderURL.name, true);
    }
}

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = reader.result.split(',')[1];
            resolve(base64data);
        };
        reader.onerror = error => reject(error);
        reader.readAsDataURL(blob);
    });
}

function base64ToBlob(base64, mimeType) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
}

export { startFile }
export { unpackInstance };
export { saveInstance };