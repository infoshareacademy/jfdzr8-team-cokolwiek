import styled from "styled-components";
import { ButtonEmployee } from './ButtonEmployee';

const EmployeesListBox = styled.div`
	width:200%;
    height:400px;
    display: grid;
	justify-content: center;
	grid-template-columns: 22% 22% 22% 22%;
	grid-template-rows: 15% 15% 15% 15% 15% 15%;
	grid-column-gap: 2%;
	grid-row-gap: 2%;
`;
export const BoxEmployeesList = () => {
	return (
		<>
            <EmployeesListBox>
                <ButtonEmployee/>
            </EmployeesListBox>
		</>
	);
};
