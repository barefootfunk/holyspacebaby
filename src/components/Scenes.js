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
import VideoBg from "./props/VideoBg"
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
const CALM_BGS = [
  'calm1.mp4',
  'calm2.mp4',
  'calm3.mp4',
];
const FLIGHT_BGS = [
  'flight1.mp4',
  'flight2.mp4',
  'flight3.mp4',
  'flight4.mp4',
  'flight5.mp4',
  'flight6.mp4',
  'flight7.mp4',
  'flight8.mp4',
  'flight9.mp4',
  'flight10.mp4',
  'flight11.mp4',
  'flight12.mp4',
  'flight13.mp4',
  'flight14.mp4',
  'flight15.mp4',
];

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
          <VideoBg key='campfire' srcs={['campfire.mp4']}/>
          <CTA />
        </React.Fragment>
      ),
    };

    function visionScene(num,question,placeholder,gif) {
      return {
        name: `Vision ${num}`,
        livestream: "tiny",
        babyClass: "flight",
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key={`flight${num}`} srcs={FLIGHT_BGS}/>
            <Prompter 
              id={`vision${num}`}
              key={`prompt-vision${num}`}
              prompt={question}
              placeholder={placeholder}
              newParticipantEvent={newParticipantEvent} 
              responses={responses} 
              mode={mode}
              soundMode='sample'
              visionSrc={`/img/${gif}.webp`}
            />
          </React.Fragment>
        ),
      }
    }

    function meditationScene(num,question,placeholder) {
      return {
        name: `Meditation ${num}`,
        livestream: "tiny",
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key={`calm${num}`} srcs={CALM_BGS} />
            <VideoBg key={`fire${num}`} srcs={['campfire-close.mp4']} style={{opacity: num*0.2}} />
            <Prompter 
              id={`meditation${num}`}
              key={`prompt-meditation${num}`}
              prompt={question}
              placeholder={placeholder}
              newParticipantEvent={newParticipantEvent} 
              responses={responses} 
              mode={mode}
              soundMode='synth'
            />
          </React.Fragment>
        ),
      };
    }

    const scenes = [
      homepage,
      {
        name: 'Pre live',
        livestream: "hidden",
        babyClass: "hidden",
        backgroundChildren: (
          <React.Fragment>
            <VideoBg key='campfire' srcs={['campfire.mp4']}/>
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
            <VideoBg key='campfire' srcs={['campfire.mp4']}/>
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
            <VideoBg key='campfire-close' srcs={['campfire-close.mp4']}/>
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
        livestream: "hidden",
        babyClass: "hidden",
        backgroundChildren: (
          <React.Fragment>   
            {/* Black BG */} 
            <div className="layout-center -no-pointer">
              <p>You are dead.</p>
            </div>
          </React.Fragment>
        )
      },
      {
        name: 'Birth',
        teleprompter: `
          YOU ARE REBORN
          CUSTOMIZE
          `,
        livestream: "tiny",
        backgroundChildren: (
          <React.Fragment>
            <BabyColorPicker setBabyColor={this.setBabyColor}/>
            {/* <FunkBottle incrementFunkLevel={this.incrementFunkLevel} />   */}
            <div className="layout-top -no-pointer">
              <p>You are reborn!</p>
            </div>
            <div className="layout-bottom -no-pointer">
              <p>Customize your form.</p>
            </div>
          </React.Fragment>
        ),
      },
      {
        name: "Name",
        livestream: "tiny",
        foregroundChildren: (
          <React.Fragment>
            <Prompter 
              id="name" 
              key="promt-name"
              prompt='Name your holy space baby! (Others will see your response)'
              placeholder='Not your real name (anonymous)'
              newParticipantEvent={newParticipantEvent} 
              responses={responses} 
              mode={mode}
              soundMode='sample'
            />
          </React.Fragment>
        ),
      },
      {
        name: "Flight",
        babyClass: "flight",
        livestream: "tiny",
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key='flight0' srcs={FLIGHT_BGS}/>
            <div className="layout-top -no-pointer">
              <h1>VISIONS</h1>
            </div>
            <div className="layout-bottom -no-pointer">
              <p>You fly at light speed! Witnessing many alternate universes.</p>
            </div>
          </React.Fragment>
        ),
      },
      visionScene(1,'Silly Question...','Silly Answer (anonymous)','carrot'),
      visionScene(2,'Silly Question...','Silly Answer (anonymous)','carrot'),
      visionScene(3,'Silly Question...','Silly Answer (anonymous)','carrot'),
      visionScene(4,'Silly Question...','Silly Answer (anonymous)','carrot'),
      visionScene(5,'Silly Question...','Silly Answer (anonymous)','carrot'),
      {
        name: "Meditation Intro",
        livestream: "hidden",
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key='calm0' srcs={CALM_BGS} />
            <VideoBg key='fire0' srcs={['campfire-close.mp4']} style={{opacity: 0.1}} />
            <div className="layout-top -no-pointer">
              <h1>MEDITATION</h1>
            </div>
            <div className="layout-center -no-pointer">
              <p>You float and ponder.</p>
            </div>
          </React.Fragment>
        ),
      },
      meditationScene(1,'More Serious Question...','Answer (anonymous)'),
      meditationScene(2,'More Serious Question...','Answer (anonymous)'),
      meditationScene(3,'More Serious Question...','Answer (anonymous)'),
      {
        name: "Sermon",
        babyClass: "hidden",
        teleprompter: `
          SERMON, GOODBYE
        `,
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key='fire5' srcs={['campfire-close.mp4']} />
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

        {(mode==="performer") && <div id="teleprompter">{currentScene.name}{currentScene.teleprompter}<span style={{color: 'red'}}>{nextScene.name}</span></div>}
        
      </div>
    );
  }
}

export default Show;