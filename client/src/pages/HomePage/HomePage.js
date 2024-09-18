import React from 'react';
import { useEffect, useState } from 'react';

//components
import ContentForm from '../../components/ContentForm';

//import styles from './Home.module.css';
//import RandomDuck from '../../components/RandomDuck/RandomDuck';


const Home = () => {
  const [contents, setContent] = useState(null)

  useEffect(() => {
    const fetchContent = async () => {
      const response = await fetch('/api/content')
      const json = await response.json()

      if(response.ok){
        setContent(json)
      }
    }

    fetchContent()
  }, [])

  return (
    <div className="home">
      <div className='contents'>
        {contents && contents.map((contents) => (
          <p key={contents._id}>{contents.name}</p>
        ))}
      </div>
      <ContentForm/>
    </div>
  );
};


  //<div className={styles.home}>
    //  <h1 className={styles.headline}>Duck It</h1>
      //<RandomDuck />
    //</div>
export default Home;
