import React from 'react';
import _ from 'lodash';
import monsterPng from '../../img/monster/monster.png'
import cheesePng from '../../img/monster/cheese.png'
import minePng from '../../img/monster/mine.png'
import jewelPng from '../../img/monster/jewel.png'

const PIXI = typeof window !== `undefined` ? require("pixi.js") : null

export default class Monster extends React.Component {
  
  constructor() {
    super();

    this.monster = false;
    this.time=0;
    this.cheesePng = false;
    this.minePng = false;
    this.monsterPng = false;
    this.jewelPng = false;

    this.baddies = [];
    this.goodies = [];

    this.monsterSpriteWidth = 150;
    this.monsterSpriteHeight = 150;
    this.monsterSize = 150;
    this.sizeUnit = 40;
  }
  
  /**
   * After mounting, add the PIXI Renderer to the div and start the Application.
   */
  componentDidMount() {
    this.avatars = {};

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
    loader.add('cheesePng',cheesePng);
    loader.add('minePng',minePng);
    loader.add('monsterPng',monsterPng);
    loader.add('jewelPng',jewelPng);
    loader.load(this.handleAssetsLoaded);

    this.resizeTimeout = null;
    window.addEventListener('resize', this.handleResize)
  }

  handleAssetsLoaded = (loader, resources) => {
    this.monsterPng = resources.monsterPng;
    this.cheesePng = resources.cheesePng;
    this.minePng = resources.minePng;
    this.jewelPng = resources.jewelPng;

    this.monster = new PIXI.Sprite.from(this.monsterPng.texture);
    this.monsterSpriteHeight = this.monster.height;
    this.monsterSpriteWidth = this.monster.width;

    this.sizeThings();
    this.app.stage.addChild(this.monster);

    // Get the participant avatars
    this.getAvatars();

    for(let i=0;i<10;i++) {
      this.baddies[i] = new PIXI.Sprite.from(this.minePng.texture)
      this.app.stage.addChild(this.baddies[i]);
      this.baddies[i].width = 40;
      this.baddies[i].height = 40;
      this.baddies[i].dyingTime = 0;

      this.baddies[i].death = new PIXI.Graphics();
      this.baddies[i].death.filters = [new PIXI.filters.BlurFilter()];
      this.baddies[i].death.alpha = 0.5;
      this.app.stage.addChild(this.baddies[i].death);
    }

    for(let i=0;i<1;i++) {
      this.goodies[i] = new PIXI.Sprite.from(this.jewelPng.texture)
      this.app.stage.addChild(this.goodies[i]);
      this.goodies[i].width = 40;
      this.goodies[i].height = 40;
      this.goodies[i].dyingTime = 0;

      this.goodies[i].death = new PIXI.Graphics();
      this.goodies[i].death.filters = [new PIXI.filters.BlurFilter()];
      this.goodies[i].death.alpha = 0.5;
      this.app.stage.addChild(this.goodies[i].death);
    }

    this.app.ticker.add(this.animate);
  }

  sizeThings = () => {

    this.sizeUnit = Math.min(40,this.gameWidth/15);
    this.monsterSize = this.sizeUnit*3;

    this.monster.x = this.props.monster.x*this.gameWidth;
    this.monster.y = this.props.monster.y*this.gameHeight;

    this.monster.height = this.monsterSize;
    this.monster.width = this.monsterSize;
    this.monster.anchor.set(0.5);
    // this.monster.pivot.set(0,0); //this.monster.width/2,  this.monster.height/2);
  }

  // getBaddies = () => {
    
  //   this.props.baddies.map((baddy) => {

  //   })
  // }

  getAvatars = () => {

    // If new participant, add a corresponding avatar
    Object.keys(this.props.participants).map((key,index) => {
      if(typeof this.avatars[key] === 'undefined') {
        this.avatars[key] = this.props.participants[key];
        this.avatars[key].sprite = new PIXI.Sprite.from(this.cheesePng.texture);
        this.app.stage.addChild(this.avatars[key].sprite);
        this.avatars[key].sprite.x = this.props.participants[key].x*this.gameWidth-30;
        this.avatars[key].sprite.y = this.props.participants[key].y*this.gameWidth-30;
        this.avatars[key].sprite.height = 40;
        this.avatars[key].sprite.width = 40;
        this.avatars[key].line = new PIXI.Graphics();
        this.avatars[key].line.filters = [new PIXI.filters.BlurFilter()];
        this.app.stage.addChild(this.avatars[key].line);
        // this.avatars[key].sprite = new PIXI.Sprite.from(this.cheesePng.texture);
      }
    })

    // If an avatar no longer has a participant, remove it
    Object.keys(this.avatars).map((key,index) => {
      if(typeof this.props.participants[key] === 'undefined') {
        this.app.stage.removeChild(this.avatars[key].sprite);
        this.app.stage.removeChild(this.avatars[key].line);
        delete this.avatars[key];
      }
    })
  }

  handleResize = () => {
    // this.doResize();
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(this.doResize,300);
  }

  doResize = () => {
    // this.app.stop();
    // this.app.start();
    this.gameWidth=window.innerWidth;
    this.gameHeight=window.innerHeight;
    this.sizeThings();


    // this.app.resize(this.gameWidth, this.gameHeight);
    // this.app.stage.height = this.gameHeight;
    // this.app.stage.width = this.gameWidth;

    // if(this.monster) {
    //   this.sizeThings();
    // }
  }

  componentDidUpdate() {
    if(this.cheesePng) {this.getAvatars();}
  }
  
  animate = () => {
    this.monster.x += ((this.props.monster.x*this.gameWidth) - this.monster.x) * 0.16; //((this.props.monster.x*this.gameWidth - this.monster.width/2) - this.monster.x) * 0.16;
    this.monster.y += ((this.props.monster.y*this.gameHeight) - this.monster.y) * 0.16; // ((this.props.monster.y*this.gameHeight - this.monster.height/2) - this.monster.y) * 0.16;
    this.monster.rotation += (Math.atan2(this.props.monster.velY,this.props.monster.velX)-this.monster.rotation)*0.1;

    const flip = this.monster.rotation > Math.PI/2 || this.monster.rotation < -Math.PI/2  ? -1 : 1;
    // console.log(this.monster.rotation % (Math.PI*2));
    this.monster.scale.y =  this.monsterSize/this.monsterSpriteHeight * (flip + 0.2*Math.cos(this.time/10));

    Object.keys(this.props.participants).map((key,index) => {
      // if(typeof this.avatars[key] === 'undefined') {
      const avatarSize = this.sizeUnit;

      this.avatars[key].sprite.x += (this.props.participants[key].x*this.gameWidth-(this.props.participants[key].clicking ? avatarSize*2 : avatarSize) - this.avatars[key].sprite.x)*.2;
      this.avatars[key].sprite.y += (this.props.participants[key].y*this.gameHeight-(this.props.participants[key].clicking ? avatarSize*2 : avatarSize) - this.avatars[key].sprite.y)*.2;
      this.avatars[key].sprite.width += ( (avatarSize + (this.props.participants[key].clicking ? avatarSize : 0)) - this.avatars[key].sprite.width)*0.2;
      this.avatars[key].sprite.height += ( (avatarSize + (this.props.participants[key].clicking ? avatarSize : 0)) - this.avatars[key].sprite.height)*0.2;
      
      if (this.props.participants[key].mode !=='performer' && !this.props.participants[key].inactive) {
        this.avatars[key].sprite.alpha = 0.5;
      } else {
        this.avatars[key].sprite.alpha = 0;
      }
      // this.avatars[key].sprite = new PIXI.Sprite.from(this.cheesePng.texture);
    // }
      this.avatars[key].line.clear();
      if(this.props.participants[key].clicking){
        this.avatars[key].line.lineStyle(5, 0xffff00);
        this.avatars[key].line.moveTo(this.avatars[key].sprite.x+avatarSize,this.avatars[key].sprite.y+avatarSize);
        this.avatars[key].line.lineTo(this.monster.x, this.monster.y);
        // this.avatars[key].line.lineTo(this.monster.x + this.monster.width/2, this.monster.y + this.monster.height/2);
      }

    })

    this.props.baddies.map((baddy,index) => {
      this.baddies[index].height = this.sizeUnit* (1+ .2 * Math.cos(this.time/11));
      this.baddies[index].width = this.sizeUnit* (1+ .2 * Math.cos(this.time/11));
      this.baddies[index].x += (baddy.x*this.gameWidth-this.baddies[index].width/2 - this.baddies[index].x)*0.1;
      this.baddies[index].y += (baddy.y*this.gameHeight-this.baddies[index].height/2 - this.baddies[index].y)*0.1;
      this.baddies[index].alpha = baddy.dying ? 0 : 1;

      if(baddy.dying) {
        this.baddies[index].dyingTime+=1;
        this.baddies[index].death.clear();
        this.baddies[index].death.beginFill(0x18f601);
        this.baddies[index].death.drawCircle(this.baddies[index].x, this.baddies[index].y, this.baddies[index].dyingTime*30);
        this.baddies[index].death.endFill();
      } else {
        this.baddies[index].dyingTime=0;
        this.baddies[index].death.clear();
      }
    })

    this.props.goodies.map((goody,index) => {
      this.goodies[index].height = this.sizeUnit*2*(1+.2*Math.cos(this.time/20));
      this.goodies[index].width = this.sizeUnit*2*(1+.2*Math.cos(this.time/20));
      this.goodies[index].x = goody.x*this.gameWidth-this.goodies[index].width/2
      this.goodies[index].y = goody.y*this.gameHeight-this.goodies[index].height/2
      this.goodies[index].alpha = goody.dying ? 0 : 1;

      if(goody.dying) {
        this.goodies[index].dyingTime+=1;
        this.goodies[index].death.clear();
        this.goodies[index].death.lineStyle(10, 0xfd41ff);
        this.goodies[index].death.drawCircle(this.goodies[index].x+this.goodies[index].width/2, this.goodies[index].y+this.goodies[index].height/2, this.goodies[index].dyingTime*5);
        this.goodies[index].death.endFill();
      } else {
        this.goodies[index].dyingTime=0;
        this.goodies[index].death.clear();
      }
    })

    this.time+=1;
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
