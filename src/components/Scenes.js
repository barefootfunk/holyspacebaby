import React from 'react';

// Utils
import slugify from 'slugify';

// Props
import Visions from "./props/Visions"
import CTA from "./props/CTA"
import HolySpaceBaby from "./props/HolySpaceBaby"
import ClickSound from "./props/ClickSound"
import NextShow from "./props/NextShow"
import BabyColorPicker from "./props/BabyColorPicker"
import FunkBottle from "./props/FunkBottle"
import BassMatrix from "./props/BassMatrix"

// Sounds
import cheer1Sound from '../sounds/cheer1.mp3';

// Twitch
// This has to be shut off for gatsby build because of breaking reference to window
const ReactTwitchEmbedVideo = typeof window !== `undefined` ? require("react-twitch-embed-video") : null


class Show extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      babyColor: 'lime',
      funkLevel: 0,
    }

    this.setBabyColor = this.setBabyColor.bind(this);
  }

  // // Preload all videos in the background...
  // function _preloadVideos() {

  //   // Get a list of all video names
  //   var names = Object.keys(videoUrls);

  //   // Empty object for the XMLHttpRequests
  //   var requests = {};

  //   // Loop through each video
  //   for(var i=0; i<names.length; i++ ) {

  //     // New request object
  //     requests[names[i]] = new XMLHttpRequest();

  //     // On load subsititue our blob URL for file URL currently in use..
  //     // Must create a closure around this so we can reference the correct
  //     // name in the onload callback -- we can't use i, because by the time
  //     // it loads, this loop will be long done
  //     (function (name) {

  //       // *Panting* NOW we can do our onload callback with 'name'
  //       requests[name].onload = function() {

  //         // The URL that contains the preloaded vidya
  //         var blobUrl = URL.createObjectURL(requests[name].response);
  //         console.log('loaded '+name+'.mp4 to: '+blobUrl);

  //         // Subsitute it
  //         videoUrls[name] = blobUrl;
  //       };

  //     })(names[i]);

  //     // Now make with the loading already!
  //     requests[names[i]].open("GET", videoUrls[names[i]]);
  //     requests[names[i]].responseType = "blob";
  //     requests[names[i]].send();
  //   }
  // }

    // TODO: I think reducer pattern is the right way to generalize this.
  setBabyColor(newBabyColor) {
    this.setState({
      babyColor: newBabyColor,
    })
  }
  incrementFunkLevel = () => {
    this.setState({
      funkLevel: this.state.funkLevel + 1,
    })
  }

  render () {

    const scenes = [
      {
        name: "Stay tuned",
        bgVideo: "campfire-far",
        livestream: "hidden",
        babyClass: "hidden",
        foregroundChildren: (
          <div id="props">
            <CTA />
          </div>
        ),
      },
      {
        name: "Pre-show",
        bgVideo: "campfire-far",
        livestream: "hidden",
        babyClass: "hidden",
        teleprompter: `
          (Kill it dude!  Get pumped! Have FUN.)

          ([Meditate and Pray])[NEXT]
        `,
        backgroundChildren: (
          <div id="props">
            <div className="layout-center -no-pointer">
            <p>The ceremony will begin shortly.</p>
            </div>
          </div>
        ),
      },
      {
        name: "Mic check",
        bgVideo: "campfire-far",
        babyClass: "hidden",
        teleprompter: `
          [Meditate and Pray]
          
          Oh! I didn't see you there.
          
          (Welcome brothers sisters and siblings.  The name is Cowboy Elijah–your local prophet. Our ceremony begins now.)[NEXT],
        `,
        backgroundChildren: (
          <div id="props">
            <div className="layout-top -no-pointer">
              <p>Stare into the flames!</p>
            </div>
            <div className="layout-bottom -no-pointer">
              <p style={{ maxWidth: '10em' }}>Be sure livestream is UNMUTED and PLAYING.</p>
            </div>
          </div>
        ),
      },
      {
        name: "Welcome",
        bgVideo: "campfire2", //5 is also cool
        livestream: "big",
        babyClass: "hidden",
        teleprompter: `
          [SOLO]
          
          [TRIGGER DRUMS] I have summoned ye to this here magical campfire to take you on a spiritual journey. In fact this is my first ever ceremony, so forgive me.
          
          [SOLO]

          (First things, first, you'll have to... die.  Don't worry I'll take care of the hard part. I'm killing you right now with my magical trombone.)[NEXT]
          `,
      },
      {
        name: "Goodbye cruel world",
        babyClass: "hidden",
        bgVideo: "flames",
        teleprompter: `
          [SOLO]
          
          (Brothers, sisters and siblings. My condolences, you are now dead.)[NEXT]
          `,        
          backgroundChildren: (
            <div id="props">
              <div className="layout-top -no-pointer">
                <p>Hooray! You are currently dying!</p>
              </div>
              <div className="layout-bottom">
                <ClickSound sound={cheer1Sound} keyString="f">
                  <button className="button">REJOICE BUTTON</button>
                </ClickSound>
              </div>
            </div>
          )
      },
      {
        name: "You have died",
        bgVideo: "graveyard",
        bgVideoOverlay: "flames",
        babyClass: "hidden",
        teleprompter: `
          [SOLO]
          
          Hmmm. that wasn't so bad.  Wonder what all the philosophers were fussing about.  Anyway, don't fret none. For you will now be reborn in your true form!
          
          ([SOLO])[NEXT]
          `,
        backgroundChildren: (
          <div id="props">
            <div className="layout-top -no-pointer">
              <p>Hooray! You are dead!</p>
            </div>
            <div className="layout-bottom">
              <ClickSound sound={cheer1Sound} keyString="f">
                <button className="button">REJOICE BUTTON</button>
              </ClickSound>
            </div>
          </div>
        ),
      },
      {
        name: "Rebirth",
        bgVideo: "void",
        teleprompter: `
          Wow! It actullay worked!  You came back!  So, as you can see, you find yourself in an infant body with no memory of your previous life.  Everything is new and confusing.  And you seem to be able to choose your color.
          [SOLO LONG]
          
          (You are so thirsty from your journey. What's this? Something to drink? That sounds good right now. Have a sip.)[NEXT]
          `,
        backgroundChildren: (
          <div id="props">
            <BabyColorPicker setBabyColor={this.setBabyColor}/>
            <div className="layout-top -no-pointer">
              <p>You are reborn!</p>
            </div>
            <div className="layout-bottom -no-pointer">
              <p>Click/tap a color.</p>
            </div>
          </div>
        ),
      },
      {
      name: "Drink up",
      bgVideo: "void",
      teleprompter: `
        [SOLO LONG]
        
        Mmmmmm. It's so yummy.
        
        [STOP DRUMS] Uh oh.  You feel something strange inside ya.
        
        ([START SONG] You find yourself launched into the multiverse at light speed! What was in that bottle?!!!)[NEXT]
        `,

        backgroundChildren: (
          <div id="props">
            <FunkBottle incrementFunkLevel={this.incrementFunkLevel} />           
              <div className="layout-top -no-pointer">
                <p>You are thirsty.</p>
              </div>
              <div className="layout-bottom -no-pointer">
                <p>Click/tap bottle.</p>
              </div>
          </div>
        ),
      },
      {
        name: "Visions",
        bgVideo: "vortex",
        babyClass: "flight",
        teleprompter: `
          Rips in spacetime fly by revealing all possible universes.  You try to peek inside some of them.  What do you see?
          
          [LONG SOLO]
          
          (And you're left to float there.  Tryng to make sense of it all...)[NEXT]
        `,
        backgroundChildren: (
          <div id="props">
            <Visions/>           
            <div className="layout-top -no-pointer">
              <p>You fly at light speed!</p>
            </div>
            <div className="layout-bottom -no-pointer">
              <p>Click/tap portals.</p>
            </div>
          </div>
        ),
      },
      {
        name: "Meditation",
        bgVideo: "purple",
        teleprompter: `
          [Chill Music]
          
          What happened next?  Well we'll have to get to that next time.  For now, go in peace.

          [SONG + PRAY]

          [NEXT]
        `,
        backgroundChildren: (
          <div id="props">
            <BassMatrix />        
            <div className="layout-top -no-pointer">
              <p>You float and ponder!</p>
            </div>
            <div className="layout-bottom -no-pointer">
              <p>Click/tap (and hold) on lights.</p>
            </div>
          </div>
        ),
        onStart: () => {
          this.state.funkLevel = 0;
        }
      },
      {
        name: "Go in peace",
        bgVideo: "campfire-far",
        livestream: "hidden",
        teleprompter: `
          [WAIT]

          [Spooky] Don't forget to sign the mailing list ooooooooo.... Sign the mailing list.... Find out about what happens next.  Maniacly laughter 
        `,
        foregroundChildren: (
          <div id="props">
            <CTA />
          </div>
        ),
      },
    ];

    let {scene, mode} = this.props;
    scene = Math.max(0,scene); // Render 0, if below
    scene = Math.min(scenes.length-1,scene); // Render last scene, if above

    const currentScene = scenes[scene];

    // Run onStart function
    if(typeof currentScene.onStart !== 'undefined') { currentScene.onStart() }

    const {babyColor, funkLevel} = this.state;

    return (
      <div 
        id={`scene-${slugify(currentScene.name, {lower: true})}`} 
        className="scene"
        style={{
          '--baby-color': babyColor,
          '--funk-level-normalized': 1-(1/Math.pow(((funkLevel)/50+1),2)),
          '--funk-level': funkLevel,
        }}
      >
  
        {typeof currentScene.bgVideo !== 'undefined' && <video id="bg-video" className="bg-video" playsInline autoPlay muted loop key={currentScene.bgVideo}>
          <source src={`/videos/${currentScene.bgVideo}.mp4`} type="video/mp4" />
        </video>}

        {typeof currentScene.bgVideoOverlay !== 'undefined' && <video id="bg-video-overlay" className="bg-video -overlay" playsInline autoPlay muted loop key={currentScene.bgVideoOverlay}>
          <source src={`/videos/${currentScene.bgVideoOverlay}.mp4`} type="video/mp4" />
        </video>}

        {/* <div id="scene-name" className="-pointer-none">{currentScene.name}...</div> */}

          <h1 id="title" className="-pointer-none">HOLY SPACE BABY</h1>

        {typeof currentScene.backgroundChildren !== 'undefined' && currentScene.backgroundChildren}

        <div id="livestream" className={typeof currentScene.livestream !== 'undefined' ? currentScene.livestream : ''}>
          <div className="animation-wrap">
            <div className="sizing-wrap">
              {typeof window !== `undefined` && <ReactTwitchEmbedVideo // This has to be shut off for gatsby build because of breaking reference to window
                channel="barefootfunk"
                allowfullscreen={false}
                autoplay={true}
                layout={'video'}
                allow="autoplay"
                muted={false}
              />}
            </div>
          </div>
        </div>

        {typeof currentScene.foregroundChildren !== 'undefined' && currentScene.foregroundChildren}
       
        <HolySpaceBaby babyClass={typeof currentScene.babyClass !== 'undefined' ?  currentScene.babyClass : ''} />

        <div id="funk-overlay" />

        {(typeof currentScene.teleprompter !== 'undefined' && mode==="performer") && <div id="teleprompter">{currentScene.teleprompter}</div>}

        {/* Trigger warnings */}
        
      </div>
    );
  }
}

export default Show;