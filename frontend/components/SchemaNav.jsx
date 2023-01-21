import { useState, useEffect } from 'react';
import styles from './SchemaNav.module.css';

export default function SchemaNav(){
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:6969/schema`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  const [searchInput, setSearchInput] = useState("");
  if (!data)
    return <p>loading nav...</p>

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  let tables = data.tables;
  
  if (searchInput.length > 0) {
      tables = tables.filter((tableName) => {
        return tableName.match(searchInput);
      });
  }
  
  let tableLinks = tables.map(tableName =>
    <div>
      <a 
        href={`/table/${tableName}`} 
        key={tableName}
        className={styles.tableLink}
      >
        {tableName}
      </a>
      <br />
    </div>
  );
  
  return <>
    <input
      type="text"
      placeholder="Search tables"
      onChange={handleChange}
      value={searchInput}
    />
    <nav> {tableLinks} </nav>
  </>
}