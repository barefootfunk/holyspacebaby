import React, {useState, useEffect} from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Vision from "./Vision.js"

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

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Visions = () => {

  const data = useStaticQuery(visionsQuery);
  let visionsData = data.allMarkdownRemark.edges;
  // visionsData = shuffle(visionsData);

  const [activeVisionPairs,setActiveVisionPairs] = useState(0);

  const renderVision = (id,dir) => {
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
      key={`vision-${id}`} 
    />;
  }

  // Activate a new pair of visions every few seconds until we run out
  useEffect(() => {
    let i=0;
    const interval = setInterval(() => {
      if(i*2<=visionsData.length) {
        setActiveVisionPairs(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const visionIdsToRender = Array.from(Array(activeVisionPairs*2).keys()); // Generates sequential array [1,2,...,n]
  
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
          return renderVision(id,dir);
        })
      }

    </React.Fragment>
  );
}

export default Visions;