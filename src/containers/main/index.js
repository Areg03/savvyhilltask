import { Fragment, useEffect, useState } from "react";
import MainItem from "../../components/mainItem";
import axios from "axios";
import { baseUrl } from "../../store/key";

const Main = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [mainInterval, setMainInterval] = useState(null)
    useEffect(() => {
        
        const interval = setInterval(() => {
          setRefresh((prev) => prev + 1);
        }, 62000);
        setMainInterval(interval)
        return () => {
          clearInterval(interval);
        };
      }, []);

      const handleRefreshClick = () => {
        clearInterval(mainInterval);
        setRefresh(prev => prev + 1);
      };
    useEffect(() => {
        setLoading(true)
        setData([])
        axios.get(`${baseUrl}/topstories.json`)
        .then(async (res) => {
            const arr = []
            for(let i = 0; i < 100; i++) {
                const itemResponse = await axios.get(`${baseUrl}/item/${res.data[i]}.json`);
                const itemData = itemResponse.data;
                arr.push(itemData)
            }
            setData(arr)
            setLoading(false)
        })
        .catch((e) => {
            setLoading(false)
        })
      }, [refresh]);
    return ( 
        <article >
            
            {!loading && <button onClick={handleRefreshClick}>refresh news</button>} 
            <section className="main">
        {loading && <div className="loading">LOADING...</div>} 
            {data.sort((a,b) => b.time - a.time ).map(({id, score, by, time, title, kids}) => (
                <Fragment key={id}>
                    <MainItem id={id} title={title} score={score} by={by} time={time} comments={kids}/>
                </Fragment>
            ))}
            </section>
        </article>
     );
}
 
export default Main;