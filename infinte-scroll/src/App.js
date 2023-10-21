import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const handelInfiniteScroll = async () => {
    
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`)
      .then((response) => response.json())
      .then((res) => {
        setData([...data, ...res]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [page]);

  return (
    <div className="App">
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            {post.title.substr(0,150)}
            <p>{post.body.substr(0,15)}</p>
          </li>
        ))}
      </ul>
      <h1>{loading}</h1>
    </div>
  );
}

export default App;
