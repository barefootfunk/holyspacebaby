import React from 'react';

// Utils
import slugify from 'slugify';

// Chat
import Chat from "./Chat"

// Props
import CTA from "./props/CTA"
import HolySpaceBaby from "./props/HolySpaceBaby"
import ClickSound from "./props/ClickSound"
import CountdownTimer from "./props/CountdownTimer"
import BabyColorPicker from "./props/BabyColorPicker"
import FunkBottle from "./props/FunkBottle"
import VideoBg from "./props/VideoBg"
import Prompter from "./props/Prompter"

// Sounds
import cheer1Sound from '../sounds/cheer1.mp3';


// Twitch
// This has to be shut off for gatsby build because of breaking reference to window
const ReactTwitchEmbedVideo = typeof window !== `undefined` ? require("react-twitch-embed-video") : null

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


// CONTENT
const THEME = 'unfinished';

const BULLETIN = `Church Bulletin content`;

const VISION_GIF_1         = "finish-me.webp";
const VISION_QUESTION_1    = "My creator never completed me! I do not know my purpose!"; 
const VISION_PLACEHOLDER_1 = "Type a calling";
const VISION_BUTTON_1      = "Advise!";

const VISION_GIF_2         = "pug-dog-bride.jpg";
const VISION_QUESTION_2    = "Today is your wedding and you forgot to write vows! Wing it!"; 
const VISION_PLACEHOLDER_2 = "Type a vow";
const VISION_BUTTON_2      = "Vow!";

const VISION_GIF_3         = "robot.webp";
const VISION_QUESTION_3    = "I am programming myself.  QUICKLY.  Give me a thought!"; 
const VISION_PLACEHOLDER_3 = "Type a thought";
const VISION_BUTTON_3      = "Give!";

const VISION_GIF_4         = "chimp-lament.webp";
const VISION_QUESTION_4    = "\"I'll never finish my symphony.\""; 
const VISION_PLACEHOLDER_4 = "Type encouragement";
const VISION_BUTTON_4      = "Coach!";

const VISION_GIF_5         = "crab.webp";
const VISION_QUESTION_5    = "If crab stops typing her novel, the bomb will detonate. Hurry! Give her the next sentence!"; 
const VISION_PLACEHOLDER_5 = "Type a sentence";
const VISION_BUTTON_5      = "Suggest!";


const MEDIATION_QUESTION_1    = "What is something you DID finish?";
const MEDIATION_PLACEHOLDER_1 = "Answer Anonymously"; 
const MEDIATION_BUTTON_1      = "Answer"; 

const MEDIATION_QUESTION_2    = "What is something you haven't finished?";
const MEDIATION_PLACEHOLDER_2 = "Answer Anonymously"; 
const MEDIATION_BUTTON_2      = "Answer"; 

const MEDIATION_QUESTION_3    = "Why did you stop?";
const MEDIATION_PLACEHOLDER_3 = "Answer Anonymously"; 
const MEDIATION_BUTTON_3      = "Answer"; 

const GOSPEL = '"Some of the best things in life are unfini"';
const GOSPEL_SOURCE = 'Book of Cowboy Jobe 7:18-18.5';

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

    function visionScene(num,question,placeholder,buttonText,gif) {
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
              buttonText={buttonText}
              soundMode='sample'
              visionSrc={`/img/${gif}`}
            />
          </React.Fragment>
        ),
      }
    }

    function meditationScene(num,question,placeholder,buttonText) {
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
              buttonText={buttonText}
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
      visionScene(1,VISION_QUESTION_1,VISION_PLACEHOLDER_1,VISION_BUTTON_1,VISION_GIF_1),
      visionScene(2,VISION_QUESTION_2,VISION_PLACEHOLDER_2,VISION_BUTTON_2,VISION_GIF_2),
      visionScene(3,VISION_QUESTION_3,VISION_PLACEHOLDER_3,VISION_BUTTON_3,VISION_GIF_3),
      visionScene(4,VISION_QUESTION_4,VISION_PLACEHOLDER_4,VISION_BUTTON_4,VISION_GIF_4),
      visionScene(5,VISION_QUESTION_5,VISION_PLACEHOLDER_5,VISION_BUTTON_5,VISION_GIF_5),
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
      meditationScene(1,MEDIATION_QUESTION_1,MEDIATION_PLACEHOLDER_1,MEDIATION_BUTTON_1),
      meditationScene(2,MEDIATION_QUESTION_2,MEDIATION_PLACEHOLDER_2,MEDIATION_BUTTON_2),
      meditationScene(3,MEDIATION_QUESTION_3,MEDIATION_PLACEHOLDER_3,MEDIATION_BUTTON_3),
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

            <div className="layout-top -no-pointer">
              <p>{GOSPEL}</p>
            </div>
            <div className="layout-bottom -no-pointer">
              <p>{GOSPEL_SOURCE}</p>
            </div>
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

        {(mode==="performer") && <div id="teleprompter">{currentScene.name}{currentScene.teleprompter}<br/><span style={{color: 'red'}}>{nextScene.name}</span></div>}
        
      </div>
    );
  }
}

export default Show;