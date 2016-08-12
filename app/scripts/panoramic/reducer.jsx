const initialState = {
  material: null,
  matHeight: 40,
  width: window.innerWidth,
  height: window.innerHeight,
}

export function data (state=initialState, action){
  switch(action.type){
    case "CHANGEMATERIAL":
      return {
        material: action.material
      }
    case "RESIZEWINDOW":
      return {
        width: action.width,
        height: action.height,
      }
    default:
      return initialState;
  }
}



