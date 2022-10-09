import React from 'react'
import { useParams } from 'react-router-dom';


export default function TopPanelCollectionSelector() {
    const {collectionID}=useParams();
  return (
    <span> {collectionID}</span>
  )
}
