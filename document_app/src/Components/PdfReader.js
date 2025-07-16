import React,{useState} from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
export default function PdfReader({files}) {
  const [numPages, setNumPages] = useState(0);
  const [readFiles, setReadFiles] = useState(files)

  console.log(readFiles);
}


  

