import styled from 'styled-components';

const Wrap = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
border-radius: 5px;
background: #fff;
width: 400px;
height: 400px;
text-align: center;
box-align: 0 0 10px rgba(darken(#24c7f9, 15%), 0.5);
div{
    margin: 20px;
}
`;

const Title = styled.h1`
padding: 0;
margin: 0;
font-size: 40px;
line-height: 1;
`;

const Button = styled.button`
width: 50px;
height: 50px;
position: relative;
margin: 0 10px;
cursor: pointer;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
0 1px 2px rgba(0, 0, 0, 0.24);
border-radius: 5px;
outline: none;
border: 0;
color: #111;
font-size: 20px;
&:active {
    transform: translateY(2px);
    transition: transform 100ms ease-out;
}
`;

const Input = styled.input`
height: 50px;
font-size: 20px;
border-radius: 5px;
border: 1px solid #ddd;
padding:  0 20px ;
`
export { Wrap, Title, Button, Input }