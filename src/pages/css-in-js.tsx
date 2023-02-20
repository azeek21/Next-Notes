import styled from "styled-components"

export default function CssInJs() {

    return (
        <>
            <h1 style={{color: 'red'}} >This is styled inline using css in js</h1>
            <StyledTitle>I am this way cus I am styled with Styled components with theme provider.</StyledTitle>
        </>
    )
    
}

const StyledTitle = styled.h1`
    color: ${({theme}) => theme.colors.secondary};
    font-style: italic;
`