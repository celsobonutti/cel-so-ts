import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Home } from 'react-feather';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

interface Post {
  frontmatter: {
    title: string;
    description: string;
    date: string;
    body: string;
  };
  excerpt: string;
  body: string;
  fields: {
    slug: string;
  };
}

interface Props {
  location: Location;
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    mdx: Post;
  };
  pageContext: {
    previous: Post;
    next: Post;
  };
}

const BlogPostTemplate = ({ data, pageContext }: Props) => {
  const post = data.mdx;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <GoHome to="/">
        <Home />
        <span>GO HOME, YOU'RE DRUNK</span>
      </GoHome>
      <h1>{post.frontmatter.title}</h1>
      <Date>{post.frontmatter.date}</Date>
      <MDXRenderer>{post.body}</MDXRenderer>
      <Hairline />
      <Navigation>
        <li>
          {previous && (
            <Link to={`${previous.fields.slug}`} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={`${next.fields.slug}`} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </Navigation>
    </Layout>
  );
};

const GoHome = styled(Link)`
  display: flex;
  align-items: center;
  margin: 0.25rem 0 1rem;

  > span {
    margin-left: 0.25rem;
  }
`;

const Date = styled.small`
  display: block;
  margin-bottom: ${rhythm(1)};
  margin-top: ${rhythm(-1)};
`;

const Navigation = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

const Hairline = styled.hr`
  margin-bottom: ${rhythm(1)};
  border-top: 1px solid ${props => props.theme.colors.text};
`;

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
