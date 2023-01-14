import './App.css';
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import SchemaNav from './components/SchemaNav';
import DBTable from './components/DBTable';

function App() {
  const [data, setData] = useState(null)

  const {tableName} = useParams()

  const fetchTable = () => {
    fetch(`http://localhost:6969/table/${tableName}`)
      .then((res) => res.json())
      .then((data) => {
  console.log('regen')
        setData(data)
      })
  }
  useEffect(() => {
    const interval = setInterval(fetchTable, 1000);
    return () => clearInterval(interval);
  }, [fetchTable]);

  if (!data) return <p>No data</p>

  return (
    <>
      <SchemaNav />
      <DBTable 
        columns={data.columns}
        rows={data.rows}
      />
      timestamp {data.timestamp}
      
    </>
  )
}

export default App;
