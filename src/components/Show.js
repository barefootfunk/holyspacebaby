import React from 'react';

// Scenes
import Scene from "./scenes/Scene"

// Props
import Visions from "./props/Visions.js"
import HolySpaceBaby from "./props/HolySpaceBaby.js"
import SoundButton from "./props/SoundButton.js"
import KeyPressSound from "./props/KeyPressSound.js"

// Sounds
import cheer1Sound from '../sounds/cheer1.mp3';
import cry1Sound from '../sounds/cry1.wav'; // https://freesound.org/people/Stevious42/sounds/259608/


class Show extends React.Component {

  render () {
    const scenes = [

      // TODO: Style show text
      <Scene 
        name="Stay tuned"
        bgVideo="campfire-far"
        livestream="hidden"
      ></Scene>,

      <Scene 
        name="Mic check"
        bgVideo="campfire-far"
        teleprompter={`
          [Meditate and Pray]
          
          Oh! I didn't see you there.
          
          (Welcome brothers sisters and siblings.  The name is Cowboy Elijah–your local prophet. Our religious cermony begins now.)[NEXT]
          `}
      >
        <h1>Our service will soon begin.</h1>
        <p>Please unmute the Twitch player and make sure it is playing.</p>
      </Scene>,

      <Scene 
        name="Welcome"
        bgVideo="campfire2" //5 is also cool
        livestream="big"
        teleprompter={`
          [SOLO]
          
          [TRIGGER DRUMS] I have summoned ye to this here magical campfire for a little ritual.  We will reenact the story of THE HOLY SPACE BABY. A story central to our faith.
          
          [SOLO]

          First things, first, for this ceremony to commence, you'll have to er em... this is awkward. You'll have to die.  In fact I'm killing you right now with my electric trombone. My sinere apologies.
          
          [SOLO]
          
          (Brothers, sisters and siblings. My condolences, you are now dead.)[NEXT]
          `}
      ></Scene>,

      <Scene 
        name="Death"
        // TODO: bgVideo="coffin"
        livestream="big"
        teleprompter={`
          [SOLO]
          
          Hmmm. that wasn't so bad.  Wonder what all the philosophers were fussing about.  By the way, did you remember to tell everyone you loved them?  I always forget to do that.  Anyway, don't fret none. For you will now be reborn in your true form!
          
          ([SOLO])[NEXT]
          `}
      ><h1>Press F.</h1>
        <KeyPressSound sound={cry1Sound} keyString="f" />
      </Scene>,

      <Scene 
        name="Rebirth"
        // TODO: bgVideo="void"
        teleprompter={`
          You find yourself in an infant body with no memory of your previous life.  Everything is new and confusing.  And you seem to be able to choose your color.
          [SOLO LONG]
          
          (You are so thirsty from your journey. What's this? Something to drink? That sounds good right now. Have a sip.)[NEXT]
          `}
      >
        {/* TODO: <BabeColorPicker/> */}
        <HolySpaceBaby/>
      </Scene>,

      <Scene 
      name="Drink up"
      // TODO: bgVideo="void"
      teleprompter={`
        [SOLO LONG]
        
        Mmmmmm. It's so yummy.
        
        [STOP DRUMS] Uh oh.  You feel something strange inside ya.
        
        ([START SONG] You find yourself launched into the multiverse at light speed! What was in that bottle?!!!)[NEXT]
        `}
      >
        {/* TODO: <FunkBottle /> // What sound does this make?  Does it increase your glow or spin speed? or shake?  Reward for drinking! */}
        <HolySpaceBaby/>
      </Scene>,

      //NAME THE SPACE BABE AND CHOOSE A COLOR
      // INTERACTIVE ELEMENTS ADD SOUNDS  MEDITATIONS CAN HAVE A LOW NOTE THAT CONTEXTUALIZES THE HARMONY?
      // CHOOSE A DEITY FOR MEDITATION
      // QUICKLY DRINK FROM THE BOTTLE (HAS THE FUNK ON THE SIDE, MAKES GULPING SOUNDS)

      <Scene 
        name="Visions"
        bgVideo="vortex"
        teleprompter={`
          Rips in spacetime fly by revealing all possible universes.  You try to peek inside some of them.  What do you see?
          
          [LONG SOLO]
          
          (And you're left to float there.  Tryng to make sense of it all...)[NEXT]
        `}
      >
        <Visions/>
        <HolySpaceBaby/>
      </Scene>,

      <Scene 
        name="Meditation"
        bgVideo="purple"
        teleprompter={`
          [Chill Music]
          
          What happened next?  Well we'll have to get to that next time.  For now, go in peace.

          [SONG + PRAY]

          [NEXT]
        `}
      >
        {/* TODO: <BassNotes/> */}
        <HolySpaceBaby/>
        
      </Scene>,

      <Scene 
      name="Go in peace"
      bgVideo="campfire-far"
      livestream="hidden"

      teleprompter={`
        [WAIT]

        [Spooky] Don't forget to sign the mailing list ooooooooo.... Sign the mailing list.... Find out about what happens next.  Maniacly laughter 
      `}
      >
        {/* TODO: <MailingList /> */}
      </Scene>,

    ];

    let {scene} = this.props;
    scene = Math.max(0,scene); // Render 0, if below
    scene = Math.min(scenes.length-1,scene); // Render last scene, if above

    return (
      <div id="show">
        {scenes[scene]}
      </div>
    );
  }
}

export default Show;