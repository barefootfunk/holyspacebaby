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
import ColoringBook from "./props/ColoringBook"
import StarDraw from "./props/StarDraw"
import Share from "./props/Share"

// Sounds
import cheer1Sound from '../sounds/cheer1.mp3';


// Twitch
// This has to be shut off for gatsby build because of breaking reference to window
const ReactTwitchEmbedVideo = typeof window !== `undefined` ? require("react-twitch-embed-video") : null
const Vimeo = typeof window !== `undefined` ? require('react-vimeo') : null;

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
const DATE_THIS = 'DEC 3';
const DATE_NEXT = 'DEC 10';
const CAL_ID_THIS = '5faaaf5fd3fd170066d3669a';
const CAL_ID_NEXT = '5fc728379c997c0089df835f';

const EP_NUMBER = '12';
const THEME = 'failure';

const BULLETIN = `Click on Zombies at same time`;

const NOTES = [
  'Bb2','D2','E2','G2','C2','F',
  'Bb3','D3','E3','G3','C3','F',
];

const CONTENT = {
  meditations: [
    {
      question: `How does failure make you feel?`,
      placeholder: `Type a feeling`,
      button: `Answer anonymously!`,
    },
    {
      question: `What's a failure you fear?`,
      placeholder: `Type a failure`,
      button: `Answer anonymously!`,
    },
    {
      question: `What's a failure you've experienced?`,
      placeholder: `Type a failure`,
      button: `Answer anonymously!`,
    },
    {
      question: `Wnat did you learn?`,
      placeholder: `Type a lesson`,
      button: `Answer anonymously!`,
    },
    {
      question: `Will you try again?`,
      placeholder: `Type answer`,
      button: `Answer anonymously!`,
    },
  ],
  gospel: {
    passage: `Failure is an old wisened guru atop the mountain. He will answer ANY question you ask–provided you let him punch you in the face.`,
    book: `Cowboy Jobe 1:19`,
    sermon: `There ain't nothin failin can't teach ya.  You just gotta be willing to take one on the jaw.

    Wanna know the correct way to ride a bike?
    All you gotta do is get punched in the face!
    
    Wanna know what stands between you and that new job?
    You can find out with a few face punches.
    
    Wanna know if the practice strategy for your senior recital was good?
    Face punch.
    
    Does your crush like you back?
    Face punch.
    
    Wanna know if your new comedy routine is funny?
    Face punch.
    
    Seeing this transaction with failure gets you thinkin right.
    When you see it as a transaction, you stop running from it and start trying to get a good deal!
    
    You better make sure you get your face punch worth of answers!
    You better make sure you ask dang good questions, worth a good face punch.
    And certainly not the same question over and over.  Listen to what failure says the first time!
    Otherwise you'll get punched way more times that you need to.
    
    There's plenty of questions for which the answers are WELL WORTH the face punch.
    You can get HUGE bargains.
    I mean how many times would you get punched in the face 
    if you knew you'd come out with clarity about how to make all your dreams come true?
    And most of the best questions can ONLY be answered with a good clockin.  
    It's not just a way to learn.  Sometimes its the ONLY way!
    
    Now I'm not gonna tell you that it stops hurting to get punched in the face.
    Even with lots of practice.
    We all know it deep down.  The face punches always hurt and always will hurt.  That never goes away.  No matter how many you take.
    But your relationship to the pain can change–especially when you see it in the light of this metaphor.
    
    Next time your jaw hurts, ask yourself--what answers did failure give me in exchange for this?
    Start journalin and dont you dare stop.  The more your face hurts, the bigger an answer he probably gave you.  
    His answer is always longer than you think.  But you gotta listen.
    
    But wait!  There's more. A bonus.  Get this:
    Sometimes failure don't punch you none.  
    Sometimes you ask failure a question and he just gives you the answer for free.
    And you both just do a little dance or something--I dunno.
    And when that happens that's nice.
    But the knowledge you seek was something you were willing to get punched for.
    
    Now youve heard failure is good before.
    So why are you still afraid?`,
  }
}



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

    const babyColors = ['lime','red','orange','yellow','cyan','violet'];
    const babyColorString = babyColors[babyColor % babyColors.length];
   

    function cake(num,caption,tele) {
      return {
        name: 'cake'+num,
        livestream: "hidden",
        teleprompter: tele,
        babyClass: "flight",
        backgroundChildren: (
          <React.Fragment>
            <VideoBg key={`flight${num}`} srcs={FLIGHT_BGS}/>
            <VideoBg key='glub' srcs={['glubgo.gif']} classes="bg-video--portal bg-video--corner"/>
            {typeof caption !=='undefined' && caption}
          </React.Fragment>
        ),
        foregroundChildren: (
          <ColoringBook coloringBook={directorState.coloringBook} cake={directorState.cake} allowFrost={directorState.scene===9} newParticipantEvent={newParticipantEvent}/>
        ),
      };
    }

    function starDraw(num) {
      return {
        name: 'stardraw'+num,
        livestream: "hidden",
        babyClass: "hidden",
        backgroundChildren: (
          <React.Fragment>
            <div className="connecting-alert -fake">Connecting...</div>
            <StarDraw 
              newParticipantEvent={newParticipantEvent} 
              linesToDraw={directorState.linesToDraw}
              brushColor={babyColorString}
              catenaryColor={babyColorString}
            />
          </React.Fragment>
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
        backgroundChildren: (
          <React.Fragment>
            <VideoBg key={`flight${num}`} srcs={bgs ? bgs : FLIGHT_BGS}/>
            <VideoBg key='glub' srcs={['glubgo.gif']} classes="bg-video--portal bg-video--corner"/>
          </React.Fragment>
        ),
        foregroundChildren: (
          <React.Fragment>
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

    function meditationScene(num,meditationContent) {
      return {
        name: `Meditation ${num}`,
        livestream: "tiny",
        teleprompter: `${meditationContent.question}`,
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key={`calm${num}`} srcs={CALM_BGS} />
            <VideoBg key={`fire${num}`} srcs={['campfire-close.mp4']} style={{opacity: num*0.2}} />
            <Prompter 
              id={`meditation${num}`}
              key={`prompt-meditation${num}`}
              prompt={meditationContent.question}
              placeholder={meditationContent.placeholder}
              newParticipantEvent={newParticipantEvent} 
              responses={responses} 
              mode={mode}
              buttonText={meditationContent.button}
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
      // {
      //   name: "Sermon",
      //   babyClass: "hidden",
      //   teleprompter: `
      //     ${SERMON}
      //   `,
      //   livestream: 'hidden',
      //   foregroundChildren: (
      //     <React.Fragment>
      //       <VideoBg key='fire-sermon' srcs={['campfire-close.mp4']} />
      //       {/* <BestResponses /> */}
      //       <div id="vimeo" className={'big'}>
      //         <div className="animation-wrap">
      //           <div className="sizing-wrap">
      //           {typeof window !== `undefined` && <Vimeo videoId={ 484153477 } autoplay={true} />}
      //           </div>
      //         </div>
      //       </div>

      //       <div className="layout-top-edge -no-pointer">
      //         <p>{GOSPEL}<br/>{GOSPEL_SOURCE}</p>
      //       </div>
      //       <CTA calEventId={CAL_ID_THIS} nextCeremonyDate={DATE_THIS} />
      //     </React.Fragment>
      //   ),
      // },
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
            <Share />
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
            <Share />
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
      // `${((Object.keys(this.props.directorState.coloringBook).length/421)*100).toFixed(4)}% frosted`
      promptScene(0,'It’s Glubgo’s birthday! Wish him a happy birthday!','Type birthday greeting','Wish well!',false,false),
      starDraw(0),
      // cake(0,
      //   (
      //   <div className="layout-center -no-pointer">
      //     <p>We must bake him a cake! His favorite flavor of cake is... IDEAS. </p>
      //   </div>
      //   ),
      //   'intro'
      // ),
      // cake(1,
      //   (<React.Fragment>
      //     <div className="layout-top-edge">
      //       <p>Let's bake! We need some IDEAS.  Quickly! Type some thoughts into the CHAT.</p>
      //     </div>
      //     <div className="layout-bottom-edge">
      //     <p>{`Cake status: ${(this.props.directorState.cake.percentage*100).toFixed(4)}% built`}</p>
      //     </div>
      //   </React.Fragment>),
      //   'bake'
      // ),
      // cake(1,
      //   (<React.Fragment>
      //     <div className="layout-top-edge">
      //       <p>Baked! Click the cake to help frost it.</p>
      //     </div>
      //     <div className="layout-bottom-edge">
      //     <p>{`Frosting phase: ${((Object.keys(this.props.directorState.coloringBook).length/421)*100*2).toFixed(4)}% rad`}</p>
      //     </div>
      //   </React.Fragment>),
      //   'frost'
      // ),
      meditationScene(0,CONTENT.meditations[0]),
      meditationScene(1,CONTENT.meditations[1]),
      meditationScene(2,CONTENT.meditations[2]),
      meditationScene(3,CONTENT.meditations[3]),
      meditationScene(4,CONTENT.meditations[4]),
      {
        name: "Sermon",
        babyClass: "hidden",
        teleprompter: `
          "${CONTENT.gospel.passage}"
          -${CONTENT.gospel.book}
        `,
        livestream: 'big',
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key='fire-sermon' srcs={['campfire-close.mp4']} />
            {/* <BestResponses /> */}

            <div className="layout-top -no-pointer">
              <p>"{CONTENT.gospel.passage}"<br/>-{CONTENT.gospel.book}</p>
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
        
      </div>
    );
  }
}

export default Show;