import React, {  useState } from "react";
import useInfiniteScroll from "./hooks/useinfiniteScroll"; // Adjust the import path as needed
import './App.css'
function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  // Define the custom function to fetch data from the API
  const fetchData = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
    );
    const newData = await response.json();
    setItems([...items, ...newData]);
    setPage(page + 1);
  };

  // Call the useInfiniteScroll hook with your custom function and items state
  useInfiniteScroll(fetchData, items);

  return (
    <div className="App">
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.title}
          
          <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
