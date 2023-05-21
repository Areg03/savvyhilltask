import { Link } from 'react-router-dom';
import Message from '../../assets/images/message.png';
import moment from 'moment';


const MainItem = ({ id, score, by, time, title, comments }) => {
  const realTime = moment.unix(time).format('YYYY-MM-DD HH:mm:ss');

  return (
    <Link to={`/${id}`}>
      <div className="mainItem">
        <div className="about">
          <h5>{title}</h5>
          <div className='params'>
            <p>score- {score}</p>
            <p>by- <span className='autohor'>{by}</span></p>
            <div className='comments'>
              <img src={Message} alt='comment-icon'/>
              <p>{comments?.length ?? 0}</p>
            </div>
          </div>
          <p>published- {realTime}</p>
        </div>
      </div>
    </Link>
  );
};

export default MainItem;
