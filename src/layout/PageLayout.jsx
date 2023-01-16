import styled from 'styled-components'
const LayoutRoot = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
 
`
const LayoutHeader = styled.div`
 
`
const LayoutContent = styled.div`
 
`
const LayoutFooter = styled.div`
 
`;

export const PageLayout = ({ header, footer, children }) => (
  <LayoutRoot>
    <LayoutHeader>{header}</LayoutHeader>
    <LayoutContent>{children}</LayoutContent>
    <LayoutFooter>{footer}</LayoutFooter>
  </LayoutRoot>
);
