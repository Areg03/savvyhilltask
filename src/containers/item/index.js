import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../../store/key";
import axios from "axios";
import moment from "moment";

const Item = () => {
    const {id} = useParams()
    const [data, setData] = useState()
    const [comments, setComments] = useState([])
    const [kids, setKids] = useState([])
    useEffect(() => {
        
        (async function getItem() {
            const response = await axios.get(`${baseUrl}/item/${id}.json`)
            setData(response.data)
        })()
    }, [id])
    useEffect(() => {
        if (data?.kids?.length > 0) {
          const commFunc = async () => {
            const arr = [];
            for (let i = 0; i < data?.kids?.length; i++) {
              const res = await axios.get(`${baseUrl}/item/${data?.kids?.[i]}.json`);
              arr.push(res.data);
            }
            console.log(arr, 'asdljnhaskdjhaskdhj');
            if (arr.length > 0)
              setComments(arr);
          };
          commFunc();
        }
      }, [data]);

      const onParentClick = (i) => {
        if(i?.kids?.length > 0) {
         
            const commFunc = async () => {
                const arr = [];
                for (let x = 0; x < i?.kids?.length; x++) {
                  const res = await axios.get(`${baseUrl}/item/${i?.kids?.[x]}.json`);
                  arr.push(res.data);
                }
                console.log(arr, 'asdljnhaskdjhaskdhj');
                if (arr.length > 0)
                  setKids(arr);
              };
              commFunc();
        }
      }
   
    return ( 
        
        <div className="item">
            <Link to="/"><button >Home Page</button></Link>
            <p className="item-p">Author - <span className="autohor">{data?.by}</span></p>
            <a href={data?.url} className="item-link" target="_blank" rel="noreferrer">{data?.url}</a>
            <p className="item-p">{data?.time && moment.unix(data?.time).format('YYYY-MM-DD HH:mm:ss')}</p>
            <h1>{data?.title}</h1>
            <h2>Comments - {data?.kids?.length > 0 ? data?.kids?.length : 0}</h2>
            <div>
                {comments?.map((i) => (
                    <div key={i.id}>
                        <div onClick={() => onParentClick(i)}>
                            <h3 style={{cursor: 'pointer'}}><div style={{width: 20, height: 20, backgroundColor: i?.kids?.length > 0 ? 'green' : 'red', borderRadius: '50%'}}></div>{i.by}</h3>
                            <p style={{cursor: 'pointer'}}>{i.text}</p>
                        </div>
                        {kids.filter((z) => z.parent === i.id).map((z) => (
                            <div style={{marginLeft: 50}} key={z.id}>
                                <h3 style={{cursor: 'pointer'}}>{z.by}</h3>
                                <p style={{cursor: 'pointer'}}>{z.text}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Item;