import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Vision from "./Vision.js"

export default class Visions extends React.Component {

  render() {
    return (
      <div>
        <h1>Here are the visions:</h1>
        <StaticQuery
          query={graphql`
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
          `}
          render = {
            data => (
              <div>
                {data.allMarkdownRemark.edges.map((edge) => {
                  const imageUrl = edge.node.frontmatter.featuredimage;
                  const description = edge.node.internal.content;

                  return (<Vision imageUrl={imageUrl} description={description} />);
                })}
              </div>
            )
          }
        />
      </div>
    );
  }
}