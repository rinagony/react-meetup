import { useContext } from 'react';
import GoingContext from '../store/iamgoing-context';
import MeetupList from '../components/meetups/MeetupList';
import { useHistory } from "react-router";

function GoingPage() {
    const ImgoingCtx = useContext(GoingContext);
    let content;
    const history = useHistory();

    function changeDirectory() {
        history.replace("/");
      }

    if(ImgoingCtx.totalGoing === 0) {
        content =  <div className="wrapperEmptyFav">
        <h3>You are not going to any meetup yet. Start adding some?</h3>
        <button onClick={changeDirectory} className="backBtn">
          &#10229; Come back
        </button>
      </div>
    } else {
        content = <MeetupList meetups={ImgoingCtx.going} />
    }

    return <section>
        <h1>I am going to</h1>
        {content}
    </section>

}

export default GoingPage;