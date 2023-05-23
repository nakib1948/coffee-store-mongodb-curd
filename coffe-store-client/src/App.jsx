import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useLoaderData } from 'react-router-dom';
import CoffeeCard from './components/CoffeeCard';

function App() {

  const coffee=useLoaderData();


  return (
    <div className='m-20'>
      
      <h1>{coffee.length}</h1>
      <div className='grid md:grid-cols-2 gap-4'>
      {
        coffee.map(coffee=> 
          <CoffeeCard key={coffee._id} coffee={coffee}>

          </CoffeeCard>
          )
      }
      </div>
     
    </div>
  )
}

export default App
