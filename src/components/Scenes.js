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
import CountdownTimer from "./props/CountdownTimer"
import BabyColorPicker from "./props/BabyColorPicker"
import FunkBottle from "./props/FunkBottle"
import BassMatrix from "./props/BassMatrix"
import Prompter from "./props/Prompter"

// Sounds
import cheer1Sound from '../sounds/cheer1.mp3';

const THEME = 'boundaries';
const BULLETIN = `
  Church Bulletin content
`;
const GOSPEL = '"Gospel Passage here"';
const GOSPEL_SOURCE = 'Book of Cowboy Jobe 7:18-22';
const CALM_BGS = ['calm1.mp4'];
const FLYING_BGS = ['flying1.mp4'];

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


    let {scene, mode, messages, newParticipantEvent, responses} = this.props;

    const homepage = {
      name: 'Homepage',
      livestream: "hidden",
      babyClass: "hidden",
      foregroundChildren: (
        <React.Fragment>
          {/* <VideoBg srcs={['campfire.mp4']}/> */}
          <CTA />
        </React.Fragment>
      ),
    };

    const scenes = [
      homepage,
      {
        name: 'Pre live',
        livestream: "hidden",
        babyClass: "hidden",
        backgroundChildren: (
          <React.Fragment>
            {/* <VideoBg srcs={['campfire.mp4']}/> */}
            <div className="layout-center -no-pointer">
              <p>Cowboy Elijah will appear just before 7p CST today.</p>
            </div>
          </React.Fragment>
        ),
      },
      {
        name: 'Mic Check',
        teleprompter: `
          Church Bulletin:
          ${BULLETIN}
        `,
        babyClass: "hidden",
        backgroundChildren: (
          <React.Fragment>
            {/* <VideoBg srcs={['campfire.mp4']}/> */}
            <CountdownTimer />
            <div className="layout-top -no-pointer">
              <p>Mic check!</p>
            </div>
            <div className="layout-bottom -no-pointer">
              <p style={{ maxWidth: '10em' }}>Be sure livestream is UNMUTED and PLAYING.</p>
            </div>
          </React.Fragment>
        ),
      },
      {
        name: 'Welcome',
        teleprompter: `
          [JAM]

          WELCOME/INTROS

          THEME

          REINCARNATION
        `,
        bgVideo: "campfire2", //5 is also cool
        livestream: "big",
        babyClass: "hidden",
        foregroundChildren: (
          <React.Fragment>
            {/* <VideoBg srcs={['campfire-close.mp4']}/> */}
            <div className="layout-top-edge -no-pointer">
              <p style={{fontSize: '2em'}}>Tonight's theme: "{THEME}"</p>
            </div>
            <div className="layout-bottom">
              {/* <Credits /> */}
              <ClickSound sound={cheer1Sound}>
                <button className="button">REJOICE BUTTON</button>
              </ClickSound>
            </div>
          </React.Fragment>
        )
      },
      {
        name: 'Death',
        livestream: "corner",
        backgroundChildren: (
          <React.Fragment>   
            {/* Black BG */} 
            <Prompter 
              id="death" 
              prompt='You are now dead. How did you die?'
              placeholder='Type a fun death'
              newParticipantEvent={newParticipantEvent} 
              responses={responses} 
            />
          </React.Fragment>
        )
      },
      {
        name: 'Birth',
        teleprompter: `
          YOU ARE REBORN
          CUSTOMIZE
          `,
        livestream: "corner",
        backgroundChildren: (
          <React.Fragment>
            {/* <VideoBg srcs={CALM_BGS}/> */}
            <BabyColorPicker setBabyColor={this.setBabyColor}/>
            <FunkBottle incrementFunkLevel={this.incrementFunkLevel} />  
            <div className="layout-top -no-pointer">
              <p>You are reborn! And thirsty!</p>
            </div>
            <div className="layout-bottom -no-pointer">
              <p>Click to drink.</p>
            </div>
          </React.Fragment>
        ),
      },
      {
        name: "Flight",
        babyClass: "flight",
        livestream: "corner",
        backgroundChildren: (
          <React.Fragment>
            {/* <VideoBg srcs={FLIGHT_BGS}/> */}
            <div className="layout-center -no-pointer">
              <p>You fly at light speed! Witnessing</p>
            </div>
          </React.Fragment>
        ),
      },
      {
        name: "Vision 1",
        bgVideo: "vortex",
        babyClass: "flight",
        backgroundChildren: (
          <React.Fragment>
            {/* <VideoBg srcs={FLIGHT_BGS}/> */}
            {/* <VisionPortal src='' /> */}
            <Prompter 
              id="vision1" 
              prompt='Lorem Ipsum?'
              placeholder='Type'
              newParticipantEvent={newParticipantEvent} 
              responses={responses} 
            />
          </React.Fragment>
        ),
      },
      {
        name: "Vision 2",
        bgVideo: "vortex",
        babyClass: "flight",
        backgroundChildren: (
          <React.Fragment>
            {/* <VideoBg srcs={FLIGHT_BGS}/> */}
            {/* <VisionPortal src='' /> */}
            <Prompter 
              id="vision2" 
              prompt='Lorem Ipsum?'
              placeholder='Type'
              newParticipantEvent={newParticipantEvent} 
              responses={responses} 
            />
          </React.Fragment>
        ),
      },
      {
        name: "Vision 3",
        bgVideo: "vortex",
        babyClass: "flight",
        backgroundChildren: (
          <React.Fragment>
            {/* <VideoBg srcs={FLIGHT_BGS}/> */}
            {/* <VisionPortal src='' /> */}
            <Prompter 
              id="vision3" 
              prompt='Lorem Ipsum?'
              placeholder='Type'
              newParticipantEvent={newParticipantEvent} 
              responses={responses} 
            />
          </React.Fragment>
        ),
      },
      {
        name: "Meditation Intro",
        backgroundChildren: (
          <React.Fragment>
            {/* <VideoBg srcs={CALM_BGS}/> */}
            {/* <VideoBg srcs={['campfire-close.mp4'] style={{opacity: 0.2}}}/> */}
            <Prompter 
              id="meditation1" 
              prompt='Lorem Ipsum?'
              placeholder='Type'
              newParticipantEvent={newParticipantEvent} 
              responses={responses} 
            />
          </React.Fragment>
        ),
      },
      {
        name: "Meditation 1",
        backgroundChildren: (
          <React.Fragment>
            {/* <VideoBg srcs={CALM_BGS}/> */}
            {/* <VideoBg srcs={['campfire-close.mp4'] style={{opacity: 0.2}}}/> */}
            <Prompter 
              id="meditation1" 
              prompt='Lorem Ipsum?'
              placeholder='Type'
              newParticipantEvent={newParticipantEvent} 
              responses={responses} 
            />
          </React.Fragment>
        ),
      },      
      {
        name: "Meditation 2",
        backgroundChildren: (
          <React.Fragment>
            {/* <VideoBg srcs={CALM_BGS}/> */}
            {/* <VideoBg srcs={['campfire-close.mp4'] style={{opacity: 0.2}}}/> */}
            <Prompter 
              id="meditation2" 
              prompt='Lorem Ipsum?'
              placeholder='Type'
              newParticipantEvent={newParticipantEvent} 
              responses={responses} 
            />
          </React.Fragment>
        ),
      },      
      {
        name: "Meditation 3",
        backgroundChildren: (
          <React.Fragment>
            {/* <VideoBg srcs={CALM_BGS}/> */}
            <Prompter 
              id="meditation3" 
              prompt='Lorem Ipsum?'
              placeholder='Type'
              newParticipantEvent={newParticipantEvent} 
              responses={responses} 
            />
          </React.Fragment>
        ),
      },
      {
        name: "Sermon",
        babyClass: "hidden",
        teleprompter: `
          SERMON, GOODBYE
        `,
        backgroundChildren: (
          <React.Fragment>
            {/* <VideoBg srcs={['campfire-close.mp4']}/> */}
            {/* <BestResponses /> */}

            {/* <div className="layout-top -no-pointer">
              <p>{GOSPEL}</p>
            </div>
            <div className="layout-bottom -no-pointer">
              <p>{GOSPEL_SOURCE}</p>
            </div> */}
          </React.Fragment>
        ),
      },
      homepage,
    ];

    scene = Math.max(0,scene); // Render 0, if below
    scene = Math.min(scenes.length-1,scene); // Render last scene, if above scenes length
    const currentScene = scenes[scene];

    let nextSceneNumber = scene+1;
    nextSceneNumber = Math.max(0,nextSceneNumber); // Render 0, if below
    nextSceneNumber = Math.min(scenes.length-1,nextSceneNumber); // Render last scene, if above scenes length
    const nextScene = scenes[nextSceneNumber];

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
  
        {/* {typeof currentScene.bgVideo !== 'undefined' && <video id="bg-video" className="bg-video" playsInline autoPlay muted loop key={currentScene.bgVideo}>
          <source src={`/videos/${currentScene.bgVideo}.mp4`} type="video/mp4" />
        </video>}

        {typeof currentScene.bgVideoOverlay !== 'undefined' && <video id="bg-video-overlay" className="bg-video -overlay" playsInline autoPlay muted loop key={currentScene.bgVideoOverlay}>
          <source src={`/videos/${currentScene.bgVideoOverlay}.mp4`} type="video/mp4" />
        </video>} */}

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

        <Chat newParticipantEvent={newParticipantEvent} messages={messages} color={babyColor}/>

        {(typeof currentScene.teleprompter !== 'undefined' && mode==="performer") && <div id="teleprompter">{currentScene.name}{currentScene.teleprompter}<span style={{color: 'red'}}>{nextScene.name}</span></div>}
        
      </div>
    );
  }
}

export default Show;