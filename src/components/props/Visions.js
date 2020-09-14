import React, {useState, useEffect} from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Vision from "./Vision"

const visionsQuery = graphql`
  query VisionsQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            featuredimage
            heartChoice
            mindChoice
            chaosChoice
          }
          internal {
            content
          }
        }
      }
    }
  }
`

// /**
//  * Shuffles array in place. ES6 version
//  * @param {Array} a items An array containing the items.
//  * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
//  */
// function shuffle(a) {
//   for (let i = a.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [a[i], a[j]] = [a[j], a[i]];
//   }
//   return a;
// }

const Visions = () => {

  const data = useStaticQuery(visionsQuery);
  let visionsData = data.allMarkdownRemark.edges;

  const [activeVisionPairs,setActiveVisionPairs] = useState({pairs: 0, round: 0});

  const renderVision = (id,dir,round) => {
    // Get vision data
    const visionData = visionsData[id].node;
    const content = { 
      imageUrl: visionData.frontmatter.featuredimage,
      description: visionData.internal.content,
      heartChoice: visionData.frontmatter.heartChoice,
      mindChoice: visionData.frontmatter.mindChoice,
      chaosChoice: visionData.frontmatter.chaosChoice,
    }

    // Return vision
    return <Vision 
      content={content}
      dir={dir} 
      key={`vision-${id}-${round}`} 
    />;
  }

  // Activate a new pair of visions every few seconds until we run out
  useEffect(() => {
    let pairs=1;
    let round=0;
    setActiveVisionPairs({pairs: pairs, round: round});
    const interval = setInterval(() => {
      pairs++;

      if(pairs*2<=visionsData.length){
        setActiveVisionPairs({pairs: pairs, round: round});
      } else {
        pairs=1;
        round++;
        setActiveVisionPairs({pairs: pairs, round: round});
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const visionIdsToRender = Array.from(Array(activeVisionPairs.pairs*2).keys()); // Generates sequential array [1,2,...,n]
  
  // Pairs will launch in opposite diagonals
  const dirs = [
    [1,1],
    [-1,-1],

    [-1,1],
    [1,-1],
  ]
  return (
    <React.Fragment>
      {
        visionIdsToRender.map((id,index) => {
          const dir = dirs[(index % dirs.length)];
          return renderVision(id,dir,activeVisionPairs.round);
        })
      }

    </React.Fragment>
  );
}

export default Visions;