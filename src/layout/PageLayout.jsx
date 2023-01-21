import styled from 'styled-components'
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
	height: 100%;
`
const LayoutFooter = styled.div`
position: absolute;
top: 0;
`;

const LayoutMenu = styled.div`
 width: 250px;
 height: 100%;
 position: absolute;
 left: 0;
`;

export const PageLayout = ({ header, footer, children, menu = null }) => (
  <LayoutRoot>
    <LayoutHeader>{header}</LayoutHeader>
    <LayoutContent>
      {menu && <LayoutMenu>{menu}</LayoutMenu>}
      {children}
    </LayoutContent>
    <LayoutFooter>{footer}</LayoutFooter>
  </LayoutRoot>
);
