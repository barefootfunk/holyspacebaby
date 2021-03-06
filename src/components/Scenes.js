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
// import VipPasswordInput from "./props/VipPasswordInput"
// import VipOnly from "./props/VipOnly"
import Subtitles from "./props/Subtitles"
import TipJar from "./props/TipJar"
import Fireflies from "./props/Fireflies"
import GroupClicky from "./props/GroupClicky"
import Pomplo from "./props/Pomplo"
import TugOfWar from "./props/TugOfWar"
import ColoringBook from "./props/ColoringBook"
import Monster from "./props/Monster"
import StarDraw from "./props/StarDraw"
import Share from "./props/Share"

// Sounds
import cheer1Sound from '../sounds/cheer1.mp3';

import {initAmplitude, sendAmplitudeData} from './utilities/amplitude';


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
const DATE_THIS = 'JAN 14';
const CAL_ID_THIS = '5fda22a3ad9ab100195b35ad';
const DATE_NEXT = '';
const CAL_ID_NEXT = '';
const CAL_ID_TEST = '5fd2cc003fe53d1239a3040c';


const EP_NUMBER = '14';
const THEME = 'free will';

const BULLETIN = `Click on Zombies at same time`;

const NOTES = [
  'Bb2','D2','E2','G2','C2','F',
  'Bb3','D3','E3','G3','C3','F',
];

const CONTENT = {
  meditations: [
    {
      question: `Name a recent moment you've shown GREAT self control?`,
      placeholder: `Type a moment`,
      button: `Answer anonymously!`,
    },
    {
      question: `How did it feel in your body in the moment?`,
      placeholder: `Type a need`,
      button: `Answer anonymously!`,
    },
    {
      question: `Name a recent moment you've shown POOR self control?`,
      placeholder: `Type a moment`,
      button: `Answer anonymously!`,
    },
    {
      question: `How did it feel in your body in the moment?`,
      placeholder: `Type a need`,
      button: `Answer anonymously!`,
    },
    {
      question: `Deep down, what do you think you needed?`,
      placeholder: `Type a need`,
      button: `Answer anonymously!`,
    },
  ],
  gospel: {
    passage: `Makin a big amazing thing is easy, all you need is a bunch of rad little things`,
    book: `Cowboy Jobe 1:19`,
    sermon: `
      What sticks with us from an amazing story?
      What do we miss about our pre-pandemic life?
      What do we miss about a person?

      Not the big things, but the tiny details.

      We build trust with the little things - Brene Marbles

      Emotionanal Bids predict strong relationships

      Little things give character, 
      they are the cuts made by the knife carvin us out

      Little things are soaked in truth
      They are explosive nuggets of emotion

      Pareto?

      We value little things
        Little things build trust, connection -- more than big
        Trust is about consistency
        They contain truths like "I am always here for you" or "the world is safe"

      We should cherish our memories of little things

      Dont step on little things
      
      Create little things


      INVESTIGATE: EMOTIONAL BIDS
   `,
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
            <div className="connecting-alert -fake">Connecting...</div>
          </React.Fragment>
        ),
        foregroundChildren: (
          <ColoringBook coloringBook={directorState.coloringBook} cake={directorState.cake} allowFrost={true} newParticipantEvent={newParticipantEvent}/>
        ),
      };
    }

    function monsterScene(num,caption,tele) {
      
      // let looseCount = 0;
      // Object.keys(directorState.groupClickies).map(key => {
      //   if(!directorState.groupClickies[key].triggered) { looseCount++ }
      // });

      return {
        name: 'monster'+num,
        livestream: "hidden",
        teleprompter: tele,
        babyClass: "micro",
        backgroundChildren: (
          <React.Fragment>
            <VideoBg key='monster' srcs={['aurora.mp4']}/>
          </React.Fragment>
        ),
        foregroundChildren: (
          <React.Fragment>
            <Monster 
              participants={directorState.participants}
              baddies={directorState.baddies}
              goodies={directorState.goodies}
              difficulty={directorState.difficulty}
              participantId={directorState.participantId}
              monster={directorState.monster} />
            {caption ? 
            (<React.Fragment>
              <div className="layout-top-edge -no-pointer rainbow-text"><p>{caption}</p></div>
            </React.Fragment>) :
            (<React.Fragment>
              <div className="layout-top-edge -no-pointer rainbow-text"><p>Click to release cheese fragrance.  Guide our hero to the jewels.</p></div>
              <div className="layout-bottom-edge -no-pointer rainbow-text"><p>Jewels: {directorState.score}</p></div>
            </React.Fragment>) 
            }
          </React.Fragment>
        ),
      };
    }

    // function darkWallScene(num,caption,tele) {
      
    //   let looseCount = 0;
    //   Object.keys(directorState.groupClickies).map(key => {
    //     if(!directorState.groupClickies[key].triggered) { looseCount++ }
    //   });

    //   return {
    //     name: 'darkWall'+num,
    //     livestream: "hidden",
    //     teleprompter: tele,
    //     babyClass: "micro",
    //     backgroundChildren: (
    //       <React.Fragment>
    //         <VideoBg key='campfire' srcs={['quantum.mp4']}/>
    //       </React.Fragment>
    //     ),
    //     foregroundChildren: (
    //       <React.Fragment>
    //         <DarkWall participants={directorState.participants} difficulty={directorState.difficulty} participantId={directorState.participantId}/>
    //         {caption ? 
    //         (<React.Fragment>
    //           <div className="layout-top-edge -no-pointer rainbow-text"><p>{caption}</p></div>
    //         </React.Fragment>) :
    //         (<React.Fragment>
    //           <div className="layout-top-edge -no-pointer rainbow-text"><p>Everyone must click an atom TOGETHER to zap it.</p></div>
    //           <div className="layout-bottom-edge -no-pointer rainbow-text"><p>{looseCount} atoms loose</p></div>
    //         </React.Fragment>) 
    //         }
    //       </React.Fragment>
    //     ),
    //   };
    // }

    function starDraw(num) {
      return {
        name: 'stardraw'+num,
        livestream: "hidden",
        babyClass: "chaos",
        backgroundChildren: (
          <React.Fragment>
            <div className='star-draws'>
              <StarDraw 
                // newParticipantEvent={newParticipantEvent} 
                linesToDraw={directorState.linesToDraw}
                // brushColor={babyColorString}
                // catenaryColor={babyColorString}
                mode='reciever'
                hideInterface={true}
                disabled={true}
                canvasWidth={1500}
                canvasHeight={1500}
              />            
              <StarDraw 
                newParticipantEvent={newParticipantEvent} 
                // linesToDraw={directorState.linesToDraw}
                brushColor={babyColorString}
                catenaryColor={babyColorString}
                mode='transmitter'
                canvasWidth={1500}
                canvasHeight={1500}
              />
            </div>
            <div className="connecting-alert -fake">Connecting...</div>
            <div className="layout-bottom-edge -no-pointer rainbow-text"><p>{'<?Click to draw?>'}</p></div>
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
          <CTA calEventId={CAL_ID_THIS} nextCeremonyDate={DATE_THIS}><p>The world's first interactive electric trombone livestream adventure.  Here. Every Thursday 7p CT. <a href={`https://add.eventable.com/events/5f8edeb953314b00158b2ff5/${CAL_ID_TEST}/`} 
          onClick={() => {
            sendAmplitudeData('add-to-calendar', {}); 
          }}
          target="_blank">Help test!</a></p></CTA>

      </React.Fragment>
      ),
    };

    function promptScene(num,question,placeholder,buttonText,gif,bgs,character) {
      return {
        name: `Vision ${num}`,
        livestream: "tiny",
        babyClass: "flight",
        teleprompter: `${question}`,
        backgroundChildren: (
          <React.Fragment>
            <VideoBg key={`calm${num}`} srcs={bgs ? bgs : FLIGHT_BGS} />
            {character && <div id={character}><button/></div>}
            {/* <VideoBg key='glub' srcs={['glubgo.gif']} classes="bg-video--portal bg-video--corner"/> */}
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
            <VideoBg key={`tugofwar${num}`} srcs={FLIGHT_BGS} /> 
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
            <div id="monster" className="-center"><button/></div>
          </React.Fragment>
        ),
      };
    }

    function chaosScene(num,caption) {
      return {
        name: 'chaos'+num,
        livestream: "hidden",
        babyClass: "chaos",
        teleprompter: num===6 ? 'do the zombies!' : '',
        backgroundChildren: (
          <React.Fragment>
            {num>=1 && <VideoBg key={`code`} srcs={['code.mp4']}/>}
          </React.Fragment>
        ),
        foregroundChildren: (
          <React.Fragment>
            {num>=2 && <CTA calEventId={CAL_ID_NEXT} nextCeremonyDate={DATE_NEXT} chaos />}
            {num>=3 && <div className="layout-top-edge -no-pointer" style={{transform: 'rotate(180deg)'}}><p>Cowboy Elijah will appear in the flames here just before 7p CST today to reincarnate you.</p></div>}
            
            {num>=4 && <Pomplo fireflies={directorState} />}
            {num===5 && <Prompter 
              id={`vision1`}
              key={`prompt-vision1`}
              prompt={'Lie to me'}
              placeholder={'Type your truth'}
              newParticipantEvent={newParticipantEvent} 
              responses={responses} 
              mode={mode}
              buttonText={'Subm!t'}
              soundMode='sample'
              // visionSrc={false}
            />}
            {num>=7 && typeof directorState.tugOfWars['turn0'] !== 'undefined' &&
              <React.Fragment>
                <div id="hellbus"><button /></div>
                <TugOfWar 
                  newParticipantEvent={newParticipantEvent} 
                  tugOfWarId={'turn0'} 
                  tugOfWar={directorState.tugOfWars['turn0']}
                  side1={{
                    image: 'cat.jpg',
                    victory: 'cat superior',
                    caption: 'vote cat?',
                  }}
                  side2={{
                    image: 'dog.jpg',
                    victory: 'dog superior',
                    caption: 'vote dog?',
                  }}
                />
              </React.Fragment>
            }
                       
            {num>=8 && <ColoringBook coloringBook={directorState.coloringBook} cake={directorState.cake} newParticipantEvent={newParticipantEvent}/>}
            <div className="connecting-alert -fake">Connecting...</div>
            {caption && <div className="layout-bottom-edge -no-pointer rainbow-text"><p>{caption}</p></div>}
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
      // homepage,
      {
        name: 'Pre live',
        livestream: "hidden",
        babyClass: "hidden",
        backgroundChildren: (
          <React.Fragment>
            <VideoBg key='campfire' srcs={['campfire.mp4']}/>
            <div className="layout-center -no-pointer">
              <p>Cowboy Elijah will appear here in the flames at the time of the ceremony to reincarnate you.</p>
            </div>
            {/* <Share /> */}
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
            {/* <Share /> */}
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
      promptScene(0,`BWAHAHAHA. I am Atomic Dog... I will turn all humans into Ravioli! What say you?`,'Type an insult','Resist!','ravioli.webp',false,"atomic-dog"),
      promptScene(1,'Mock all you like.  I will use my mind control ray to make you eat your delicious friends. What sauce?','Type a sauce','Request!','hungry.webp',false,"atomic-dog"),
      promptScene(2,'I am CleoCATra, resistance leader against Atomic Dog.  Help my beautiful daughter collect the space jewels. Also name her.','Type a name','Name!','cat.webp',['jewels.webp'],"monster"),
      
      tugOfWarScene(0,`Sadly, she only responds to the smell of cheese. Vote on which cheese you will use to guide her..`,
        {
          caption: 'CHEDDAR',
          victory: 'How did you not choose Mozzarella? Fools.',
          image: 'cheddar.jpg',
        },
        {
          caption: 'MOZZARELLA',
          victory: 'You have selected the superior cheese.',
          image: 'mozzarella.jpg',}
      ),
      monsterScene(0,false,''),
    
    

      // starDraw(0),
      {
        name: "Meditation Intro",
        livestream: "tiny",
        foregroundChildren: (
          <React.Fragment>
            <VideoBg key='calm' srcs={CALM_BGS} />
            <VideoBg key='fire' srcs={['campfire-close.mp4']} style={{opacity: 0.1}} />
            <div className="layout-top -no-pointer">
              <h1>YOU PONDER!</h1>
            </div>
            <div className="layout-bottom -no-pointer">
              <p>You introspect.  Be as real as you are comfortable being. All anonymous.</p>
            </div>
          </React.Fragment>
        ),
      },
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

          ${CONTENT.gospel.sermon}
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
            {/* <CTA calEventId={CAL_ID_NEXT} nextCeremonyDate={DATE_NEXT}></CTA> */}
            {/* <div className="layout-center"><Share /></div> */}
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
       

        {directorState.groupClickies && 
          <React.Fragment>

            {Object.keys(directorState.groupClickies).map((key,index) =>{
              return (<GroupClicky clicky={directorState.groupClickies[key]} key={key} activeParticipantCount={directorState.activeParticipantCount} clickyId={key} newParticipantEvent={newParticipantEvent} mode={mode} />)
            })}
          </React.Fragment>
        }

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