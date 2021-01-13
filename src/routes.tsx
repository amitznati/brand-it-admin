import * as React from "react";
import {Route} from "react-router-dom";
import Configuration from "./configuration/Configuration";
import FlowSimulatorStepper from "./simulator/FlowSimulatorStepper";

export default [
    <Route key="configuration" exact path="/configuration" render={() => <Configuration />} />,
    <Route key="simulator" exact path="/simulator" render={() => <FlowSimulatorStepper />} />
];
