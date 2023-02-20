import styled from "styled-components"

export default function Footer() {

    return (
        <StyledFooter>
            <h3>Footer of the APP</h3>
        </StyledFooter>
    )
}

const StyledFooter = styled.footer`
    padding: 1rem;
    background-color: cyan;
    color: goldenrod;
    display: flex;
    align-items: center;
    justify-content: center;
`