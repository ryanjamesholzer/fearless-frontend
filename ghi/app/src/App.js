import React from 'react';
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendeeSignUpForm from './AttendeeSignUpForm';

function App(props) {
  return (
    <React.Fragment>
      <Nav />
      <div className="container">
        <AttendeeSignUpForm/>
        {/*<ConferenceForm/> */}
        {/* < LocationForm /> */}
        {/*<AttendeesList attendees={props.attendees}/>*/}
      </div>
    </React.Fragment>
  );
}

export default App;
