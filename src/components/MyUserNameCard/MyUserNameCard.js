import React from 'react';
import firebase from "../../firebase"
import 'firebase/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Container from '@material-ui/core/Container';
import "./MyUserNameCard.css";
const auth = firebase.auth();
const firestore = firebase.firestore();

function MyUserNameCard() {
    const { uid } = auth.currentUser;

    const usersRef = firestore.collection('users'); 
    const query = usersRef.where('uid', '==', uid).limit(1)

    const [users] = useCollectionData(query, { idField: 'id' });
    
    return (
        <div className= "ContentArea">
        <Container className="MyUserNameCard" maxWidth="sm">
            <div className="container">
              <div className="row">
                  {/* <img className="col-4 MyUserImage" src={photoURL} alt="photoURL"></img> */}
                  <div className="col-8 MyUserNamePlate">
                    {users && users.map(user => <User key={user.id} message={user} />)}
                  </div>
              </div>
            </div>
        </Container>
        </div>
    )
}

function User(props) {
  const {displayName, photoURL} = props.message;
  return(
    <div>
      <img className="col-4 MyUserImage" src={photoURL} alt="photoURL"></img>
      <div>{displayName}</div>
    </div>
    
  )
}

export default MyUserNameCard;