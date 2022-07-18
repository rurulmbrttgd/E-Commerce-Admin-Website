import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 221, 183, 0.5),
    rgba(255, 221, 183, 0.5)
    ),
    url("https://res.cloudinary.com/dxzvh2xex/image/upload/v1657729318/privateroom_pugvkn.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #ffecc7;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  color: #000000eb;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  color: #59302D;
`;

const Button = styled.button`
  width: 40%;
  position: relative;
  text-align: center;
  border: none;
  padding: 15px 20px;
  position: relative;
  left: 30%;
  background-color: #5a2107;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  justify-content: center;
  &:disabled{
    color:green;
    cursor: not-allowed;
  }
  
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  color: #59302D;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching, error } = useSelector((state)=> state.user);
console.log(error)
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <Container>
      <Wrapper>
        <Title> ADMIN SIGN IN</Title>
        <Form>
          <Input placeholder="username" 
          
                onChange={(e)=>setUsername(e.target.value)}
                />
          <Input placeholder="password" 
          type="password"
          onChange={(e)=>setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
          {error && <Error>Something went wrong...</Error>}
        </Form>
      </Wrapper>
    </Container>

  );
};

export default Login;