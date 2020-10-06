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
const THEME = 'beauty';

const BULLETIN = `
  Physics has destabilized, Open rehearsal, Do not travel faster than light, Exclusive sermons to mailing list, and beware baauty-eating orbs.
`;


const VISION_GIF_1         = "violin.gif";
const VISION_QUESTION_1    = "This AI takes a single word as inspiration and composes 10,000,000 symphonies with avg beauty of 1.3 kiloBeethovens.";
const VISION_PLACEHOLDER_1 = "Type a word";
const VISION_BUTTON_1      = "Input!";

const VISION_GIF_2         = "orbs.gif";
const VISION_QUESTION_2    = "We Orbs feed on beauty.  Feed us or perish!";
const VISION_PLACEHOLDER_2 = "Type a beautiful object";
const VISION_BUTTON_2      = "Feed!";

const VISION_GIF_3         = "worm.webp";
const VISION_QUESTION_3    = "I am the inspiration worm, mother of beauty, universal muse.  I invented art and love.";
const VISION_PLACEHOLDER_3 = "Type praise";
const VISION_BUTTON_3      = "Worship!";

const VISION_GIF_4         = "hot-alien.gif";
const VISION_QUESTION_4    = "Zeenorb is tired of conforming to human-formed, eurocentric, heteronormative standards of beauty.";
const VISION_PLACEHOLDER_4 = "Type encouragement";
const VISION_BUTTON_4      = "Compliment!";

const VISION_GIF_5         = "eyes.webp";
const VISION_QUESTION_5    = "My sight sees all beauty.  Even that imperceptible to humans.  YOU are truly beautiful.";
const VISION_PLACEHOLDER_5 = "Type a response";
const VISION_BUTTON_5      = "Respond!";


const MEDIATION_QUESTION_1    = "What sorts of beauty to people make?";
const MEDIATION_PLACEHOLDER_1 = "Answer Anonymously"; 
const MEDIATION_BUTTON_1      = "Answer"; 

const MEDIATION_QUESTION_2    = "What is something beautiful in your life?";
const MEDIATION_PLACEHOLDER_2 = "Answer Anonymously"; 
const MEDIATION_BUTTON_2      = "Answer"; 

const MEDIATION_QUESTION_3    = "What is a beauty you can make?";
const MEDIATION_PLACEHOLDER_3 = "Answer Anonymously"; 
const MEDIATION_BUTTON_3      = "Answer"; 

const GOSPEL = '"Spacetime folds itself into beauty factories."';
const GOSPEL_SOURCE = 'Book of Cowboy Jobe 15:12';
const SERMON = `
`

// TODO rethink beginning
// CHURCH bulletin

class Show extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      babyColor: 0,
      funkLevel: 0,
    }
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
              <p>Cowboy Elijah will appear in the flames here just before 7p CST today to reincarnate you.</p>
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
            <div className="layout-bottom -no-pointer">
              <p style={{ maxWidth: '10em' }}>Mic check! Be sure livestream is UNMUTED and PLAYING.</p>
            </div>
          </React.Fragment>
        ),
      },
      {
        name: 'Welcome',
        teleprompter: `
          The name's...
          I have summoned..
          I will now kill you and ressurrect you...
        `,
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
            </div>
          </React.Fragment>
        )
      },
      {
        name: 'Dying',
        teleprompter: ``,
        livestream: "big",
        babyClass: "hidden",
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key='campfire-intense' srcs={['campfire-intense.mp4']}/>
            <div className="layout-top -no-pointer">
              <p style={{fontSize: '2em'}}>YOU ARE NOW DYING!</p>
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
        name: 'Birth',
        teleprompter: `
          YOU ARE REBORN
          CUSTOMIZE
          `,
        livestream: "tiny",
        backgroundChildren: (
          <React.Fragment>
            <VideoBg key='sparks' srcs={['sparks.mp4']} />
            <FunkBottle bottleName="funk" onDrink={() => { this.setState({funkLevel: this.state.funkLevel + 1,}) }}  />  
            <FunkBottle bottleName="color" onDrink={() => { this.setState({babyColor: this.state.babyColor + 1,}) }}  />  
            {/* <div className="layout-top -no-pointer">
              <p>You are reborn!</p>
            </div> */}
            <div className="layout-bottom -no-pointer">
              <p>You're reborn! <br/>Click to drink the funk.</p>
            </div>
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
              <h1>YOU FLY!</h1>
            </div>
            <div className="layout-bottom -no-pointer">
              <p>You will witness alternate universes. Be creative. Answer quickly.</p>
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
        name: "Fireflies",
        livestream: "tiny",
        foregroundChildren: (
          <React.Fragment>
            {/* Black bg */}
            <div className="layout-bottom -no-pointer">
              <p>The lights are the other babies.</p>
            </div>
          </React.Fragment>
        ),
      },
      {
        name: "Meditation Intro",
        livestream: "tiny",
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key='calm0' srcs={CALM_BGS} />
            <VideoBg key='fire0' srcs={['campfire-close.mp4']} style={{opacity: 0.1}} />
            <div className="layout-top -no-pointer">
              <h1>YOU PONDER!</h1>
            </div>
            <div className="layout-bottom -no-pointer">
              <p>Halfway between worlds. You introspect.  Be as real as you are comfortable being. All anonymous.</p>
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
          ${SERMON}
        `,
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key='fire-sermon' srcs={['campfire-close.mp4']} />
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
              
    const babyColors = ['lime','red','orange','yellow','cyan','violet']

    return (
      <div 
        id={`scene-${slugify(currentScene.name, {lower: true})}`} 
        className="scene"
        style={{
          '--baby-color': babyColors[babyColor % babyColors.length],
          '--funk-level-normalized': 1-(1/Math.pow(((funkLevel)/20+1),2)),
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