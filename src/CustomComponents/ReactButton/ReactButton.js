import styled from "styled-components";
import PropTypes from 'prop-types';

const Button = styled.button`
  background: ${(props) => props.background};
  border-radius: ${(props) => props.borderRadius};
  border: ${(props) => props.border};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width:${(props) => props.width};
  height:${(props) => props.height};
  cursor: pointer;
  font-size:14px;
  font-family: "SF Pro Text",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-weight: 500;
  &:focus {
    outline: none;
  }
  &:hover {
    background: #FF6F1F;
  }
`;

Button.propTypes = {
    background: PropTypes.string,
    width: PropTypes.string,
    height:PropTypes.string,
    borderRadius: PropTypes.string,
    margin:PropTypes.string,
    padding:PropTypes.string,
    color:PropTypes.string,
    border:PropTypes.string,
}

Button.defaultProps = {
    background: '#FF6F1F',
    borderRadius:'10rem',
    border:'10px',
    color:'#ffffff',
    margin:'0',
    padding:'1rem',
    width:'300px',
    height:'3rem'
  };

export default Button;
