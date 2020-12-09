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
import DarkWall from "./props/DarkWall"
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
const DATE_THIS = 'DEC 10';
const DATE_NEXT = '';
const CAL_ID_THIS = '5fc728379c997c0089df835f';
const CAL_ID_NEXT = '';

const EP_NUMBER = '13';
const THEME = 'attention';

const BULLETIN = `Click on Zombies at same time`;

const NOTES = [
  'Bb2','D2','E2','G2','C2','F',
  'Bb3','D3','E3','G3','C3','F',
];

const CONTENT = {
  meditations: [
    {
      question: `What is a detail about yourself you fixate on?`,
      placeholder: `Type a detail`,
      button: `Answer anonymously!`,
    },
    {
      question: `What is something you don't like about yourself or your work?`,
      placeholder: `Type a flaw`,
      button: `Answer anonymously!`,
    },
    {
      question: `How do you know? What makes you think that?`,
      placeholder: `Type how`,
      button: `Answer anonymously!`,
    },
    {
      question: `What is something you LIKE about yourself or your work?`,
      placeholder: `Type a flaw`,
      button: `Answer anonymously!`,
    },
    {
      question: `How do you know? What makes you think that?`,
      placeholder: `Type how`,
      button: `Answer anonymously!`,
    },
  ],
  gospel: {
    // passage: ``,
    passage: `You are a Where's Waldo painting.  A fractal explosion of uncountable elements–good, bad and neutral.  Don't kid yourself that you can make perfect sense of it.`,
    book: `Cowboy Jobe 1:19`,
    sermon: `
      That Can't be me
      Body
      Trombone
      Writing

      Wheres Waldo -- can't see everyone

      Cant see yourself, then

      We are humble about knowin the outside world.

      Yet we are convinced introspection is a different situation.
      When it comes to me, I can see the full picture.
      When it comes to me, I have unique and privileged access to all the data simultaneously.
      When it comes to me, 
      I am omnicient.  
      I all of the sudden have godlike superhuman capabilities of attention and deduction.

      And often, when it comes to me, I don't like what I see.  
      And because of my godlike powers of perception, I should know.
      Try to convince me otherwise.  But I know you're full of it, because I'll always know best what I am.

      But the truth is... YOU are a where's waldo paintin. A chaotic explosion of elements good bad and neutral.  Far too much for any eye to see at once–even yours.

      That false confidence, that we can see the full picture of ourselves and we can do so better than anyone else,
      that false confidence allows us to think the judgemental voice in our head is a default source of truth rather than just some other asshole with an opinion
      pardon my french

      You ever done the where's waldo side quests?  They say things like "find everyone with a blue hat."  Suppose you did that.  Suppose



      What are the chances that 10 different people looking at you see the same thing?
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


    function darkWallScene(num,caption,tele) {
      
      let looseCount = 0;
      Object.keys(directorState.groupClickies).map(key => {
        if(!directorState.groupClickies[key].triggered) { looseCount++ }
      });

      return {
        name: 'darkWall'+num,
        livestream: "hidden",
        teleprompter: tele,
        babyClass: "flight",
        backgroundChildren: (
          <React.Fragment>
            <VideoBg key='campfire' srcs={['quantum.mp4']}/>
          </React.Fragment>
        ),
        foregroundChildren: (
          <React.Fragment>
            <DarkWall participants={directorState.participants} participantId={directorState.participantId}/>
            <div className="layout-top-edge -no-pointer rainbow-text"><p>Many people clicking together will zap an atom.</p></div>
            <div className="layout-bottom-edge -no-pointer rainbow-text"><p>{looseCount} atoms loose</p></div>
          </React.Fragment>
        ),
      };
    }

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
      darkWallScene(0,'',''),
      // promptScene(0,'It’s Glubgo’s birthday! Wish him a happy birthday!','Type birthday greeting','Wish well!',false,false),
      // chaosScene(0,''),
      // chaosScene(1,''),
      // chaosScene(2,''),
      // chaosScene(3,''),
      // chaosScene(4,''),
      // chaosScene(5,'<?This crashed me last time?>'),
      // chaosScene(6,'<?Everybody click one zombie at the same time to cure them?>'),
      // chaosScene(7,'<?Click repeatedly to vote?>'),
      // chaosScene(8,'<?Click cake to frost?>'),
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
       

        {directorState.groupClickies && 
          <React.Fragment>

            {Object.keys(directorState.groupClickies).map((key,index) =>{
              return (<GroupClicky clicky={directorState.groupClickies[key]} key={key} activeParticipantCount={directorState.activeParticipantCount} clickyId={key} newParticipantEvent={newParticipantEvent} />)
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