import React from 'react';
import {Form ,Message,Input, Container, Header, Button} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
class Register extends React.Component {
  state={
    username:'',
    email:'',
    password:'',
    usernameError:'',
    emailError:'',
    passwordError:'',
  };
  onChange = e => {
    const { name,value} = e.target;
    this.setState({
      [name]:value
    });
  }
  onSubmit = async () =>{
    this.setState({
      usernameError:'',
      emailError:'',
      passwordError:''
    })
    // console.log(this.state);
    const {username, email, password} = this.state;
    const response = await this.props.mutate({
      variables: this.state,
    });
    const {ok, errors} = response.data.Register;
    if(ok){
      this.props.history.push('/')
    }else{
      const err = {};
      errors.forEach(({path,message}) => {
        err[`${path}Error`] = message;
      });
      console.log(err);
      this.setState(err);
    }
    console.log(response);
  };
  render(){
    const {username,email,password,usernameError,emailError,passwordError} = this.state;
    const errorList = [];
    if(usernameError){
      errorList.push(usernameError);
    }
    if(emailError){
      errorList.push(emailError);
    }
    if(passwordError){
      errorList.push(passwordError);
    }
    return(
      <Container text>
        <Header as="h2">Register</Header>
        <Form>
        <Form.Field>
        <Input
          error={!!usernameError}
          name="username"
          onChange={this.onChange}
          value={username}
          placeholder="Username"
          fluid
        />
        </Form.Field>
        <Form.Field>
        <Input error={!!emailError}name="email" onChange={this.onChange} value={email} placeholder="Email" fluid />
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
        <Button onClick={this.onSubmit}>Submit</Button>
        {
          (usernameError || emailError ||passwordError) ? (<Message error header="There was some errors with your submission" list={errorList} />)
        : null}
        </Form>
      </Container>
    )
  }
}
const registerMutation = gql`
  mutation($username:String!,$email:String!,$password:String!){
    Register(username: $username,email: $email,password: $password){
      ok
      errors{
        path
        message
      }
    }
  }
`;
export default graphql(registerMutation)(Register);
