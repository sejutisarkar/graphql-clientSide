import React from 'react';
import {Form,Message,Input, Container, Header, Button} from 'semantic-ui-react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class Login extends React.Component{
    state = {
      email: '',
      password: '',
      emailError:'',
      passwordError:'',
    }
  // }

  onChange=(e)=>{
    const {name,value} = e.target;
    this.setState({
      [name]:value

    })
  }
  onSubmit = async () =>{
    this.setState({
      emailError:'',
      passwordError:'',
    });
    const {email,password} = this.state;
    console.log(email)
    console.log(this.state);
    const response = await this.props.mutate({
      variables: {email, password},
    });
    const {ok, errors,token, refreshToken} = response.data.Login
    if(ok){
      localStorage.setItem('token',response.data.Login.token);
      localStorage.setItem('refreshToken',response.data.Login.refreshToken);
      this.props.history.push('/');
    }else{
      const err = {};
      errors.forEach(({path,message}) => {
        err[`${path}Error`] = message;
      });
      console.log(err);
      this.setState(err);
    }
    // console.log(response);
  }
  render(){
    const{email,password,emailError,passwordError} = this.state;
    const errorList = [];
    if(emailError){
      errorList.push(emailError);
    }
    if(passwordError){
      errorList.push(passwordError);
    }

    return(
      <Container text>
        <Header as="h2">Login</Header>
        <Form>
        <Form.Field error={!!emailError}>
        <Input
        name="email"
        onChange={this.onChange}
        value={email}
        placeholder="Email"
        fluid />
        </Form.Field>
        <Form.Field>
        <Input
          error={!!passwordError}
          name="password"
          onChange={this.onChange}
          value={password}
          type="password"
          placeholder="Password"
          fluid
        />
        </Form.Field>
        <Button onClick={this.onSubmit}>Login</Button>
        {(emailError || passwordError) ? (<Message error header="There was errors with your submisson" list={errorList} />): null}
        </Form>
      </Container>
    )
  }
}
const loginMutation = gql`
mutation($email:String!,$password:String!){
  Login(email:$email,password:$password){
    ok
    token
    refreshToken
    errors{
      path
      message
    }
  }
}`;


export default graphql(loginMutation)(Login);
