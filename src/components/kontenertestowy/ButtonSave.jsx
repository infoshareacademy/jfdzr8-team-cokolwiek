import styled from "styled-components";

const SaveButton = styled.button`
	position: relative;
    top: 2rem;
    left: 40rem;
    width: 46%;
`;

export const ButtonSave = () => {
    return (
        <SaveButton>Zapisz</SaveButton>
    )
}