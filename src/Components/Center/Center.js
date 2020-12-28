import React from 'react'
import {styled} from '@material-ui/styles'

const StyledDiv = styled('div')({
    display:'flex',
    justifyContent:'center'
})
function Center(props) {
    return (
        <StyledDiv className="center">
            {props.children}
        </StyledDiv>
    )
}

export default Center
