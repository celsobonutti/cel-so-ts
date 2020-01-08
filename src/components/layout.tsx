import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Sidebar from './sidebar';
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
      <Header>
        <h1>{title}</h1>
        <h4>{subtitle}</h4>
      </Header>
      <Aside>
        <Sidebar />
      </Aside>
      <Content>{children}</Content>
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
    'sidebar ${props => (props.hasHeader ? 'header' : 'content')}'
    'sidebar content'
    'sidebar footer';

  grid-template-columns: 300px 1fr;

  grid-template-rows: 100px 1fr 100px;
`;

const Header = styled.div`
  padding: 2rem;
  grid-area: header;

  h1 {
    margin-bottom: ${rhythm(1 / 4)};
  }
`;

const Aside = styled.aside`
  margin: 1rem 0;
  padding: 2rem;
  border-right: 3px double ${colors.primary};
  grid-area: sidebar;
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
