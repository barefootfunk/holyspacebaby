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
    this.spawnInterval = setInterval(this.spawn, 15000); 
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
            const description1 = vision1.internal.content;
            const imageUrl2 = vision2.frontmatter.featuredimage;
            const description2 = vision2.internal.content;
      
            return  (
              <React.Fragment>
                <Vision imageUrl={imageUrl1} description={description1} key={`vision-${currentVisionNum1}`} />
                <Vision imageUrl={imageUrl2} description={description2} key={`vision-${currentVisionNum2}`} />
              </React.Fragment>
            )
          }
        }
      />
    );
  }
}