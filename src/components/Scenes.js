import React from 'react';

// Utils
import slugify from 'slugify';

// Chat
import Chat from "./Chat"

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

          ([Warm up])[NEXT]
        `,
        backgroundChildren: (
          <div id="props">
            <div className="layout-center -no-pointer">
            <p>The ceremony will begin at 7p CST sharp.</p>
            </div>
          </div>
        ),
      },
      {
        name: "Mic check",
        bgVideo: "campfire-far",
        babyClass: "hidden",
        teleprompter: `
          [Warm up]
          
          Intro
          
          (Introduce self and magic trombone)[NEXT],
        `,
        backgroundChildren: (
          <div id="props">
            <div className="layout-top -no-pointer">
              <p>Mic check!</p>
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
          
          [TRIGGER DRUMS] Introduce ritual/ceremony
          
          [SOLO]

          (Choose your death.)[NEXT]
          `,
      },
      {
        name: "Goodbye cruel world",
        babyClass: "hidden",
        bgVideo: "flames",
        teleprompter: `
          [SOLO]
          
          (You are now dead)[NEXT]
          `,        
          backgroundChildren: (
            <div id="props">
              <div className="layout-top -no-pointer">
                <p>Hooray! You are dying.</p>
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
          
          You will now be reborn!
          
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
          You are an infant.
          
          (Thirsty)[NEXT]
          `,
        backgroundChildren: (
          <div id="props">
            <BabyColorPicker setBabyColor={this.setBabyColor}/>
            <div className="layout-top -no-pointer">
              <p>You are reborn!</p>
            </div>
            <div className="layout-bottom -no-pointer">
              <p>Click a color.</p>
            </div>
          </div>
        ),
      },
      {
      name: "Drink up",
      bgVideo: "void",
      teleprompter: `
        [SOLO LONG]
        
        Yum.
        
        [STOP DRUMS] Uh oh.
        
        ([START SONG] You are launched!)[NEXT]
        `,

        backgroundChildren: (
          <div id="props">
            <FunkBottle incrementFunkLevel={this.incrementFunkLevel} />           
              <div className="layout-top -no-pointer">
                <p>You are thirsty.</p>
              </div>
              <div className="layout-bottom -no-pointer">
                <p>Click bottle.</p>
              </div>
          </div>
        ),
      },
      {
        name: "Visions",
        bgVideo: "vortex",
        babyClass: "flight",
        teleprompter: `
          Introduce portals
          
          [LONG SOLO]
          
          (Introduce meditation)[NEXT]
        `,
        backgroundChildren: (
          <div id="props">
            <Visions/>           
            <div className="layout-top -no-pointer">
              <p>You fly at light speed!</p>
            </div>
            <div className="layout-bottom -no-pointer">
              <p>Click portals to peak inside.</p>
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
              <p>You ponder: Are you enough?</p>
            </div>
            <div className="layout-bottom -no-pointer">
              <p style={{ maxWidth: '10em' }}>Click (and hold) lights to play bass notes.</p>
            </div>
          </div>
        ),
        onStart: () => {
          this.state.funkLevel = 0;
        }
      },
      {
        name: "Sermon",
        bgVideo: "campfire-far",
        babyClass: "hidden",
        teleprompter: `
          Back at fire

          "She who feels like not enough, is correct. For enoughness is hers to author. It is written in her heart, not the stars."

          Always chasing a feeling.  Of being worthy. Of belonging. Biological.
          


          No matter whether you feel like enough or not enough, you are correct because you are the only one who gets to say.

          (Goodbye)[NEXT],
        `,
        backgroundChildren: (
          <div id="props">
            <div className="layout-top -no-pointer">
              <p>"She who feels like not enough, is correct. For enoughness is hers to author. It is written in her heart, not the stars."</p>
            </div>
            <div className="layout-bottom -no-pointer">
              <p>Book of Cowboy Jobe 3:17-20</p>
            </div>
          </div>
        ),
      },
      {
        name: "Go in peace",
        bgVideo: "campfire-far",
        livestream: "hidden",
        teleprompter: `
          [Spooky] Call to action

          [Jam]
        `,
        foregroundChildren: (
          <div id="props">
            <CTA />
          </div>
        ),
      },
    ];

    let {scene, mode, messages, newParticipantEvent} = this.props;
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

          <h1 id="title" className="-pointer-none">HolySpaceBaby</h1>

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

        <Chat newParticipantEvent={newParticipantEvent} messages={messages} />

        {(typeof currentScene.teleprompter !== 'undefined' && mode==="performer") && <div id="teleprompter">{currentScene.teleprompter}</div>}
        
      </div>
    );
  }
}

export default Show;