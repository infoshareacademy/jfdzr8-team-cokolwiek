import styled from 'styled-components'
import { StateContainer } from '../components/StateContainer'

const LayoutRoot = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const LayoutHeader = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`
const LayoutContent = styled.div`
 display: flex;
 flex-direction: column;
	height: 100%;
`
const LayoutFooter = styled.div`
position: absolute;
top: 0;
`;

const LayoutMenu = styled.div`
 min-width: 250px;
 max-width: 300px;
 width: 25vw;
 height: 100vh;
 position: absolute;
 left: 0;
 top: 0;
`;

export const PageLayout = ({ header, footer, children, menu }) => (
  <LayoutRoot>
    <LayoutHeader>{header}</LayoutHeader>
    <LayoutContent>
      <StateContainer>
      {menu && <LayoutMenu>{menu}</LayoutMenu>}
      {children}
      </StateContainer>
    </LayoutContent>
    <LayoutFooter>{footer}</LayoutFooter>
  </LayoutRoot>
);
