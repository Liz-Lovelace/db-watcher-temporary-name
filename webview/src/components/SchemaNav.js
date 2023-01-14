import { useState, useEffect } from 'react'

export default function SchemaNav(){
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:6969/schema`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  if (!data)
    return <p>loading nav...</p>
  
  let tableLinks = data.tables.map(tableName =>
    <a href={`/table/${tableName}`} key={tableName}>
      {tableName}
    </a>
  );
  
  return <nav> {tableLinks} </nav>
}