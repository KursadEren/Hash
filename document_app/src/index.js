import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { pdfjs } from 'react-pdf';
// Bu dosya node_modules/pdfjs-dist klasöründe var:
import pdfWorker from 'pdfjs-dist/pdf.worker.min.mjs';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
