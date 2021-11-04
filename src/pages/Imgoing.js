import { useContext } from 'react';
import GoingContext from '../store/iamgoing-context';
import MeetupList from '../components/meetups/MeetupList';

function GoingPage() {
    const ImgoingCtx = useContext(GoingContext);
    let content;

    if(ImgoingCtx.totalGoing === 0) {
        content = <p>You got no going meetups yet. Start adding some?</p>
    } else {
        content = <MeetupList meetups={ImgoingCtx.going} />
    }

    return <section>
        <h1>I am going to</h1>
        {content}
    </section>

}

export default GoingPage;