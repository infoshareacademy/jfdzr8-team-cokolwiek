import styled from 'styled-components'
const LayoutRoot = styled.div`
 display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`
const LayoutHeader = styled.div`
 border-bottom: solid 2px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`
const LayoutContent = styled.div`
 display: flex;
	justify-content: center;
	height: 100%;
`
const LayoutFooter = styled.div`
 position: absolute;
	bottom: 0;
	border-top: solid 2px;
	width: 100%;
`;

const LayoutMenu = styled.div`
 width: 300px;
 float: left;
 background: black;
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
