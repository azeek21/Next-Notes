import styled from "styled-components"

export default function Header() {

    return (
        <StyledHeader>
            <h3>This is a header for my APP</h3>
        </StyledHeader>
    )
}

const StyledHeader = styled.header`
    padding: 1rem;
    background-color: cyan;
    color: goldenrod;
    display: flex;
    align-items: center;
    justify-content: center;
`