import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostCard from '../components/post-card';

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
      };
    };
    allMdx: {
      edges: [any]
    }
  };
}

const Blog = ({ data }: Props) => {
  const siteTitle = data.site.siteMetadata.title;
  const description = data.site.siteMetadata.description;
  const posts = data.allMdx.edges;

  return (
    <Layout title={siteTitle} subtitle={description}>
      <SEO title="Homepage" />
      <PostContainer>
        {posts.map(({ node }) => (
          <PostCard post={node} key={node.fields.slug} />
        ))}
      </PostContainer>
    </Layout>
  );
};

const PostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto;
  grid-gap: 1rem;
`;

export default Blog;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
