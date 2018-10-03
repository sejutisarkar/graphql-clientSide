import React from 'react';
import {Form,Message,Input, Container, Header, Button} from 'semantic-ui-react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class createTeam extends React.Component{
    state = {
      teamname:'',
      nameError:'',
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
      nameError:'',
    });
    const {teamname} = this.state;
    console.log(teamname);
    console.log(this.state);
    const response = await this.props.mutate({
      variables: {teamname},
    });
    const {ok, errors} = response.data.Login
    if(ok){
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
    const{teamname, nameError} = this.state;
    const errorList = [];
    if(nameError){
      errorList.push(nameError);
    }

    return(
      <Container text>
        <Header as="h2">Login</Header>
        <Form>
        <Form.Field error={!!nameError}>
        <Input
        name="teamname"
        onChange={this.onChange}
        value={teamname}
        placeholder="Team Name"
        fluid />
        </Form.Field>
        <Button onClick={this.onSubmit}>Create Team</Button>
        {(nameError) ? (<Message error header="There was errors with your submisson" list={errorList} />): null}
        </Form>
      </Container>
    )
  }
}
const createTeamMutation = gql`
mutation($name: String!){
  createTeam(name:$name){
    ok
    errors{
      path
      message
    }
  }
}`;


export default graphql(createTeamMutation)(createTeam);
