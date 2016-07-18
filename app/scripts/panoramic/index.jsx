import React from 'react'
import THREE from 'three'
// import ReactTHREE from 'react-three'
import React3 from 'react-three-renderer'
import ReactDOM from 'react-dom'
import OrbitControls from '../../lib/OrbitControls.js'

import Upload from '../upload/index.jsx'

class Simple extends React.Component {
  constructor(props, context) {

    super(props, context);

    let dist = 5
    this.height = 40
    // this.fov = 2 * Math.atan( this.height/ (2*dist) ) * (180/Math.PI)

    this.cameraPosition = new THREE.Vector3(0, 0, dist);

    this.state = {
      material: null,
      width: window.innerWidth,
      height: window.innerHeight,
    }

    this.WORLD_DERIC = {
      TOP: new THREE.Vector3(0, 1, 0),
      DOWN: new THREE.Vector3(0, -1, 0),
      LEFT: new THREE.Vector3(1, 0, 0),
      RIGHT: new THREE.Vector3(-1, 0, 0),
      FRONT: new THREE.Vector3(0, 0, -1),
      BACK: new THREE.Vector3(0, 0, 1)
    };
    


    window.addEventListener("resize", function(){
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }.bind(this));

    this.changeMaterial('app/images/2.jpg')

  }

  

  componentDidMount() {
    this.refs.geometry.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
    
    const canvas = ReactDOM.findDOMNode(this.refs.react3)
    
    let controls = new THREE.OrbitControls(this.refs.mainCamera, canvas);
    controls.noZoom = false

    // controls.minDistance = 1; // how far can you zoom in
    // controls.maxDistance = 6; // how far can you zoom out   
    // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
    // controls.minPolarAngle = 90*(Math.PI/180);
    // controls.maxPolarAngle = 90*(Math.PI/180);
    // How far you can orbit horizontally, upper and lower limits.
    // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
    // controls.minAzimuthAngle = - Infinity; // radians
    // controls.maxAzimuthAngle = Infinity; // radians

    this.controls = controls;

    this.camera = this.refs.mainCamera;

  }


  changeMaterial(url) {
    let self = this;
    let loader = new THREE.TextureLoader();
    loader.load(url, function(texture){
      // debugger
      self.setState({ material: texture })
    })
  }

  render() {

    return (
      <div>
        <Upload changeMaterial={ this.changeMaterial.bind(this) } />
        <React3 ref="react3" mainCamera="camera" width={this.state.width} height={this.state.height}  antialias >
          <scene>
            <perspectiveCamera name="camera" fov={75} aspect={1} near={1} far={100} position={this.cameraPosition} ref="mainCamera"/>
            <mesh position={new THREE.Vector3(0,0,0)} quaternion={new THREE.Quaternion() }>
              <cylinderGeometry radiusTop={20} radiusBottom={20} height={40} ref="geometry"  radialSegments={30} heightSegments={30} openEnded={1}/>
              <meshBasicMaterial map={this.state.material} side={THREE.DoubleSide} />
            </mesh>
          </scene>
        </React3>
      </div>
    )
  }
              // <sphereGeometry radius={50} widthSegments={20} heightSegments={20} ref="geometry" />

}



ReactDOM.render(<Simple></Simple>, document.getElementById('wrap'))

