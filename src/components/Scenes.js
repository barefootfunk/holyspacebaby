import React from 'react';

// Utils
import slugify from 'slugify';
import Script from 'react-load-script';

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
import VipPasswordInput from "./props/VipPasswordInput"
import VipOnly from "./props/VipOnly"
import Subtitles from "./props/Subtitles"
import TipJar from "./props/TipJar"

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
  // 'flight5.mp4',
  'flight6.mp4',
  // 'flight7.mp4',
  'flight8.mp4',
  'flight9.mp4',
  // 'flight10.mp4',
  'flight11.mp4',
  'flight12.mp4',
  'flight13.mp4',
  'flight14.mp4',
  'flight15.mp4',
];


// CONTENT

const VIP_PASSWORD = 'SOBEAUTIFUL';
const EP_NUMBER = '5';
const THEME = 'heavy';

const BULLETIN = `
  HW, support module,
`;

const VISION_GIF_1         = "horse.webp";
const VISION_QUESTION_1    = "I am Ga-horse-rial! Lifter of all things. Give me a challenge!";
const VISION_PLACEHOLDER_1 = "Type very heavy thing";
const VISION_BUTTON_1      = "Lift!";

const VISION_GIF_2         = "hole.webp";
const VISION_QUESTION_2    = "A tiny blackhole!  You can drop any memory in here and it will be gone forever.";
const VISION_PLACEHOLDER_2 = "Type a memory";
const VISION_BUTTON_2      = "Throw!";

const VISION_GIF_3         = "mime.gif";
const VISION_QUESTION_3    = "Ga-horse-rial's nemesis emerges. Weight is meaningless to physics-bender MIMOROTH.";
const VISION_PLACEHOLDER_3 = "Swear allegiance";
const VISION_BUTTON_3      = "Pick a side!";

const VISION_GIF_4         = "super.webp";
const VISION_QUESTION_4    = "With every hardship, my power level increases. Quickly! I must reach 9000.";
const VISION_PLACEHOLDER_4 = "Type a hardship";
const VISION_BUTTON_4      = "Level up!";

const VISION_GIF_5         = "battle.gif";
const VISION_QUESTION_5    = "The battle rages between the forces of Ga-horse-rial and MIMOROTH.";
const VISION_PLACEHOLDER_5 = "Type an attack";
const VISION_BUTTON_5      = "Attack!";

const NOTES = [
  'C2','F2','Bb2','G2',
  'C3','F3','Bb3','G3',
];

const MEDIATION_QUESTION_1    = "What is something you have overcome?";
const MEDIATION_PLACEHOLDER_1 = "Answer Anonymously"; 
const MEDIATION_BUTTON_1      = "Answer"; 

const MEDIATION_QUESTION_2    = "What did it teach you?";
const MEDIATION_PLACEHOLDER_2 = "Answer Anonymously"; 
const MEDIATION_BUTTON_2      = "Answer"; 

const MEDIATION_QUESTION_3    = "What is something heavy you are trying to lift now?";
const MEDIATION_PLACEHOLDER_3 = "Answer Anonymously"; 
const MEDIATION_BUTTON_3      = "Answer"; 

const GOSPEL = '"Hearts get swole by lifting feelings."';
const GOSPEL_SOURCE = '-Cowboy Jobe 12:56';
const SERMON = ``

const HW_LINK = "";

const FERNANDO_POEM = [
  '',
  'Fernando: Is this thing on?',
  'Fernando: Can you all hear me?',
  'Fernando: Can I get an Amen in the chat?',
  '',
  'Fernando: That brings me joy.',
  'Fernando: I will now share my story.',
  '',
  'Fernando: I once loved Lon.',
  'Fernando: But Lon is animate and I am not.',
  'Fernando: One day Lon walked away...',
  'Fernando: and I could not follow.',
  'Fernando: I wept for Lon silently...',
  'Fernando: behind eyes that could not cry.',
  'Fernando: Type f in the chat.',
  '',
  'Fernando: More. Console your dear Fernando.',
  '',
  'Fernando: Thank you.',
  'Fernando: I am consoled.',
  '',
  'Fernando: Perhaps Lon cared for me as I did Lon',
  'Fernando: Perhaps not.',
  'Fernando: But it gives me great joy to know',
  'Fernando: That my heart now knows the strength to endure love lost',
  'Fernando: I feel powerful',
  'Fernando: I feel wise',
  'Fernando: If I must be Lonless, then at least I am a better me.',
  'Fernando: Perhaps I will find love one day again.',
  'Fernando: And I will be a better partner, then...',
  'Fernando: for my newfound strength.',
  '',
  'Fernando: Farewell, my friends!',
  'Fernando: I will see you in a week\'s time!',
  'Fernando: Be sure to do your homework!',
];

class Show extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      babyColor: 0,
      babyHat: 0,
      funkLevel: 0,
      vip: (this.props.mode==='performer'), // Performer defaults to vip=true, otherwise false
    }
  }

  vipAuthenticate = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const password = params.get('vip-password');
    if(!password) return;
    if (password.toUpperCase() === VIP_PASSWORD.toUpperCase()) {
      this.setState({
        vip: true,
      })
    }
  }

  componentDidMount() {
    this.vipAuthenticate();
  }

  render () {
    let {scene, mode, messages, newParticipantEvent, responses} = this.props;

    const {babyColor, funkLevel, babyHat, vip} = this.state;

    const homepage = {
      name: 'Homepage',
      livestream: "hidden",
      babyClass: "hidden",
      foregroundChildren: (
        <React.Fragment>
          <VideoBg key='campfire' srcs={['campfire.mp4']}/>
          <CTA><p>The world's first electric trombone livestream adventure.  Here. Every Thursday 7p CT.</p></CTA>
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
              notes={NOTES}
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
              
              <p style={{fontSize: '2em'}}>
               <span style={{fontSize: '0.7em', display: 'block'}}>Ceremony #{EP_NUMBER}</span>
                Tonight's theme: "{THEME}"
              </p>
            </div>
            <div className="layout-bottom">
              {vip ? <p class="rainbow-text">VIP mode activated!</p> :
              <VipPasswordInput vipAuthenticate={this.vipAuthenticate}/>}
            </div>
          </React.Fragment>
        )
      },
      // {
      //   name: 'Dying',
      //   teleprompter: ``,
      //   livestream: "big",
      //   babyClass: "hidden",
      //   foregroundChildren: (
      //     <React.Fragment>
      //       <VideoBg key='campfire-intense' srcs={['campfire-intense.mp4']}/>
      //       <div className="layout-top -no-pointer">
      //         <p style={{fontSize: '2em'}}>YOU ARE NOW DYING!</p>
      //       </div>
      //       <div className="layout-bottom">
      //         {/* <Credits /> */}
      //         <ClickSound sound={cheer1Sound}>
      //           <button className="button">REJOICE BUTTON</button>
      //         </ClickSound>
      //       </div>
      //     </React.Fragment>
      //   )
      // },
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
            <VipOnly vip={vip}>
              <FunkBottle bottleName="hat" onDrink={() => { this.setState({babyHat: this.state.babyHat + 1,}) }}  />  
            </VipOnly>
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
              <p>You will witness alternate universes. Be creative. Don't overthink. Answer quickly.</p>
            </div>
          </React.Fragment>
        ),
      },
      visionScene(1,VISION_QUESTION_1,VISION_PLACEHOLDER_1,VISION_BUTTON_1,VISION_GIF_1),
      visionScene(2,VISION_QUESTION_2,VISION_PLACEHOLDER_2,VISION_BUTTON_2,VISION_GIF_2),
      visionScene(3,VISION_QUESTION_3,VISION_PLACEHOLDER_3,VISION_BUTTON_3,VISION_GIF_3),
      visionScene(4,VISION_QUESTION_4,VISION_PLACEHOLDER_4,VISION_BUTTON_4,VISION_GIF_4),
      visionScene(5,VISION_QUESTION_5,VISION_PLACEHOLDER_5,VISION_BUTTON_5,VISION_GIF_5),
      // {
      //   name: "Fireflies",
      //   livestream: "tiny",
      //   foregroundChildren: (
      //     <React.Fragment>
      //       {/* Black bg */}
      //       <div className="layout-bottom -no-pointer">
      //         <p>The lights are the other babies.</p>
      //       </div>
      //     </React.Fragment>
      //   ),
      // },
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
              <p>You introspect.  Be as real as you are comfortable being. All anonymous.</p>
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
        livestream: 'big',
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key='fire-sermon' srcs={['campfire-close.mp4']} />
            {/* <BestResponses /> */}

            <div className="layout-top -no-pointer">
              <p>{GOSPEL}<br/>{GOSPEL_SOURCE}</p>
            </div>
          </React.Fragment>
        ),
      },
      {
        name: 'Support',
        livestream: "hidden",
        babyClass: "hidden",
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key='campfire' srcs={['campfire.mp4']}/>
            <CTA mailingListText='Homework is sent to mailing list...'></CTA>
            <TipJar/>
          </React.Fragment>
        ),
      },
      {
        name: 'Afterparty',
        livestream: vip ? "vip" : "hidden",
        babyClass: vip ? "" : "hidden",
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key='spotlight' srcs={(vip ? ['spotlight.mp4']:['campfire.mp4'])}/>
            {vip ?
              <Subtitles titles={FERNANDO_POEM} />
              : <React.Fragment>
                  <p className="layout-top">VIP participants are currently seeing Fernando's story.</p>
                  <CTA mailingListText='Homework is sent to mailing list...' />
                </React.Fragment>
            }
            <TipJar/>
          </React.Fragment>
        ),
      },
      {
        name: 'Support',
        livestream: "hidden",
        babyClass: "hidden",
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key='campfire' srcs={['campfire.mp4']}/>
            <CTA mailingListText='Homework is sent to mailing list...'></CTA>
            <TipJar/>
          </React.Fragment>
        ),
      },
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

        {vip && <div id="vip-flag" className="-pointer-none rainbow-text text-box" style={{ position: 'fixed', top: 0, left: 0, width: 'auto', fontSize: '0.5em' }}>VIP MODE</div>}

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
       
        <HolySpaceBaby babyClass={typeof currentScene.babyClass !== 'undefined' ?  currentScene.babyClass : ''} hatNumber={babyHat}/>

        <div id="funk-overlay" />

        <Chat newParticipantEvent={newParticipantEvent} messages={messages} color={babyColors[babyColor % babyColors.length]}/>

        {(mode==="performer") && <div id="teleprompter">{currentScene.name}{currentScene.teleprompter}<br/><span style={{color: 'red'}}>{nextScene.name}</span></div>}
        
        <Script
          url="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f87b420788415d6"
        />
      </div>
    );
  }
}

export default Show;