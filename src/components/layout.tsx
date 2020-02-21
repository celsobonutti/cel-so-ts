import React, { ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { ThemeManagerContext } from 'gatsby-styled-components-dark-mode';
import { Moon, Sun } from 'react-feather';

import Bio from './bio';
import { device } from '../utils/layout';
import { rhythm } from '../utils/typography';

interface Props {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

interface WrapperProps {
  hasHeader: Boolean;
}

const Layout = ({ children, title, subtitle }: Props) => {
  const themeContext = useContext(ThemeManagerContext);

  return (
    <Wrapper hasHeader={!!title}>
      <Toggler onClick={() => themeContext.toggleDark()}>
        {themeContext.isDark ? <Sun /> : <Moon />}
      </Toggler>
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
        <span>
          © {new Date().getFullYear()}, Built with
          {` `}
        </span>
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div<WrapperProps>`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};

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

  transition: color .2s ease-in-out;
  transition: background-color .2s ease-in-out;

  * {
    transition: color .2s ease-in-out;
    transition: background-color .2s ease-in-out;
  }

  h1, h2, h4, h5, h6 {
    color: ${props => props.theme.colors.headline}
  }

  p, span, small {
    color: ${props => props.theme.colors.text}
  }

  a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;

    * {
      color: parent;
    }
  }
`;

const Toggler = styled.div`
  color: ${props => props.theme.colors.secondary};
  position: fixed;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
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
  border-top: 3px double ${props => props.theme.colors.primary};

  @media ${device.laptop} {
    margin: 1rem 0;
    border-top: none;
    border-right: 3px double ${props => props.theme.colors.primary};
  }
  grid-area: info;
`;

const Content = styled.div`
  padding: 2rem;
  grid-area: content;
`;

const Footer = styled.footer`
  margin: 0 1rem;
  border-top: 1px solid ${props => props.theme.colors.primary};
  max-height: 100px;
  text-align: center;
  padding: 24px;
  grid-area: footer;
`;

export default Layout;
