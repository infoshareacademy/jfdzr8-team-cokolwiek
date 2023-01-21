import styled from "styled-components";

const EmployeeButton = styled.button`
	font-size: 12px;
`;
export const ButtonEmployee = () => {
	return (
		<>
			<EmployeeButton>
				Pracownik 1<button>E</button>
				<button>D</button>
			</EmployeeButton>
			<EmployeeButton>
				Pracownik 2<button>E</button>
				<button>D</button>
			</EmployeeButton>
			<EmployeeButton>
				Pracownik 3<button>E</button>
				<button>D</button>
			</EmployeeButton>
			<EmployeeButton>
				Pracownik 4<button>E</button>
				<button>D</button>
			</EmployeeButton>
			<EmployeeButton>
				Pracownik 5<button>E</button>
				<button>D</button>
			</EmployeeButton>
		</>
	);
};
