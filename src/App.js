import TodoContainer from "./components/TodoContainer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <video
        autoPlay
        muted
        loop
        src="https://firebasestorage.googleapis.com/v0/b/am-beats.appspot.com/o/test%2FBlue%20and%20Red%20Neon%20Lines%20Loop%20Motion%20Graphics%20Animated%20Background%20-%20Free%20Footage%20-%20Motion%20Made%20(online-video-cutter.com).mp4?alt=media&token=034408bb-de16-459d-a8b5-6f6f1556faad"
      ></video>
      <TodoContainer />
    </div>
  );
}

export default App;
