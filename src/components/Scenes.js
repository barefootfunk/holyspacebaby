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
// import VipPasswordInput from "./props/VipPasswordInput"
// import VipOnly from "./props/VipOnly"
import Subtitles from "./props/Subtitles"
import TipJar from "./props/TipJar"
import Fireflies from "./props/Fireflies"
import GroupClicky from "./props/GroupClicky"
import TugOfWar from "./props/TugOfWar"

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

//https://dashboard.eventable.com/
const DATE_THIS = 'NOV 5';
const DATE_NEXT = 'NOV 12';
const CAL_ID_THIS = '5f9b5fc9fe83af0140b9a0dd';
const CAL_ID_NEXT = '5f9b5ff550b389001840abf0';

const VIP_PASSWORD = 'DANCEMACHINE';
const EP_NUMBER = '8';
const THEME = 'uncertainty';

const BULLETIN = `Would you rather?`;

const VISION_GIF_1         = "";
const VISION_QUESTION_1    = "You ride the hell bus, speeding through purgatory. Thank Mr. Hellbus Driver!";
const VISION_PLACEHOLDER_1 = "Type thanks";
const VISION_BUTTON_1      = "Thank!";


const VISION_GIF_2         = "";
const VISION_QUESTION_2    = "Mr. Hellbus Driver has no idea where the hell bus is going. Yell directions!";
const VISION_PLACEHOLDER_2 = "Type a direction";
const VISION_BUTTON_2      = "Suggest!";

const VISION_GIF_3         = "";
const VISION_QUESTION_3    = "But he keeps singing because his song makes him ready for anything. Thank Mr. Hellbus Driver!";
const VISION_PLACEHOLDER_3 = "Type thanks";
const VISION_BUTTON_3      = "Thank!";

const NOTES = [
  'Bb2','D2','E2','G2','C2','F',
  'Bb3','D3','E3','G3','C3','F',
];

const MEDIATION_QUESTION_1    = "What is an uncertainty you are facing?";
const MEDIATION_PLACEHOLDER_1 = "Type an uncertainty";
const MEDIATION_BUTTON_1      = "Answer anonymously!";

const MEDIATION_QUESTION_2    = "How does it feel in your body?";
const MEDIATION_PLACEHOLDER_2 = "Type a feeling";
const MEDIATION_BUTTON_2      = "Answer anonymously!";

const MEDIATION_QUESTION_3    = "What helps you feel grounded?";
const MEDIATION_PLACEHOLDER_3 = "Type something that helps";
const MEDIATION_BUTTON_3      = "Answer anonymously!";

const MEDIATION_QUESTION_4    = "Wnat's something about you that wont change–no matter how it turns out?";
const MEDIATION_PLACEHOLDER_4 = "Type a thing";
const MEDIATION_BUTTON_4      = "Answer anonymously!";

const GOSPEL = `"The sailor don't adjust the wind none, just the sail."`;
const GOSPEL_SOURCE = '-Cowboy Jobe 1:19';
const SERMON = `${GOSPEL} ${GOSPEL_SOURCE}
  Uncertainty is painful:
  - Uncertainty about electric shocks causes more stress than electric shocks
  It puts our brain into overdrive
  - Uncertainty creates a brain state facilitated by stress hormones
  - Negative uncertainty is when we try the hardest--but that can be unproductive longterm
  We want to feel like we are building something. Uncertainty feels like it halts our building.
  Unless what we are building is ourselves. Our values, our judgement, our character.
  And this is more valuable/permanent.
  A sailor doesn't try to control the wind, they control how they sail
`;

  // Anxiety creates risk aversion, not loss aversion
// https://www.inc.com/mithu-storoni/this-is-why-youre-so-afraid-of-uncertainty-according-to-neuroscience.html
// https://www.inc.com/mithu-storoni/your-brain-isnt-afraid-of-failure-heres-whats-really-going-on.html
// https://www.theguardian.com/commentisfree/2016/apr/04/uncertainty-stressful-research-neuroscience

class Show extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      babyColor: Math.floor(Math.random()*7),
      babyHat: 0,
      funkLevel: 0,
      babyRainbow: false,
      // vip: (this.props.mode==='performer'), // Performer defaults to vip=true, otherwise false
    }
  }

  // vipAuthenticate = () => {
  //   const search = window.location.search;
  //   const params = new URLSearchParams(search);
  //   const password = params.get('vip-password');
  //   if(!password) return;
  //   if (password.toUpperCase() === VIP_PASSWORD.toUpperCase()) {
  //     this.setState({
  //       vip: true,
  //     })
  //   }
  // }

  componentDidMount() {
    // this.vipAuthenticate();
  }

  render () {
    let {scene, mode, messages, newParticipantEvent, responses, directorState} = this.props;

    const {babyColor, funkLevel, babyHat, babyRainbow, vip} = this.state;

    const homepage = {
      name: 'Homepage',
      livestream: "hidden",
      babyClass: "hidden",
      foregroundChildren: (
        <React.Fragment>
          <VideoBg key='campfire' srcs={['campfire.mp4']}/>
          <CTA calEventId={CAL_ID_THIS} nextCeremonyDate={DATE_THIS}><p>The world's first interactive electric trombone livestream adventure.  Here. Every Thursday 7p CT.</p></CTA>
        </React.Fragment>
      ),
    };

    function visionScene(num,question,placeholder,buttonText,gif) {
      return {
        name: `Vision ${num}`,
        livestream: "tiny",
        babyClass: "flight",
        teleprompter: `${question}`,
        backgroundChildren: (
          <div id="hellbus" className="-big"><button></button></div>
        ),
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key={`tugofwar${num}`} srcs={['hellroad.mp4']} /> {/* <VideoBg key={`flight${num}`} srcs={FLIGHT_BGS}/> */}
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
              // visionSrc={`/img/${gif}`}
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

    function tugOfWarScene(num,caption,side1,side2) {
      const id = `turn${num}`
      return {
        name: `TugOfWar ${num}`,
        livestream: "hidden",
        foregroundChildren: (
          <React.Fragment>
            {/* {/* <VideoBg key={`calm${num}`} srcs={CALM_BGS} /> */}
            <VideoBg key={`tugofwar${num}`} srcs={['hellroad.mp4']} /> 
            <TugOfWar 
              newParticipantEvent={newParticipantEvent} 
              tugOfWarId={id} 
              tugOfWar={directorState.tugOfWars[id]}
              side1={side1}
              side2={side2}
            />
            <div className="layout-top">
              <p>{caption}</p>
            </div>
            <div id="hellbus"><button></button></div>
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
            <div className="layout-bottom">
              <p>Message your friends: <div style={{fontFamily:'courier new', fontSize:'0.5em'}} className="-selectable">Join us. A cowboy prophet requests your presence. <a href="https://www.holyspace.baby">https://www.holyspace.baby</a></div></p>
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
            <VideoBg key='campfire-close' srcs={['campfire-close.mp4']}/>
            <CountdownTimer />
            <div className="layout-top -no-pointer">
              <p style={{ maxWidth: '10em' }}>Mic check! Be sure livestream is UNMUTED and PLAYING.</p>
            </div>
            <div className="layout-bottom">
              <p>Message your friends: <div style={{fontFamily:'courier new', fontSize:'0.5em'}} className="-selectable">Join us. A cowboy prophet requests your presence. <a href="https://www.holyspace.baby">https://www.holyspace.baby</a></div></p>
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
            <VideoBg key='campfire-intense' srcs={['campfire-intense.mp4']}/>
            <VideoBg key='fireloop' srcs={['fireloop.mp4']} style={{opacity: 0.5, transform: 'translate(-50%,-50%) scale(1.5)'}}/>
            <div className="layout-top-edge -no-pointer">
              <p style={{fontSize: '2em'}}>
               <span style={{fontSize: '0.7em', display: 'block'}}>Ceremony #{EP_NUMBER}</span>
                Tonight's theme: "{THEME}"
              </p>
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
            <FunkBottle bottleName="color" onDrink={() => { this.setState({babyColor: this.state.babyColor + 1, babyRainbow: false}) }}  />  
            <FunkBottle bottleName="hat" onDrink={() => { this.setState({babyHat: this.state.babyHat + 1,}) }}  />  
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

      tugOfWarScene(0,
        `The hell bus comes to a fork in the road. Quickly! Choose a road!`,
        {
          image: 'turn0-ice.jpg',
          caption: 'An ice world',
          victory: 'You turn to the ice world'
        },
        {
          image: 'turn0-swamp.jpg',
          caption: 'A swamp world',
          victory: 'You go into the swamp'
        }
      ),

      tugOfWarScene(1,
        `The road splits again! Which way?!`,
        {
          image: 'turn0-ice.jpg',
          caption: 'An ice world',
          victory: 'You turn to the ice world'
        },
        {
          image: 'turn0-swamp.jpg',
          caption: 'A swamp world',
          victory: 'You go into the swamp'
        }
      ),
      tugOfWarScene(2,
        `Another fork! Mr. Hellbus Driver realizes he isn't always the one controlling the bus.`,
        {
          image: 'turn0-ice.jpg',
          caption: 'An ice world',
          victory: 'You turn to the ice world'
        },
        {
          image: 'turn0-swamp.jpg',
          caption: 'A swamp world',
          victory: 'You go into the swamp'
        }
      ),
      visionScene(3,VISION_QUESTION_3,VISION_PLACEHOLDER_3,VISION_BUTTON_3,VISION_GIF_3),
      // visionScene(4,VISION_QUESTION_4,VISION_PLACEHOLDER_4,VISION_BUTTON_4,VISION_GIF_4),
      // {
      //   name: 'Zombie Slay',
      //   livestream: "hidden",
      //   babyClass: "flight",
      //   teleprompter: `Cure the zombies!`,
      //   foregroundChildren: (
      //     <React.Fragment>
      //       <VideoBg key={`zombies`} srcs={['spooky.mp4']} style={{opacity: 0.6 }}/>
      //       <div className="layout-center -no-pointer">
      //         <p>Click a zombie to encourage them.<br/>Many must encourage a zombie simultaneously to cure them.</p>
      //       </div>
      //     </React.Fragment>
      //   ),
      // },
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
      meditationScene(4,MEDIATION_QUESTION_4,MEDIATION_PLACEHOLDER_4,MEDIATION_BUTTON_4),
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
            <CTA calEventId={CAL_ID_NEXT} nextCeremonyDate={DATE_NEXT} mailingListText='Homework is sent to mailing list...'></CTA>
            <TipJar/>
          </React.Fragment>
        ),
      },
      // {
      //   name: 'Afterparty',
      //   livestream: vip ? "vip" : "hidden",
      //   babyClass: vip ? "" : "hidden",
      //   foregroundChildren: (
      //     <React.Fragment>
      //       <VideoBg key='spotlight' srcs={(vip ? ['spotlight.mp4']:['campfire.mp4'])}/>
      //       {vip ?
      //         <Subtitles titles={FERNANDO_POEM} />
      //         : <React.Fragment>
      //             <p className="layout-top">VIP participants are currently seeing Fernando's story.</p>
      //             <CTA calEventId={CAL_ID_NEXT} nextCeremonyDate={DATE_NEXT} mailingListText='Homework is sent to mailing list...' />
      //           </React.Fragment>
      //       }
      //       <TipJar/>
      //     </React.Fragment>
      //   ),
      // },
      // {
      //   name: 'Support',
      //   livestream: "hidden",
      //   babyClass: "hidden",
      //   foregroundChildren: (
      //     <React.Fragment>
      //       <VideoBg key='campfire' srcs={['campfire.mp4']}/>
      //       <CTA calEventId={CAL_ID_NEXT} nextCeremonyDate={DATE_NEXT} mailingListText='Homework is sent to mailing list...'></CTA>
      //       <TipJar/>
      //     </React.Fragment>
      //   ),
      // },
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

    // console.log(directorState);

    return (
      <div 
        id={`scene-${slugify(currentScene.name, {lower: true})}`} 
        className={`scene ${babyRainbow ? 'rainbow-baby' : ''}`}
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
       

        {directorState.groupClickies && Object.keys(directorState.groupClickies).map((key,index) =>{
          return (<GroupClicky clicky={directorState.groupClickies[key]} key={key} activeParticipantCount={directorState.activeParticipantCount} clickyId={key} newParticipantEvent={newParticipantEvent} />)
        })}

        <HolySpaceBaby babyClass={typeof currentScene.babyClass !== 'undefined' ?  currentScene.babyClass : ''} hatNumber={babyHat}  color={babyColors[babyColor % babyColors.length]} newParticipantEvent={newParticipantEvent}/>

        <div id="funk-overlay" />

        <Chat newParticipantEvent={newParticipantEvent} messages={messages} color={babyColors[babyColor % babyColors.length]} rainbow={babyRainbow}/>

        {(mode==="performer") && <div id="teleprompter">{currentScene.name}{currentScene.teleprompter}<br/><span style={{color: 'red'}}>{nextScene.name}</span></div>}
        
        <Fireflies participants={directorState.participants} participantId={directorState.participantId} />
      
        <Script
          url="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f87b420788415d6"
        />

      </div>
    );
  }
}

export default Show;