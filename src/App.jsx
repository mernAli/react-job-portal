import NotificationList from "./components/NotificationList";
import "./components/layout.css";

function App() {
  return (
    <div className="page-layout">
      <aside className="left-sidebar"></aside>

      <main className="center-content">
        <NotificationList />
      </main>

      <aside className="right-sidebar"></aside>
    </div>
  );
}

export default App;
