import React from 'react';
import _ from 'lodash';
const PIXI = typeof window !== `undefined` ? require("pixi.js") : null

// https://medium.com/@peeyush.pathak18/pixijs-with-react-3cd40738180
// protectator.ch/post/pixijs-v4-in-a-react-component

export default class DarkWall extends React.Component {
  
  constructor() {
    super();
  }
  
  /**
   * After mounting, add the PIXI Renderer to the div and start the Application.
   */
  componentDidMount() {
    this.circles = {};
    this.getCircles();

    this.darknessWidth=window.innerWidth;
    this.darknessHeight=window.innerHeight;

    this.app = new PIXI.Application({
      width: this.darknessWidth, 
      height: this.darknessHeight, 
      transparent: true,
      resizeTo: window,
      autoDensity: true,
      resolution: devicePixelRatio
    });
    this.gameCanvas.appendChild(this.app.view);
    this.app.start();

    this.holeMask = new PIXI.Graphics()
    this.holeSpriteCanvas = document.createElement('canvas');
    this.holeSpriteCanvas.width = this.darknessWidth;
    this.holeSpriteCanvas.height = this.darknessHeight;
    this.holeSpriteCtx = this.holeSpriteCanvas.getContext('2d');
    this.holeSprite = new PIXI.Sprite(PIXI.Texture.from(this.holeSpriteCanvas));


    this.darkness = new PIXI.Graphics()
    this.darkness.beginFill(0x000000)
    this.darkness.drawRect(0, 0, this.darknessWidth, this.darknessHeight)
    this.darkness.endFill()
    this.darkness.mask=this.holeSprite;

    this.app.stage.addChild(this.darkness);

    this.animateHolesCanvas();

    this.resizeTimeout = null;
    window.addEventListener('resize', this.handleResize)
  }

  getCircles = () => {

    // If new participant, add a corresponding circle
    Object.keys(this.props.participants).map((key,index) => {
      if(typeof this.circles[key] === 'undefined') {
        this.circles[key] = this.props.participants[key];
      }
    })

    // If a circle no longer has a participant, remove it
    Object.keys(this.circles).map((key,index) => {
      if(typeof this.props.participants[key] === 'undefined') {
        delete this.circles[key];
      }
    })
  }

  handleResize = () => {
    this.doResize();
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(this.doResize,300);
  }

  doResize = () => {
    this.darknessWidth=window.innerWidth;
    this.darknessHeight=window.innerHeight;


    this.app.resize(this.darknessWidth, this.darknessHeight);
    this.app.stage.height = this.darknessHeight;
    this.app.stage.width = this.darknessWidth;
    // this.app.stage.scale.set ( this.darknessHeight/this.darknessWidth ); 

    // this.app.stage.position.set(this.app.renderer.width/2, this.app.renderer.height/2);
    // const ratio = this.darknessHeight
    // this.app.stage.scale.set(ratio, ratio);
    // this.app.stage.pivot.set(this.darknessWidth/2, this.darknessHeight/2);

    this.holeSpriteCanvas.width = this.darknessWidth;
    this.holeSpriteCanvas.height = this.darknessHeight;
  }

  componentDidUpdate() {
    this.getCircles();
  }
  
  animateHolesCanvas = () => {

    this.holeSpriteCtx.clearRect(0, 0, this.darknessWidth, this.darknessHeight)

    this.holeSpriteCtx.fillStyle = "#ffffff";
    this.holeSpriteCtx.fillRect(0, 0, this.darknessWidth, this.darknessHeight);
    // console.log(darknessHeight)

    // console.log(this.darknessWidth, this.darknessHeight)

    this.holeSpriteCtx.fillStyle = "#000000";

    Object.keys(this.circles).map((key,index) => {

      if (this.props.participants[key].mode !=='performer' && !this.props.participants[key].inactive) {
        this.circles[key].x += (this.props.participants[key].x - this.circles[key].x) * 0.16;
        this.circles[key].y += (this.props.participants[key].y - this.circles[key].y) * 0.16;


        const circle = this.circles[key];
        // console.log(circle.x, circle.y);

        const x = circle.x*this.darknessWidth;
        const y = circle.y*this.darknessHeight;
        this.holeSpriteCtx.beginPath();
        this.holeSpriteCtx.arc(x, y, 40-(this.props.difficulty*7), 0, Math.PI*2);
        this.holeSpriteCtx.fill();
      }
    })

    this.holeSprite.texture.update();

    requestAnimationFrame(this.animateHolesCanvas);
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
