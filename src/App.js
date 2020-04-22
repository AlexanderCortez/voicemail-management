import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import VoiceMailMessages from './components/VoiceMailMessages/VoiceMailContainer';
import VoiceMailBoxes from './components/VoiceMailBoxes/VoiceMailBoxContainer';

const NotFound = () => <h1>Route Not Found</h1>;

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={VoiceMailBoxes} />
      <Route path="/vmboxes/:vmBoxId/messages" component={VoiceMailMessages} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
