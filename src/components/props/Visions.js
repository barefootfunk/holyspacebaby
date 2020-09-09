import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
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


export default class Visions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVisionRandom1: Math.random(),
      currentVisionRandom2: Math.random(),
    }

    this.spawn = this.spawn.bind(this);
  } 

  componentDidMount() {
    this.spawnInterval = setInterval(this.spawn, 20000); 
  }

  componentWillUnmount() {
    clearInterval(this.spawnInterval); 
  }

  spawn () {
    this.setState({
      currentVisionRandom1: Math.random(),
      currentVisionRandom2: Math.random(),
    })
  }

  render() {
    return (
      <StaticQuery
        query={visionsQuery}
        render = {
          data => {
            

            const visions = data.allMarkdownRemark.edges;

            // Select current visions
            const currentVisionNum1 = Math.floor(visions.length * this.state.currentVisionRandom1);
            const currentVisionNum2 = Math.floor(visions.length * this.state.currentVisionRandom2);

            const vision1 = visions[currentVisionNum1].node;
            const vision2 = visions[currentVisionNum2].node;

            // Get vision data
            const imageUrl1 = vision1.frontmatter.featuredimage;
            const imageUrl2 = vision2.frontmatter.featuredimage;

            const heartChoice1 = vision1.frontmatter.heartChoice;
            const mindChoice1 = vision1.frontmatter.mindChoice;
            const chaosChoice1 = vision1.frontmatter.chaosChoice;

            const heartChoice2 = vision2.frontmatter.heartChoice;
            const mindChoice2 = vision2.frontmatter.mindChoice;
            const chaosChoice2 = vision2.frontmatter.chaosChoice;

            const description1 = vision1.internal.content;
            const description2 = vision2.internal.content;
      
            return  (
              <React.Fragment>
                <Vision imageUrl={imageUrl1} description={description1} heartChoice={heartChoice1} mindChoice={mindChoice1} chaosChoice={chaosChoice1} key={`vision-${currentVisionNum1}`} />
                <Vision imageUrl={imageUrl2} description={description2} heartChoice={heartChoice2} mindChoice={mindChoice2} chaosChoice={chaosChoice2} key={`vision-${currentVisionNum2}`} />
              </React.Fragment>
            )
          }
        }
      />
    );
  }
}