import React from "react";
import { Route, Routes } from "react-router-dom";
import TodoView from "./containers/TodoView";
import CalendarView from "./containers/CalenderView";

const BaseRouter = () => (
    <div>
        <Routes>
            <Route exact path='/' element={<TodoView/>} />
            <Route path='/calendar' element={<CalendarView/>} />
        </Routes>
    </div>
);

export default BaseRouter;