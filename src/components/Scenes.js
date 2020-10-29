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
import GroupClicky from "./props/GroupClicky"

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

const VIP_PASSWORD = 'DANCEMACHINE';
const EP_NUMBER = '7';
const THEME = 'zombie';

const BULLETIN = `Would you rather?`;

const VISION_GIF_1         = "book.gif";
const VISION_QUESTION_1    = "Hmmm grandma's book has all sorts of wierd passages. You read out loud. What does it say?";
const VISION_PLACEHOLDER_1 = "Type a passage";
const VISION_BUTTON_1      = "Recite!";

const VISION_GIF_2         = "arms.webp";
const VISION_QUESTION_2    = "Oh dangit!  The book was cursed.  Many bad things begin to happen.";
const VISION_PLACEHOLDER_2 = "Type a curse.";
const VISION_BUTTON_2      = "Regret!";

const VISION_GIF_3         = "rise.webp";
const VISION_QUESTION_3    = "The dead rise! They are overwhelmed by the world of the living. What do they fear?"
const VISION_PLACEHOLDER_3 = "Type a zombie fear";
const VISION_BUTTON_3      = "Overwhelm!";

const VISION_GIF_4         = "science.gif";
const VISION_QUESTION_4    = "Luckily, dogs are now hyperintelligent. \"Our anti-zomb serum is 60% encouragement.\" What other ingredients??";
const VISION_PLACEHOLDER_4 = "Type another ingredient";
const VISION_BUTTON_4      = "Concoct!";


const NOTES = [
  'Bb2','D2','E2','G2','C2','F',
  'Bb3','D3','E3','G3','C3','F',
];

const MEDIATION_QUESTION_1    = "What overwhelms you?";
const MEDIATION_PLACEHOLDER_1 = "Type a thing";
const MEDIATION_BUTTON_1      = "Answer anonymously!";

const MEDIATION_QUESTION_2    = "What is out of your control?";
const MEDIATION_PLACEHOLDER_2 = "Type a thing";
const MEDIATION_BUTTON_2      = "Answer anonymously!";

const MEDIATION_QUESTION_3    = "What CAN you control?";
const MEDIATION_PLACEHOLDER_3 = "Type a thing";
const MEDIATION_BUTTON_3      = "Answer anonymously!";

const MEDIATION_QUESTION_4    = "What's something small you can do to make things better?";
const MEDIATION_PLACEHOLDER_4 = "Type a thing";
const MEDIATION_BUTTON_4      = "Answer anonymously!";

const GOSPEL = '"The secret ingredient to curing zombiehood is something-you-can-do-about-it-ness"';
const GOSPEL_SOURCE = '-Cowboy Jobe 1:19';
const SERMON = `${GOSPEL} ${GOSPEL_SOURCE}
  What makes a zombie? Nothing-you-can-do-about-it-ness.
      life is happening to you
      not in control of your destiny
      cant make a difference
  this mistake is mixing up things you can/cant control
    learned helplessness
    dogs
    your past
  But there is always something you can do.  
    Finding it easy
      Journal--Have you tried? Where haven't you looked?
    beliving it exists = hard
  Can't assume you control too much–pancake. Not sustainable
    bite off the exact amount of the world
  The difference is the faith.  
    Yourself
    your loved ones, community
  Believe you can make change–whatever that may be.
    Renew that belief everyday. 
    Audit zombiehood.
`;

const HW_LINK = "";

const FERNANDO_POEM = [
  '',
  'Fernando: Good evening',
  'I am very still but do not be confused',
  'For my heart blazes',
  'Quoth Henly,',
  '"It matters not how strait the gate,',
  '"How charged with punishments the scroll,',
  '"I am the master of my fate:',
  '"I am the captain of my soul."',
  '',
  'The outer stirrings of my shell tell you nothing',
  'about the torments or victories of my inner world.',
  'Appearances decieve.',
  'The quickest may be hollow–slaves to life and other energies.',
  'The calmest may conceal in their lungs a tempest.',
  '',
  'You think I must move to make a difference?',
  'And yet here you are, listening to me.',
  '',
  'Great impact does not require but a feathers touch,',
  'if that feather lands true.',
  'The outer world can be quite still,',
  'if the inner be inferno.',
  '',
  'Command your soul to catch fire.',
  'Move just enough to release the smoke.',
  '',
  'Burn bright, my friends.',
  'There is always a difference to be made.'
];

class Show extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      babyColor: Math.floor(Math.random()*7),
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
      {
        name: 'Zombie Slay',
        livestream: "hidden",
        babyClass: "flight",
        teleprompter: `Cure the zombies!`,
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key={`zombies`} srcs={['spooky.mp4']} style={{opacity: 0.6 }}/>
            <div className="layout-center -no-pointer">
              <p>Click a zombie to encourage them.<br/>Many must encourage a zombie simultaneously to cure them.</p>
            </div>
          </React.Fragment>
        ),
      },
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