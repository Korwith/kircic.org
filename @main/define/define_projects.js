"use strict";
const Project_Data = {
    'Wordle': {
        description: 'Recreation of Wordle. Use the clues to figure out the select word and solve the puzzle.',
        image: { icon: '@main/icon/wordle.png', size: '75%' },
        href: 'https://www.kircic.org/sub/wordle/game.html',
        video: '@main/icon/wordle_preview.mp4',
        featured: 4,
        category: 'game',
    },
    'Infinisweeper': {
        description: 'An infinite minesweeper sandbox. Just like the original minesweeper, but with proceduraly generating terrain.',
        image: { icon: '@main/icon/infinisweeper.png', size: '75%' },
        href: 'https://www.kircic.org/infinisweeper',
        video: '@main/icon/infinite_preview.mp4',
        featured: 3,
        category: 'game'
    },
    'Minesweeper': {
        description: 'Recreation of the Windows game minesweeper. Has normal and expert modes, 10x10 and 20x20.',
        image: { icon: '@main/icon/minesweeper.png', size: '75%' },
        href: 'https://www.kircic.org/sub/minesweeper.html',
        video: '@main/icon/minesweeper_preview.mp4',
        featured: 6,
        category: 'game'
    },
    '3D Viewer': {
        description: '3D File Viewer, supporting OBJ, MTL, OBJ files.',
        image: { icon: '@main/icon/3dviewer.svg', size: '80%' },
        href: 'https://www.kircic.org/3d/view.html',
        category: 'app'
    },
    'CompTIA Study Tool': {
        description: 'A simple study assistant for the A+ and Security+ exams with practice tests, a study quiz for ports, and a study quiz for the six troubleshooting steps.',
        image: { icon: '@main/icon/certification1.png', size: '105%' },
        href: 'https://www.kircic.org/exam',
        category: 'app'
    },
    'Connections': {
        description: 'Match all the groups of four like terms to solve the puzzle',
        image: { icon: '@main/icon/connections.svg', size: '105%' },
        href: 'https://www.kircic.org/sub/connections/game.html',
        category: 'game'
    },
    'Letter Boxed': {
        description: 'Solve the puzzle by using all letters on different sides to make words.',
        image: { icon: '@main/icon/letterboxed.svg', size: '105%' },
        href: 'https://www.kircic.org/sub/letter-boxed.html',
        category: 'game'
    },
    'Notilify': {
        description: 'Collaboration with Ariel Araya, a web port of the iOS application Notilify.',
        image: { icon: '@main/icon/notilify.png', size: '90%' },
        href: 'https://arielaraya.xyz/notilifyPWA/index.html',
        featured: 4,
        background: '@main/icon/notilifyweb.jpg',
        category: 'app'
    },
    'QR Generator': {
        description: 'Create custom QR codes for any text or URL',
        image: { icon: '@main/icon/qr.svg', size: '85%' },
        href: 'https://www.kircic.org/qr/gen.html',
        category: 'app'
    },
    'Snake': {
        description: 'Collect apples without running into the edge or yourself.',
        image: { icon: '@main/icon/snake.png', size: '80%' },
        href: 'https://www.kircic.org/sub/snake/game.html',
        category: 'game'
    },
    'Stock Tracker': {
        description: 'Provides real time stock graphs and detailed statistics about the market.',
        image: { icon: '@main/icon/stock.svg', size: '90%' },
        href: 'https://finance.kircic.org',
        background: '@main/icon/stocktracker.jpg',
        featured: 1,
        category: 'app',
        external_repo: 'stock-watch'
    },
    'Word Hunt': {
        description: 'Swipe the letters together to create words.',
        image: { icon: '@main/icon/wordhunt.png', size: '76%' },
        href: 'https://www.kircic.org/wordhunt',
        category: 'app',
    },
    'File Explorer': {
        description: 'Uses the File System Access API to let you view and edit your local files.',
        image: { icon: '@main/icon/openfolder.svg', size: '77%' },
        href: 'https://files.kircic.org',
        video: '@main/icon/files_preview.mp4',
        featured: 2,
        category: 'app',
        external_repo: 'file-manager',
    }
};
