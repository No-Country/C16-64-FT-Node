import React, { useState } from 'react';
import './Index.scss';
import Tabs from './Tabs';
import Ingreso from './Ingreso';

export default function FormDashboard() {
  return (
    <div className="form-container">
      <Ingreso />
    </div>
  );
}