import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MainPage } from './MainPage';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Signin } from './Signin';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Appointment } from './Appointment';
import { AppointmentForm } from './AppointmentForm';
import { Doctor } from './Doctor';
import { Patient } from './Patient';

export const App = () => {
  return (
    <div>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/appointments' element={<Appointment/>} />
        <Route path='/appointment/:id' element={<AppointmentForm/>} />
        <Route path='/doctor' element={<Doctor/>} />
        <Route path='/patient' element={<Patient/>} />
      </Routes>
    </Router>
    <Footer />
    </div>
  );
}

