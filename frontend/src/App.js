import RoutList from "./routes/RoutList";
import Header from "./component/Header";

function App() {
  return (
    <>
      <div className="mainDiv">
        <section id="header">
          <Header />
        </section>
        <div className=" subDiv container">
          <RoutList />
        </div>
      </div>
    </>
  );
}

export default App;
