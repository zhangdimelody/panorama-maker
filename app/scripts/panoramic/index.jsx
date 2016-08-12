import React from 'react'
import THREE from 'three'
// import ReactTHREE from 'react-three'
import React3 from 'react-three-renderer'
import ReactDOM from 'react-dom'
import OrbitControls from '../../lib/OrbitControls.js'
import MTLLoader from '../../lib/MTLLoader.js'
import UTF8Loader from '../../lib/UTF8Loader.js'

import Upload from '../upload/index.jsx'

import { createStore, bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'

import { data } from './reducer.jsx'
import { changeMaterial, resizeWindow } from './action.jsx'


let store = createStore(data);



class Simple extends React.Component {
  constructor(props, context) {
    super(props);

    let dist = 5
    this.height = 40
    // this.fov = 2 * Math.atan( this.height/ (2*dist) ) * (180/Math.PI)

    this.cameraPosition = new THREE.Vector3(0, 0, dist);

    // this.state = {
    //   material: null,
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    // }

    this.WORLD_DERIC = {
      TOP: new THREE.Vector3(0, 1, 0),
      DOWN: new THREE.Vector3(0, -1, 0),
      LEFT: new THREE.Vector3(1, 0, 0),
      RIGHT: new THREE.Vector3(-1, 0, 0),
      FRONT: new THREE.Vector3(0, 0, -1),
      BACK: new THREE.Vector3(0, 0, 1)
    };
    

    window.addEventListener("resize", function(){
      // this.setState({
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      // })
      this.props.actions.resizeWindow({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }.bind(this));

    this.changeMaterial('app/images/1.jpg')

    this.clock = new THREE.Clock();

    this.raycaster = new THREE.Raycaster();
  }
  componentDidMount() {
    this.refs.geometry.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
    
    const canvas = ReactDOM.findDOMNode(this.refs.react3)
    
    let controls = new THREE.OrbitControls(this.refs.mainCamera, canvas);

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
    this.scene = this.refs.scene;
    
    let ambientLight = new THREE.AmbientLight( 0x000000 )
    let light = new THREE.DirectionalLight(0xffffff, 1, 0)
    light.position.set(0, 100, 10)

    this.scene.add(ambientLight)
    this.scene.add(light)

    window.addEventListener("click", this.onClickFunc.bind(this), false);
  }

  onClickFunc(e){
    // debugger
    let self = this;
    let mouse = {};
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(mouse, this.camera);
    this.intersects = this.raycaster.intersectObjects(this.model[0].children);
    console.log(this.intersects)

    if(this.intersects && this.intersects.length > 0){
      // this.animate();
      // setInterval(function(){
        self.animate();
      // }.bind(self), 2)
    }
  }

  animate(){
    // debugger
    // requestAnimationFrame(this.animate())

    let delta = 0.75 * this.clock.getDelta();

    if(this.mix){
      this.mix.update(delta)
    }

  }

  changeMaterial(url) {
    let self = this;
    let loader = new THREE.TextureLoader();
    loader.load(url, function(texture){
      self.props.actions.changeMaterial(texture);
      // self.render;
    })
  }
  addModel() {
    let self = this;

    // let loader = new THREE.JSONLoader();
    // let callbackFunc = function( geometry, material ){
    //   let model = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({ color: 0xffff00 }) );
    //   model.position.set(0, 0, 3);
    //   model.scale.set(1, 1, 1);
    //   model.name = "pikachu";
    //   self.refs.scene.add(model)
    // }

    let objectLoader = new THREE.ObjectLoader();
    objectLoader.load("app/json/animate.json", function ( obj ) {
      obj.position.set(0, 0, -10);
      obj.scale.set(0.15, 0.15, 0.15);
      obj.rotation.y = 90* Math.PI/180
      obj.name = "pikachu";

      let animate = obj.animations[0];
      let mix = new THREE.AnimationMixer( obj )
      mix.clipAction( animate ).play();

      self.mix = mix;
      self.refs.scene.add(obj)

      
      // debugger
      self.model = obj.children
      
      // window.requestAnimationFrame(self.animate.bind(self))
    });

    // let jsLoader = new THREE.UTF8Loader();
    // jsLoader.load( "app/json/hand.js", function ( object ) {
    //   // let end = Date.now();
    //   // console.log( "hand", end - start, "ms" );
    //   let s = 10;
    //   object.position.set(0, -5, -15);
    //   object.scale.set( s, s, s );
    //   // object.rotation.y = 90 * Math.PI/180
    //   // object.rotation.z = -20 * Math.PI/180
    //   // object.position.x = 125;
    //   // object.position.y = -125;
    //   self.scene.add( object );
    //   object.traverse( function( node ) {
    //     node.castShadow = true;
    //     node.receiveShadow = true;
    //   } );
    // }, { normalizeRGB: true } );

  
    // max to obj to js ,use python format
    // let loader = new THREE.JSONLoader();
    // let callbackMale = function ( geometry, materials ) { 
    //   self.createScene( geometry, materials, 0, -6, -10, 105 ) };
    // // let callbackFemale = function ( geometry, materials ) { 
    // //   createScene( geometry, materials, -80, FLOOR, 50, 0 ) };
    // loader.load( "app/json/1.js", callbackMale );
  }

  createScene( geometry, materials, x, y, z, b ) {
    let zmesh = new THREE.Mesh( geometry, new THREE.MultiMaterial( materials ) );
    // debugger
    zmesh.position.set( x, y, z );
    zmesh.scale.set( 0.4, 0.4, 0.4 );
    this.scene.add( zmesh );
    // createMaterialsPalette( materials, 100, b );
  }



  shouldComponentUpdate(nextProps, nextState) {
    return !!nextProps.material
  }

  render() {
    const { actions, material, matHeight, width, height } = this.props;
    console.log(actions)
    console.log(material)
    console.log("this.props")
    console.log(this.props)

    return (
      <div>
        <a className="add-one" onClick={ this.addModel.bind(this) }>添加一个3d模型</a>
        <Upload changeMaterial={ this.changeMaterial.bind(this) } />
        <React3 ref="react3" mainCamera="camera" width={ window.innerWidth } height={ window.innerHeight }  antialias >
          <scene ref="scene">
            <perspectiveCamera name="camera" fov={75} aspect={1} near={1} far={100} position={this.cameraPosition} ref="mainCamera"/>
            <mesh position={new THREE.Vector3(0,0,0)} quaternion={new THREE.Quaternion() }>
              <cylinderGeometry radiusTop={20} radiusBottom={20} height={matHeight} ref="geometry"  radialSegments={30} heightSegments={30} openEnded={1}/>
              <meshBasicMaterial map={material} side={THREE.DoubleSide} />
            </mesh>
          </scene>
        </React3>
      </div>
    )
  }
              // <sphereGeometry radius={50} widthSegments={20} heightSegments={20} ref="geometry" />
}


function mapStateToProps(state){
  // console.log(state)
  // let m = state ? state.material : null;
  return { material: state.material, width: window.innerWidth, height: window.innerHeight }
}

function mapDispatchToProps(dispatch){
  return {  
    actions: bindActionCreators({
      changeMaterial,
      resizeWindow,
    }, dispatch)
  }
}

Simple = connect(mapStateToProps, mapDispatchToProps)(Simple)


ReactDOM.render(
  <Provider store={ store }>
    <Simple />
  </Provider>
  , document.getElementById('wrap'))






