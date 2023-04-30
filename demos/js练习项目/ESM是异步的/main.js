console.log('Start')

import { funA } from './moduleA.mjs';


funA();

import('./moduleB.mjs').then((module)=>{
    console.log('load B success')
})

console.log('end');