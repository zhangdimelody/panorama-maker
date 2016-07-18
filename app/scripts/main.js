// import './main/index.jsx'
// import './panoramic/index.jsx'

// import '../css/main.sass'

let pathname = location.search;
let pathArray = pathname.split('?')

let realpath = './'+ pathArray[1] +'/index.jsx'

console.log(realpath)

require(realpath)

