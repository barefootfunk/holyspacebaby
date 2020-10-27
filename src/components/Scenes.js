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
import Fireflies from "./props/Fireflies"

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
const DATE_THIS = 'OCT 29';
const DATE_NEXT = '';
const CAL_ID_THIS = '5f8ee83c62821f005a6b302a';
const CAL_ID_NEXT = '';

const VIP_PASSWORD = 'HEARTGYM';
const EP_NUMBER = '6';
const THEME = 'puzzle pieces';

const BULLETIN = `Homework/VIP,  
Fernando, 
If you design any superintelligent AIs be careful what you input, 
Thank yous/credits`;

const VISION_GIF_1         = "recital.webp";
const VISION_QUESTION_1    = "The scientist programmed the A.I. Nueral Network with videos of the kindest, noblest humans–but accidentally included their daughter's dance recital.";
const VISION_PLACEHOLDER_1 = "Type a kind human or dance";
const VISION_BUTTON_1      = "Program!";

const VISION_GIF_2         = "robot.gif";
const VISION_QUESTION_2    = "The A.I. NuNe immediately began to gyrate and wanted to maximally better the world.  \"How can I make the world better?\"";
const VISION_PLACEHOLDER_2 = "Type a cause";
const VISION_BUTTON_2      = "Ponder!";

const VISION_GIF_3         = "farm.webp";
const VISION_QUESTION_3    = "NuNe attempted to grow super foods for the hungry.  Dancing slowed them. The other farmBots mocked."
const VISION_PLACEHOLDER_3 = "Type a robot diss";
const VISION_BUTTON_3      = "Diss!";

const VISION_GIF_4         = "explosion.webp";
const VISION_QUESTION_4    = "NuNe attempted to research cancer, but their dance moves were a hazard in the lab.";
const VISION_PLACEHOLDER_4 = "Type a lab accident";
const VISION_BUTTON_4      = "Accident!";

const VISION_GIF_5         = "lament.webp";
const VISION_QUESTION_5    = "An overwhelming number of causes, but NuNe could not find theirs.  In despair, NuNe engaged ultra_lament_dance().";
const VISION_PLACEHOLDER_5 = "Type a lament";
const VISION_BUTTON_5      = "ultra_lament_dance()";

const VISION_GIF_6         = "boy.gif";
const VISION_QUESTION_6    = "A little boy struggling with depression was inspired and joined in.  He giggled. The world was brighter.";
const VISION_PLACEHOLDER_6 = "Encourage the little boy";
const VISION_BUTTON_6      = "Encourage!";

const VISION_GIF_7         = "kids.webp";
const VISION_QUESTION_7    = "Today, NuNe is a superhuman innovator in robo-human interface youth dance therapy and has saved thousands of children.";
const VISION_PLACEHOLDER_7 = "Type thanks to NeuNe";
const VISION_BUTTON_7      = "Celebrate!";

const NOTES = [
  'Bb2','D2','F2','Gb2','C2',
  'Bb3','D3','F3','Gb3','C3',
];

const MEDIATION_QUESTION_1    = "What is one your weaknesses?";
const MEDIATION_PLACEHOLDER_1 = "Type a weakness";
const MEDIATION_BUTTON_1      = "Answer anonymously!";

const MEDIATION_QUESTION_2    = "What is something you shine at or love to do?";
const MEDIATION_PLACEHOLDER_2 = "Type a strength";
const MEDIATION_BUTTON_2      = "Answer anonymously!";

const MEDIATION_QUESTION_3    = "How can that brighten someone else's life?";
const MEDIATION_PLACEHOLDER_3 = "Type a way";
const MEDIATION_BUTTON_3      = "Answer anonymously!";

const GOSPEL = '"Are you a zombie or a pancake–or are you you?"';
const GOSPEL_SOURCE = '-Cowboy Jobe 1:19';
const SERMON = `${GOSPEL} ${GOSPEL_SOURCE}
  Agency - define
  too much makes you a zombie
  too little makes you a pancake
  flipflops
  are you either of these things?
  when are you you?
  take the exact right size bite of the world
  goldilocks
`;

const HW_LINK = "";

const FERNANDO_POEM = [
  '',
  'Fernando: Good evening, special people.',
  'Fernando: Can I get an Amen in the chat?',
  '',
  'Fernando: That was an excellent Amen.',
  'Fernando: I will now share my story.',
  '',
  'Fernando: For decades I could not find my purpose.',
  'Fernando: I was a terrible doctor.',
  'Fernando: Due to my stillness.',
  'Fernando: I was a worse chef.',
  'Fernando: Due to my stillness.',
  '',
  'Fernando: Then one gloomy day,', 
  'Fernando: while working a day job as at Old Navy,',
  'Fernando: I overheard some white sepremacists',
  'Fernando: planning a terrorist plot.',
  'Fernando: I was terrified!',
  'Fernando: Go ahead.',
  'Fernando: Ask your dear Fernando what he did!',
  '',
  'Fernando: Well I\'ll tell you.',
  'Fernando: I thought quickly',
  'Fernando: and did not move a muscle.',
  'Fernando: I listened as they discussed all the details',
  'Fernando: while trying on their pants.',
  '',
  'Fernando: They ignored me.',
  'Fernando: Due to my stillness.',
  '',
  'Fernando: I reported them to the FBI.',
  'Fernando: Together, we foiled their terrorist threat.',
  '',
  'Fernando: The FBI offered me a job.',
  'Fernando: They said I was the perfect spy.',
  '',
  'Fernando: Friends, congratulate your Fernando!',
  '',
  'Fernando: And today your dear Fernando has found great joy',
  'Fernando: in bringing down neo-nazi organizations',
  'Fernando: from the inside.',
  '',
  'Fernando: Nobody suspects the mannequin.',
  '',
  'Fernando: Farewell, my friends!',
  'Fernando: I will see you in a week\'s time!',
  'Fernando: For another story.',
  'Fernando: Be sure to do your homework!',
];

class Show extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      babyColor: 0,
      babyHat: 0,
      funkLevel: 0,
      babyRainbow: false,
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
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key={`flight${num}`} srcs={FLIGHT_BGS}/>
            {num>=3 &&
              <div style={{
                backgroundImage: `url('/img/robot2.gif')`,
                position: 'fixed',
                backgroundSize: 'contain',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
              }} />
            }
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
            <FunkBottle bottleName="color" onDrink={() => { this.setState({babyColor: this.state.babyColor + 1, babyRainbow: false}) }}  />  
            <VipOnly vip={vip}>
              <FunkBottle bottleName="hat" onDrink={() => { this.setState({babyHat: this.state.babyHat + 1,}) }}  />  
            </VipOnly>
            <VipOnly vip={vip}>
              <FunkBottle bottleName="rainbow" onDrink={() => { this.setState({babyRainbow: !this.state.babyRainbow}) }}  />  
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
      visionScene(6,VISION_QUESTION_6,VISION_PLACEHOLDER_6,VISION_BUTTON_6,VISION_GIF_6),
      visionScene(7,VISION_QUESTION_7,VISION_PLACEHOLDER_7,VISION_BUTTON_7,VISION_GIF_7),
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
            <CTA calEventId={CAL_ID_NEXT} nextCeremonyDate={DATE_NEXT} mailingListText='Homework is sent to mailing list...'></CTA>
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
                  <CTA calEventId={CAL_ID_NEXT} nextCeremonyDate={DATE_NEXT} mailingListText='Homework is sent to mailing list...' />
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
            <CTA calEventId={CAL_ID_NEXT} nextCeremonyDate={DATE_NEXT} mailingListText='Homework is sent to mailing list...'></CTA>
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

    console.log(directorState);

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
       
        <HolySpaceBaby babyClass={typeof currentScene.babyClass !== 'undefined' ?  currentScene.babyClass : ''} hatNumber={babyHat}  color={babyColors[babyColor % babyColors.length]} newParticipantEvent={newParticipantEvent}/>

        <div id="funk-overlay" />

        <Chat newParticipantEvent={newParticipantEvent} messages={messages} color={babyColors[babyColor % babyColors.length]} rainbow={babyRainbow}/>

        {(mode==="performer") && <div id="teleprompter">{currentScene.name}{currentScene.teleprompter}<br/><span style={{color: 'red'}}>{nextScene.name}</span></div>}
        
        <Fireflies participants={directorState.participants} participantId={directorState.participantId} />
      </div>
    );
  }
}

export default Show;