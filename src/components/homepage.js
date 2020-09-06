import React from 'react'
import {
  Container,
  Header,
  Image,
 
} from 'semantic-ui-react'

const HomePage = () => (
  <div>
    

    <Container text style={{ marginTop: '7em' }}>
      <Header as='h1'>EVENT PLANNNER</Header>
      <p>THANK YOU FOR USING THIS APP TO PLAN A EVENT WITH YOUR GROUP</p>
      <p>
       LETS PARTY!
      </p>
      <h2>HOW TO USE THE APP</h2>
      <p>GO TO CREATE GROUP FIRST AFTER YOU SIGN IN OR REGISTER </p>
      <p> THEN AFTER, CREATE A EVENT</p>
      <p>THEN, GO TO YOUR GROUP PAGE</p>

      <Image src='https://media.timeout.com/images/105347841/630/472/image.jpg' style={{ marginTop: '2em' }} />

    </Container>


  </div>
)

export default HomePage