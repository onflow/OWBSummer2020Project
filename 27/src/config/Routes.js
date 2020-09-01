import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import * as pages from '~/pages';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={pages.Landing} />
        <Route exact path="/users/:addr/certificates" component={pages.Certificates} />
        <Route exact path="/certificates/create" component={pages.CreateCertificate} />
        <Route exact path="/certificates/:certificateId" component={pages.Certificate} />
        <Route exact path="/certificates/:certificateId/transfer" component={pages.TransferCertificate} />
        <Route component={pages.NotFound} />
      </Switch>
    </Router>
  );
}
