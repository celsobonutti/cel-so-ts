import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { colors, shadows } from '../utils/theme';
import { rhythm } from '../utils/typography';

interface Props {
  post: {
    frontmatter: {
      title: string;
      date: string;
      description: string;
    };
    fields: {
      slug: string;
    };
    excerpt: string;
  };
}

const PostCard = ({ post: { frontmatter, excerpt, fields } }: Props) => {
  const title = frontmatter.title || fields.slug;
  return (
    <Wrapper>
      <Title>
        <Link style={{ boxShadow: `none` }} to={`${fields.slug}`}>
          {title}
        </Link>
      </Title>
      <small>{frontmatter.date}</small>
      <p
        dangerouslySetInnerHTML={{
          __html: frontmatter.description || excerpt,
        }}
      />
    </Wrapper>
  );
};

const Title = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};

  a {
    font-weight: 500;
  }
`;

const Wrapper = styled.div`
  background-color: ${colors.background};
  box-shadow: ${shadows.dark};
  padding: 1rem;
  border-radius: 6px;
`;

export default PostCard;
