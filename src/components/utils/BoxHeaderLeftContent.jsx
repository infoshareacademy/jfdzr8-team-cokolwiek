import styled from "styled-components";

const BoxHeaderLeftContentStyle = styled.div`
	border-bottom: 2px solid;
	width: 90%;
`;
export const BoxHeaderLeftContent = () => {
	return (
		<BoxHeaderLeftContentStyle>
			<h3>Twój sklep</h3>
			<h3></h3>
		</BoxHeaderLeftContentStyle>
	);
};
