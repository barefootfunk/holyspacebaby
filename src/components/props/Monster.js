import React from 'react';
import _ from 'lodash';
import monsterSvg from '../../img/monster/monster.svg'

const PIXI = typeof window !== `undefined` ? require("pixi.js") : null

export default class Monster extends React.Component {
  
  constructor() {
    super();

    this.monster = false;
  }
  
  /**
   * After mounting, add the PIXI Renderer to the div and start the Application.
   */
  componentDidMount() {
    this.avatars = {};
    this.getAvatars();

    this.gameWidth=window.innerWidth;
    this.gameHeight=window.innerHeight;

    this.app = new PIXI.Application({
      width: this.gameWidth, 
      height: this.gameHeight, 
      transparent: true,
      resizeTo: window,
      autoDensity: true,
      resolution: devicePixelRatio
    });
    this.gameCanvas.appendChild(this.app.view);
    this.app.start();

    const loader = new PIXI.Loader();
    loader.add('monsterSvg',monsterSvg);
    loader.load(this.handleAssetsLoaded);

    this.resizeTimeout = null;
    window.addEventListener('resize', this.handleResize)
  }

  handleAssetsLoaded = (loader, resources) => {
    this.monster = new PIXI.Sprite.from(resources.monsterSvg.texture);
    this.sizeMonster();
    this.app.stage.addChild(this.monster);

    this.app.ticker.add(this.animate);
  }

  sizeMonster = () => {
    this.monster.x = this.props.monster.x*this.gameWidth - 0.5*this.monster.width;
    this.monster.y = this.props.monster.y*this.gameHeight - 0.5*this.monster.height;
    this.monster.height = this.gameWidth/10;
    this.monster.width = this.gameWidth/10;

  }

  getAvatars = () => {

    // If new participant, add a corresponding circle
    Object.keys(this.props.participants).map((key,index) => {
      if(typeof this.avatars[key] === 'undefined') {
        this.avatars[key] = this.props.participants[key];
      }
    })

    // If a circle no longer has a participant, remove it
    Object.keys(this.avatars).map((key,index) => {
      if(typeof this.props.participants[key] === 'undefined') {
        delete this.avatars[key];
      }
    })
  }

  handleResize = () => {
    this.doResize();
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(this.doResize,300);
  }

  doResize = () => {
    this.gameWidth=window.innerWidth;
    this.gameHeight=window.innerHeight;


    this.app.resize(this.gameWidth, this.gameHeight);
    this.app.stage.height = this.gameHeight;
    this.app.stage.width = this.gameWidth;

    if(this.monster) {
      this.sizeMonster();
    }
  }

  componentDidUpdate() {
    this.getAvatars();
  }
  
  animate = () => {
    this.monster.x += ((this.props.monster.x*this.gameWidth-this.monster.width/2) - this.monster.x) * 0.16;
    this.monster.y += ((this.props.monster.y*this.gameHeight-this.monster.height/2) - this.monster.y) * 0.16;
    console.log(this.monster.x,this.monster.y)
  }

  /**
   * Stop the Application when unmounting.
   */
  componentWillUnmount() {
    this.app.stop();

    clearTimeout(this.resizeTimeout);

    window.removeEventListener('resize', this.handleResize)
  }
  
  /**
   * Simply render the div that will contain the PIXI Renderer.
   */
  render() {

    return (
      <div ref={(thisDiv) => {this.gameCanvas = thisDiv}} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}/>
    );
  }
}
