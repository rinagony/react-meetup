
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

function Layout(props) {
  // const [modalCondition, setModalCondition] = useState(true);
  // const [nameUser, setNameUser] = useState("");
  // useEffect(() => {
  //   let storage = localStorage.getItem("userName");
  //   // console.log(storage)
  //   if (storage) {
  //     console.log(storage);
  //     setModalCondition(true);
  //     setNameUser(storage);
  //   } else {
  //     setModalCondition(false);
  //   }
  // }, []);
  // function formComplete(modal, enteredTitle) {
  //   if (modal) {
  //     setNameUser(enteredTitle);
  //     setModalCondition(true);
  //   }
  // }
  // function conditionTokenInit(tokenItem) {
  //   props.conditionOfToken(tokenItem)
  // }
  return (
    <div>
      {/* {modalCondition ? ( */}
      <div>
        <MainNavigation/>
        <main className={classes.main}>{props.children}</main>
      </div>
      {/* // ) : ( */}
      {/* // <Modal onSubmit={formComplete} /> */}
      {/* // )} */}
    </div>
  );
}

export default Layout;
