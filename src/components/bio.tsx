import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Linkedin, Twitter, Mail, GitHub } from 'react-feather';

import { rhythm } from '../utils/typography';

export default () => {
  const data = useStaticQuery(bioQuery);
  const { author, social } = data.site.siteMetadata;

  return (
    <Wrapper>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          margin: rhythm(1 / 2),
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `100%`,
        }}
      />
      <Social>
        <li>
          <a target="_blank" href={`https://github.com/${social.github}`}>
            <GitHub />
          </a>
        </li>
        <li>
          <a target="_blank" href={`https://twitter.com/${social.twitter}`}>
            <Twitter />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href={`https://linkedin.com/in/${social.linkedin}`}
          >
            <Linkedin />
          </a>
        </li>
        <li>
          <a target="_blank" href={`mailto:${social.email}`}>
            <Mail />
          </a>
        </li>
      </Social>
      <Text>
        Hey, I'm Celso! I'm a developer from Salvador, Bahia. I created this
        blog so I can talk about random stuff I like, study or like and study.
        <br />I <strong>love</strong> memes btw.
      </Text>
    </Wrapper>
  );
};

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/euzin.jpg/" }) {
      childImageSharp {
        fixed(width: 100, height: 100, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
          linkedin
          email
          github
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.span`
  max-width: 300px;
  text-align: left;
  color: ${props => props.theme.colors.text};
`;

const Social = styled.ul`
  list-style: none;
  margin: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  a {
    margin: .5rem;
  }
`;
