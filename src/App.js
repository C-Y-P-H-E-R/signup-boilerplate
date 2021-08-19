import "./styles.css";
import { addUser } from "./redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardActionArea } from "@material-ui/core";

export default function App() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const [imagelist, setToImageList] = useState([]);

  // const mainApp = document.querySelector(".app");

  const handleUsername = (e) => {
    setUserName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      let image = e.target.files[0];
      setToImageList([
        ...imagelist,
        {
          url: URL.createObjectURL(image),
          name: user.username
        }
      ]);
    }
    console.log(user);
  };

  const handlesubmit = () => {
    if (username !== "" && email !== "" && password !== "") {
      localStorage.setItem("userlogged", { username });
      console.log(`${username} logged in`);
      dispatch(addUser({ username, email, password }));
    }
    setEmail("");
    setPassword("");
    setUserName("");
  };

  const loggout = () => {
    localStorage.removeItem("userlogged");
    dispatch(addUser({}));
    console.log("user logged out");
  };

  return (
    <div className="App">
      <main className="app">
        <input
          className="App_input_text"
          value={username}
          onChange={handleUsername}
          type="text"
          placeholder="Enter Username"
        />
        <input
          className="App_input_text"
          value={email}
          onChange={handleEmail}
          type="text"
          placeholder="Enter email ID"
        />
        <input
          className="App_input_text"
          value={password}
          onChange={handlePassword}
          type="password"
          placeholder="Enter password"
        />

        <section className="App_section_btn">
          <button className="App_input_btn" onClick={handlesubmit}>
            submit
          </button>
          <button className="App_input_btn" onClick={loggout}>
            log out
          </button>
        </section>

        {localStorage.getItem("userlogged") !== null && (
          <div>
            <input type="file" name="myfile" onChange={handleFileUpload} />
          </div>
        )}
      </main>

      {
        // console.log(localStorage.getItem("userlogged"))
        localStorage.getItem("userlogged") !== null && (
          <h2
            style={{ textAlign: "center", paddingTop: "30px" }}
          >{`welcome ${localStorage.getItem("userlogged")}`}</h2>
        )
      }

      {imagelist !== [] &&
        imagelist.map((im) => (
          <Card className="post" key={uuidv4()}>
            <CardActionArea>
              <img
                style={{ width: "300px", objectFit: "contain" }}
                src={im.url}
                alt="this img"
              />
              {im.name !== "" && <h4>{`${im.name}`}</h4>}
            </CardActionArea>
          </Card>
        ))}
    </div>
  );
}
