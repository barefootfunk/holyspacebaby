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
import Pomplo from "./props/Pomplo"
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
const DATE_THIS = 'NOV 19';
const DATE_NEXT = ''; // WHOOPS THAT THANKSGIVING
// const DATE_NEXT = 'NOV 26';
const CAL_ID_THIS = '5faaaeae20d745003fa28f65';
const CAL_ID_NEXT = '';
// NOV 26 -- 5faaaf519960a00018f0026c

const EP_NUMBER = '9';
const THEME = 'safety';

const BULLETIN = `Click on Zombies at same time`;

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

const GOSPEL = `"Bravery and safety gotta rise like sun and moon–and to be safe is to belong."`;
const GOSPEL_SOURCE = '-Cowboy Jobe 1:19';
const SERMON = `${GOSPEL} ${GOSPEL_SOURCE}
// Problem -> Misconception -> Solution  

  We are exhausted.  We have had to wrestle with fear.  We have had to be brave.
  And there is no end in sight.
  fear as a compass.
  bravery is required
  but not sustainable
  Symptoms: exhausted, like somthing is wrong with you, unable to get excited, constant dread
  (trauma)
  Relax/rest doesnt always recharge
  Therapist, St. H: oppositve of bravery is not relaxation, its safety.
  Not stress/recovery or sympathetic/parasympathetic, bravery/safety.
  Safety is a feeling, from evolution 
  thinking absence of danger, (cog reframe, permission)
  comfort, 
  nature,
  deep breathing with slow outbreaths,
  self-care
  most overlooked CONNECTION
  Homo sapiens survival strategy: communities and cooperating
  Trust, connect, smile, play, hug, laugh
  It worked for me.
  takes time -- consistent little > big
  send a text.
  to be thinking of others and know they are thinking of you.
  if you are feeling isolated, offer safety to others.
  need for bravery will continue, facilitate this cycle.
  brave sunrise, safe moonrise
  Give yourself safety now, so you can be brave tomorrow.
`;

// Safety is a feeling, not a worldstate
// mammals need to feel safe: 1. babies raised by mothers 2. social interdependency 3. safety needed for higher functions (thinking, sleep, nursing, digestion, reproduction)
// safe states are prereq for higher forms of thinking, creativity generativity
// para vs. symp s wrong  

// breathing is the one autonomic thing you can control and it feeds back into the autonomic->cognitive loop, LONG exhale
// mirroring others who are feeling safe

// go to others for saefty
// or GIVE it to others

// safety is harder to feel for trauma 

// safety is a runaway positive feedback loop (so is threat), both are vyvles
// danger signals: low frqs, flat affect faces

// smiles, eye contact, playful, prosidy
// mid-frequencies
// breath (make exhale longer)
// environments that feel safe (outdoors, light, homey)
// spendtime with people you like
// do behaviors you do when you feel safe
// ice water
// old home movies
// laughter
// reduce sensory input

// make space for this

// safety => connection

// relaxation,

// not sources of DANGER/narratives

// peobiotic, chocolate, b12, single cup of coffee, b complex
  // Anxiety creates risk aversion, not loss aversion
// https://www.inc.com/mithu-storoni/this-is-why-youre-so-afraid-of-uncertainty-according-to-neuroscience.html
// https://www.inc.com/mithu-storoni/your-brain-isnt-afraid-of-failure-heres-whats-really-going-on.html
// https://www.theguardian.com/commentisfree/2016/apr/04/uncertainty-stressful-research-neuroscience

// https://www.youtube.com/watch?v=br8-qebjIgs&ab_channel=NerdNite

class Show extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      babyColor: 0,
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
    this.setState({
      babyColor: Math.floor(Math.random()*7),
    })
  }

  render () {
    let {scene, mode, messages, newParticipantEvent, responses, directorState} = this.props;

    const {babyColor, funkLevel, babyHat, babyRainbow, vip} = this.state;

    

    function pomploBattle(num,caption) { 
      return {
        name: 'Pomplo'+num,
        livestream: "hidden",
        teleprompter: caption,
        babyClass: "flight",
        backgroundChildren: (
          <React.Fragment>
            <VideoBg key='underwater' srcs={['underwater.mp4']}/>
            {caption && <div className="layout-top -no-pointer">
            <p>{caption}</p>
            </div>}
          </React.Fragment>
        ),
        foregroundChildren: (
          <Pomplo directorState={directorState}/>
        ),
      };
    }

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

    function promptScene(num,question,placeholder,buttonText,gif,bgs) {
      return {
        name: `Vision ${num}`,
        livestream: "tiny",
        babyClass: "flight",
        teleprompter: `${question}`,
        // backgroundChildren: (
        //   <div id="hellbus" className="-big"><button></button></div>
        // ),
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key={`flight${num}`} srcs={bgs ? bgs : FLIGHT_BGS}/>
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
              visionSrc={gif ? `/img/${gif}` : false}
            />
          </React.Fragment>
        ),
      }
    }

    function pomploPromptScene(num,question,placeholder,buttonText,gif,bgs) {
      return {
        name: `Vision ${num}`,
        livestream: "hidden",
        babyClass: "flight",
        teleprompter: `${question}`,
        backgroundChildren: (
          <Pomplo directorState={directorState} hideHealthbar={true} />
        ),
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key={`flight${num}`} srcs={['underwater.mp4']}/>
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
              visionSrc={gif ? `/img/${gif}` : false}
            />
          </React.Fragment>
        ),
      }
    }

    function meditationScene(num,question,placeholder,buttonText) {
      return {
        name: `Meditation ${num}`,
        livestream: "tiny",
        teleprompter: `${question}`,
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
            <VideoBg key={`tugofwar${num}`} srcs={['underwater.mp4']} /> 
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
            <Pomplo directorState={directorState} hideHealthbar={true} />
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
              <p>You will now witness alternate universes.</p>
            </div>
          </React.Fragment>
        ),
      },
      promptScene(1,
        `You encounter the benevolent Octopus Queen Melinda. "Who are you? Proove you belong to the ocean!"`,
        `Type proof`,
        `Prove!`,
        'octopus.gif',
        false // Default BG
      ),
      promptScene(2,
        `"I'm sorry I doubted you.  I'm edge because I am dying. I have one wish. Please will you help?"`,
        `Type answer`,
        `Reply!`,
        'octopus-dying.gif',
        false // Default BG
      ),
      pomploPromptScene(3,
        `This is my son Pomplo. He is part cow. Please keep him SAFE.`,
        `Type answer`,
        `I promise!`,
        false,
        false,
      ),
      tugOfWarScene(3,
        `Pomplo likes trucks. Which toy to give Pomplo? Click one side repeatedly to vote.`,
        {
          image: 'dumptruck.png',
          caption: 'Dump truck',
          victory: 'Pomplo giggles with delight at the dumptruck.'
        },
        {
          image: 'firetruck.png',
          caption: 'Fire truck',
          victory: `Pomplo feels like a very brave firefighter.`
        }
      ),
      pomploBattle(0,'Defeat the zombies! Everybody must click on the same zombie at the same time.'),
      pomploBattle(1,'Pomplo is hurt! Use the chat to tell Pomplo you love him.'),
      pomploBattle(2,false),
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
      meditationScene(1,
        `What has exhausted you lately?`,
        `Type a thing`,
        `Answer anonymously!`
      ),
      meditationScene(2,
        `How does that feel in your body?`,
        `Type a thing`,
        `Answer anonymously!`
      ),
      meditationScene(3,
        `What makes you feel safe?`,
        `Type a thing`,
        `Answer anonymously!`
      ),
      meditationScene(4,
        `Whats a simple way to connect with others?`,
        `Type a thing`,
        `Answer anonymously!`
      ),
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
            <CTA calEventId={CAL_ID_NEXT} nextCeremonyDate={DATE_NEXT}></CTA>
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

              
    const babyColors = ['lime','red','orange','yellow','cyan','violet'];
    const babyColorString = babyColors[babyColor % babyColors.length];
    // console.log(directorState);
    console.log('babyColor',babyColor,babyColorString);
    return (
      <div 
        id={`scene-${slugify(currentScene.name, {lower: true})}`} 
        className={`scene`}
        style={{
          '--baby-color': babyColorString,
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

        <HolySpaceBaby babyClass={typeof currentScene.babyClass !== 'undefined' ?  currentScene.babyClass : ''} hatNumber={babyHat}  color={babyColorString} newParticipantEvent={newParticipantEvent}/>

        <div id="funk-overlay" />

        <Chat newParticipantEvent={newParticipantEvent} messages={messages} color={babyColorString} rainbow={babyRainbow}/>

        {(mode==="performer") && <div id="teleprompter">{currentScene.name}<br />{currentScene.teleprompter}<br/><span style={{color: 'red'}}>{nextScene.name}</span></div>}
        
        <Fireflies participants={directorState.participants} participantId={directorState.participantId} />
      
        {/* <Script
          url="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f87b420788415d6"
        /> */}
        
      </div>
    );
  }
}

export default Show;