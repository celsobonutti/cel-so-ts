import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { ArrowRight } from 'react-feather';

import { rhythm } from '../utils/typography';
import { shadows } from '../theme';

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
      <Link to={`${fields.slug}`}>
        <Container>
          <Content>
            <Title>{title}</Title>
            <small>{frontmatter.date}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: frontmatter.description || excerpt,
              }}
            />
          </Content>
          <Actions>
            <span>READ ARTICLE</span>
            <ArrowRight />
          </Actions>
        </Container>
      </Link>
    </Wrapper>
  );
};

const Title = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
  font-weight: 700;
  color: ${props => props.theme.colors.secondary} !important;
`;

const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  > h3: {
    color: ${props => props.theme.colors.headline};
  }

  div {
    padding: 1rem 0 1rem;
  }

  color: ${props => props.theme.colors.text};
  border-radius: 6px;
`;

const Wrapper = styled.div`
  ${shadows.one}
  border-radius: 6px;
`;

const Content = styled.div``;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${props => props.theme.colors.primary};
`;

export default PostCard;
