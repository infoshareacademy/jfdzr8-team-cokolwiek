import styled from "styled-components";

const ButtonLocationStyle = styled.button`
	width: 90%;
	margin-bottom: 10px;
`;

export const ButtonLocation = () => {
	return (
		<>
			<ButtonLocationStyle>Sklep 1</ButtonLocationStyle>
			<ButtonLocationStyle>Sklep 2</ButtonLocationStyle>
			<ButtonLocationStyle>Sklep 3</ButtonLocationStyle>
			<ButtonLocationStyle>Sklep 4</ButtonLocationStyle>
			<ButtonLocationStyle>Sklep 5</ButtonLocationStyle>
		</>
	);
};
