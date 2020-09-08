import React from 'react';

// Utils
import slugify from 'slugify';

// Props
import Visions from "./props/Visions.js"
import HolySpaceBaby from "./props/HolySpaceBaby.js"
import ClickSound from "./props/ClickSound.js"
import KeyPressSound from "./props/KeyPressSound.js"
import NextShow from "./props/NextShow.js"
import BabyColorPicker from "./props/BabyColorPicker.js"

// Sounds
import cheer1Sound from '../sounds/cheer1.mp3';
import cry1Sound from '../sounds/cry1.wav'; // https://freesound.org/people/Stevious42/sounds/259608/
import gulpSound from '../sounds/gulp1.wav'; // https://freesound.org/people/CGEffex/sounds/102581/
import heartbeatSound from '../sounds/heartbeat.mp3'; // https://freesound.org/people/InspectorJ/sounds/485076/

// Twitch
// This has to be shut off for gatsby build because of breaking reference to window
const ReactTwitchEmbedVideo = typeof window !== `undefined` ? require("react-twitch-embed-video") : null


class Show extends React.Component {

  

  render () {

    const scenes = [
      {
        name: "Stay tuned",
        bgVideo: "campfire-far",
        livestream: "hidden",
        babyClass: "hidden",
        children: (
          <div id="props">
            <h1 class="window-center"><NextShow /></h1>
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

          (First things, first, for this ceremony to commence, you'll have to er em... this is awkward. You'll have to die.  In fact I'm killing you right now. My sincere apologies.)[NEXT]
          `,
      },
      {
        name: "Goodbye cruel world",
        babyClass: "hidden",
        bgVideo: "heart-monitor",
        teleprompter: `
          [SOLO]
          
          (Brothers, sisters and siblings. My condolences, you are now dead.)[NEXT]
          `,        
          children: (
            <div id="props">
              <div class="layout-bottom">
                <ClickSound sound={heartbeatSound} keyString="f"><button>❤ Struggle to Beat ❤</button></ClickSound>
              </div>
            </div>
          )
      },
      {
        name: "You have died",
        bgVideo: "graveyard",
        babyClass: "hidden",
        teleprompter: `
          [SOLO]
          
          Hmmm. that wasn't so bad.  Wonder what all the philosophers were fussing about.  By the way, did you remember to tell everyone you loved them?  I always forget to do that.  Anyway, don't fret none. For you will now be reborn in your true form!
          
          ([SOLO])[NEXT]
          `,
        children: (
          <div id="props">
            <h1>Press F.</h1>
            <KeyPressSound sound={cry1Sound} keyString="f" />
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
            <BabyColorPicker/>
              <div class="layout-bottom -no-pointer">
                <p>Choose a color.</p>
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
            {/* TODO: <FunkBottle /> // What sound does this make?  Does it increase your glow or spin speed? or shake?  Reward for drinking! */}
          </div>
        )
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

    console.log(mode);

    const currentScene = scenes[scene];

    return (
      <div id={`scene-${slugify(currentScene.name, {lower: true})}`} className="scene">
        {typeof currentScene.bgVideo !== 'undefined' && <video id="bg-video" className="bg-video" playsInline autoPlay muted loop key={currentScene.bgVideo}>
          <source src={`/videos/${currentScene.bgVideo}.mp4`} type="video/mp4" />
        </video>}

        <div id="scene-name">{currentScene.name}...</div>

        {typeof currentScene.children !== 'undefined' && currentScene.children}

        <HolySpaceBaby babyClass={typeof currentScene.babyClass !== 'undefined' &&  currentScene.babyClass}/>

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