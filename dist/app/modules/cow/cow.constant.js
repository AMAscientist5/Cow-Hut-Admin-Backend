"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowSearchableFields = exports.cowFilterableFields = exports.ICowCategory = exports.ICowLebel = exports.ICattleBreeds = exports.ICities = void 0;
exports.ICities = [
    'Dhaka',
    'Chattogram',
    'Barishal',
    'Rajshahi',
    'Sylhet',
    'Comilla',
    'Rangpur',
    'Mymensingh',
];
exports.ICattleBreeds = [
    'Brahman',
    'Nellore',
    'Sahiwal',
    'Gir',
    'Indigenous',
    'Tharparkar',
    'Kankrej',
];
exports.ICowLebel = ['for sale', 'sold out'];
exports.ICowCategory = ['Dairy', 'Beef', 'Dual Purpose'];
exports.cowFilterableFields = ['searchTerm', 'location'];
exports.cowSearchableFields = ['location', 'breed', 'category'];
