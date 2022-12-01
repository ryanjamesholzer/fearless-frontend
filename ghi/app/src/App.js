import React from 'react';
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import MainPage from './MainPage';
import AttendeeSignUpForm from './AttendeeSignUpForm';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PresentationForm from './PresentationForm';
/*import { Routes, Route } from 'react-dom';*/

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="" index element={<MainPage/>}/>
          <Route path="attendees">
            <Route path="new" element={<AttendeeSignUpForm/>} />
           </Route>
           <Route path="conferences">
            <Route path="new" element={<ConferenceForm/>} />
          </Route>
          <Route path="locations">
            <Route path="new" element={<LocationForm/>}/>
          </Route>
          <Route path="presentations">
            <Route path="new" element={<PresentationForm/>}/>
          </Route>
          <Route path="attendees">
            <Route path="list" element={<AttendeesList attendees={props.attendees}/>} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
