import React from 'react';

// Utils
import slugify from 'slugify';

// Props
import Visions from "./props/Visions.js"
import HolySpaceBaby from "./props/HolySpaceBaby.js"
import ClickSound from "./props/ClickSound.js"
// import KeyPressSound from "./props/KeyPressSound.js"
import NextShow from "./props/NextShow.js"
import BabyColorPicker from "./props/BabyColorPicker.js"
import FunkBottle from "./props/FunkBottle.js"

// Sounds
// import cheer1Sound from '../sounds/cheer1.mp3';
// import cry1Sound from '../sounds/cry1.wav'; // https://freesound.org/people/Stevious42/sounds/259608/
// import gulpSound from '../sounds/gulp1.wav'; // https://freesound.org/people/CGEffex/sounds/102581/
import heartbeatSound from '../sounds/heartbeat.mp3'; // https://freesound.org/people/InspectorJ/sounds/485076/

// Twitch
// This has to be shut off for gatsby build because of breaking reference to window
const ReactTwitchEmbedVideo = typeof window !== `undefined` ? require("react-twitch-embed-video") : null


class Show extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      babyColor: 'cyan',
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

  render () {

    const scenes = [
      {
        name: "Stay tuned",
        bgVideo: "campfire-far",
        livestream: "hidden",
        babyClass: "hidden",
        children: (
          <div id="props">
            <h1 class="layout-center"><NextShow /></h1>
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
          
          (Welcome brothers sisters and siblings.  The name is Cowboy Elijah–your local prophet. Our religious cermony begins now.)[NEXT],
        `,
        children: (
          <div id="props">
            <h1>Stare into the flames!</h1>
            <p>Please unmute the Twitch player and make sure it is playing.</p>
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
          
          [TRIGGER DRUMS] I have summoned ye to this here magical campfire for a little ritual.  We will reenact the story of THE HOLY SPACE BABY. A story central to our faith.
          
          [SOLO]

          (First things, first, you'll have to... die.  Don't worry I'll make real quick work of it with my magic trombone.)[NEXT]
          `,
      },
      {
        name: "Goodbye cruel world",
        babyClass: "hidden",
        bgVideo: "heart-monitor",
        bgVideoOverlay: "flames",
        teleprompter: `
          [SOLO]
          
          (Brothers, sisters and siblings. My condolences, you are now dead.)[NEXT]
          `,        
          children: (
            <div id="props">
              <div class="layout-top">
                <p>Resist! Keep your heart beating!</p>
              </div>
              <div class="layout-bottom">
                <ClickSound sound={heartbeatSound} keyString="f">
                  <button style={{
                    margin: '10px auto',
                    display: 'block',
                    fontSize: 100,
                  }}>❤</button>
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
        children: (
          <div id="props">
            <div class="layout-top">
              <p>There was no resisting.</p>
            </div>
            <div class="layout-bottom">
              <p>Press F.</p>
            </div>
          </div>
        ),
      },
      {
        name: "Rebirth",
        bgVideo: "void",
        teleprompter: `
          You find yourself in an infant body with no memory of your previous life.  Everything is new and confusing.  And you seem to be able to choose your color.
          [SOLO LONG]
          
          (You are so thirsty from your journey. What's this? Something to drink? That sounds good right now. Have a sip.)[NEXT]
          `,
        children: (
          <div id="props">
            <BabyColorPicker setBabyColor={this.setBabyColor}/>
            <div class="layout-bottom -no-pointer">
              <p>Hover/tap to choose your vibe.</p>
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

        children: (
          <div id="props">
            <FunkBottle />
              <div class="layout-bottom -no-pointer">
                <p>Click/tap to drink.</p>
              </div>
          </div>
        ),
      },
      {
        name: "Visions",
        bgVideo: "vortex",
        teleprompter: `
          Rips in spacetime fly by revealing all possible universes.  You try to peek inside some of them.  What do you see?
          
          [LONG SOLO]
          
          (And you're left to float there.  Tryng to make sense of it all...)[NEXT]
        `,
        children: (
          <div id="props">
            <Visions/>
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
        children: (
          <div id="props">
            {/* TODO: <BassNotes/> */}
          </div>
        ),
      },
      {
      name: "Go in peace",
      bgVideo: "campfire-far",
      livestream: "hidden",
      teleprompter: `
        [WAIT]

        [Spooky] Don't forget to sign the mailing list ooooooooo.... Sign the mailing list.... Find out about what happens next.  Maniacly laughter 
      `,
        children: (
          <div id="props">
            {/* TODO: <MailingList /> */}
          </div>
        ),
      },
    ];

    let {scene, mode} = this.props;
    scene = Math.max(0,scene); // Render 0, if below
    scene = Math.min(scenes.length-1,scene); // Render last scene, if above

    const {babyColor} = this.state;

    const currentScene = scenes[scene];

    return (
      <div id={`scene-${slugify(currentScene.name, {lower: true})}`} className="scene">
        {typeof currentScene.bgVideo !== 'undefined' && <video id="bg-video" className="bg-video" playsInline autoPlay muted loop key={currentScene.bgVideo}>
          <source src={`/videos/${currentScene.bgVideo}.mp4`} type="video/mp4" />
        </video>}

        {typeof currentScene.bgVideoOverlay !== 'undefined' && <video id="bg-video-overlay" className="bg-video -overlay" playsInline autoPlay muted loop key={currentScene.bgVideoOverlay}>
          <source src={`/videos/${currentScene.bgVideoOverlay}.mp4`} type="video/mp4" />
        </video>}

        <div id="scene-name" className="-pointer-none">{currentScene.name}...</div>

        {typeof currentScene.children !== 'undefined' && currentScene.children}

        <HolySpaceBaby babyClass={typeof currentScene.babyClass !== 'undefined' &&  currentScene.babyClass} babyColor={babyColor}/>

        <div id="livestream" className={typeof currentScene.livestream !== 'undefined' &&  currentScene.livestream}>
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

        {(typeof currentScene.teleprompter !== 'undefined' && mode==="performer") && <div id="teleprompter">{currentScene.teleprompter}</div>}

        {/* Trigger warnings */}
        
      </div>
    );
  }
}

export default Show;