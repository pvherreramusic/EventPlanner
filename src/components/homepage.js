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
      <h2>HOW TO USE THE APP IF YOU ARE NEW</h2>
    <p>STEP ONE: SIGN UP or LOG IN</p>
    <p>STEP TWO MAKE A GROUP</p>
    <p>STEP THREE GO TO EXPLORE GROUPS AND JOIN YOUR SELECTED GROUP</p>
    <p>STEP FOUR MAKE AN EVENT</p>
    <p>STEP FIVE CHECK OUT YOUR EVENT and TELL OTHERS TO JOIN GROUPS and CHECK OUT THE EVENTS. YOU CAN COMMENT AND TALK TO EACH OTHER</p>

    <br>
    </br>
    <br></br>

    <h2>FOR THOSE WHO ARE NOT NEW</h2>
    <p>CHECK OUT NEW GROUPS AND JOIN GROUPS AND CHECK OUT THEIR EVENTS BY DIFFERENT USERS</p>

      <Image src='https://media.timeout.com/images/105347841/630/472/image.jpg' style={{ marginTop: '2em' }} />

    </Container>


  </div>
)

export default HomePage