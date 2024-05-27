import { loadObject } from './main.js';

const import_button = document.querySelector('#import');
const extensions = ['mtl', 'obj', 'glb'];

function startImport() {
    let newInput = document.createElement('input');
    newInput.type = 'file';
    newInput.accept = '.obj,.mtl,.glb';
    newInput.multiple = true;
    newInput.style.display = 'none';
    document.body.appendChild(newInput);

    newInput.addEventListener('change', function(event) {
        let files = event.target.files;
        let foundFiles = {};

        for (var i = 0; i < files.length; i++) {
            let thisFile = files[i];
            let thisFileExtension = thisFile.name.split('.').pop().toLowerCase();
            let thisFilePath = URL.createObjectURL(thisFile);
            
            if (extensions.includes(thisFileExtension)) {
                foundFiles[thisFileExtension] = thisFilePath;
            }
        }

        loadObject(false, foundFiles);
    });

    let check = confirm('Select the 3D files to import. Accepts OBJ, MTL, and GLB.');
    if (check) {
        newInput.click();
    }
}

import_button.addEventListener('mouseup', startImport);