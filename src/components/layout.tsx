import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Bio from './bio';
import { device } from '../utils/layout';
import { rhythm } from '../utils/typography';
import { colors } from '../utils/theme';

interface Props {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

interface WrapperProps {
  hasHeader: Boolean;
}

const Layout = ({ children, title, subtitle }: Props) => {
  return (
    <Wrapper hasHeader={!!title}>
      {title && (
        <Header>
          <h1>{title}</h1>
          <h4>{subtitle}</h4>
        </Header>
      )}
      <Content>{children}</Content>
      <Info>
        <Bio />
      </Info>
      <Footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div<WrapperProps>`
  min-height: 100vh;
  background-color: ${colors.background};

  display: grid;

  grid-template-areas:
    ${props => props.hasHeader && `'header'`}
    'content'
    'info'
    'footer';
  grid-template-columns: 1fr;
  grid-template-rows: ${props => props.hasHeader && '100px'} 1fr auto 100px;

  @media ${device.laptop} {
    grid-template-areas:
      'info ${props => (props.hasHeader ? 'header' : 'content')}'
      'info content'
      'info footer';

    grid-template-columns: 300px 1fr;

    grid-template-rows: 150px 1fr 100px;
  }

  a {
    color: ${colors.secondary};
    text-decoration: none;

    * {
      color: parent;
    }
  }
`;

const Header = styled.div`
  padding: 2rem;
  grid-area: header;

  h1 {
    margin-bottom: ${rhythm(1 / 4)};
  }
`;

const Info = styled.div`
  margin: 1rem 1rem;
  padding: 1rem;
  border-top: 3px double ${colors.primary};

  @media ${device.laptop} {
    margin: 1rem 0;
    border-top: none;
    border-right: 3px double ${colors.primary};
  }
  grid-area: info;
`;

const Content = styled.div`
  padding: 2rem;
  grid-area: content;
`;

const Footer = styled.footer`
  margin: 0 1rem;
  border-top: 1px solid ${colors.primary};
  max-height: 100px;
  text-align: center;
  padding: 24px;
  grid-area: footer;
`;

export default Layout;
