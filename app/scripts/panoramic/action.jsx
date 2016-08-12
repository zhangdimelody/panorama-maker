export function changeMaterial(material){
  return {
    type: "CHANGEMATERIAL",
    material,
    matHeight: 40 + Math.floor(Math.random()* 10)
  }
}

export function resizeWindow(options){
  return {
    type: "RESIZEWINDOW",
    width: options.width,
    height: options.height,
  }
}

