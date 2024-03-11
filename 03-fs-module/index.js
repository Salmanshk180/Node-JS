"use strict";
const fs = require("fs");
// fs.writeFileSync("./test.txt","hello world");
fs.writeFile("./test.txt", "hello world!!!!!!!!!!!!!!!!!!!", (err, data) => { });
// const result = fs.readFileSync("./test.txt");
// console.log(result.toString());
// fs.readFile("./test.txt",(err:NodeJS.ErrnoException|null,result:Buffer)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(result.toString());
//     }
// })
