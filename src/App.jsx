import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [TODO, setTODO] = useState("");
  const [TODOs, setTODOs] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const TODOString = localStorage.getItem('TODOs');
    if (TODOString) {
      const TODOs = JSON.parse(TODOString);
      setTODOs(TODOs);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem('TODOs', JSON.stringify(params));
  };

  const handleEdit = (id, newTODO) => {
    const updatedTODOs = TODOs.map((item) =>
      item.id === id ? { ...item, TODO: newTODO } : item
    );
    setTODOs(updatedTODOs);
    saveToLS(updatedTODOs);
  };

  const handleDelete = (id) => {
    const updatedTODOs = TODOs.filter((item) => item.id !== id);
    setTODOs(updatedTODOs);
    saveToLS(updatedTODOs);
  };

  const handleAdd = () => {
    if (TODO.trim() === "") return;
    const newTODO = { id: uuidv4(), TODO, isCompleted: false };
    const updatedTODOs = [...TODOs, newTODO];
    setTODOs(updatedTODOs);
    saveToLS(updatedTODOs);
    setTODO("");
  };

  const handleChange = (e) => {
    setTODO(e.target.value);
  };

  const handleShowFinishedChange = () => {
    setShowFinished(!showFinished);
  };

  const handleToggleComplete = (id) => {
    const updatedTODOs = TODOs.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTODOs(updatedTODOs);
    saveToLS(updatedTODOs);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-3xl p-5 bg-violet-100 min-h-[80vh] shadow-lg">
        <div className="addTODO my-5">
          <h2 className="text-lg font-bold mb-3">Add TODO</h2>
          <div className="flex gap-5">
            <input
              onChange={handleChange}
              value={TODO}
              type="text"
              className="w-1/2 p-2 border border-gray-300 rounded-md"
              placeholder="Enter your TODO"
            />
            <button
              onClick={handleAdd}
              className="bg-violet-400 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md"
            >
              ADD
            </button>
          </div>
        </div>
        <div className="flex items-center my-5">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={handleShowFinishedChange}
            className="mr-2"
          />
          <label>Show Finished</label>
        </div>
        <div className="todos">
          {TODOs.length === 0 && <div className='m-5 text-gray-500'>No TODOs</div>}
          {TODOs.filter(item => showFinished ? item.isCompleted : true).map((item) => (
            <div key={item.id} className="todo-item flex flex-wrap justify-between items-center my-3 p-3 border border-gray-300 rounded-md">
              <div className="flex items-center flex-1 min-w-0 break-words overflow-auto">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleToggleComplete(item.id)}
                  className="mr-2"
                />
                <span className={item.isCompleted ? "line-through" : ""}>
                  {item.TODO}
                </span>
              </div>
              <div className="buttons flex gap-2">
                <button
                  onClick={() => handleEdit(item.id, prompt("Edit TODO:", item.TODO))}
                  className="bg-violet-400 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-violet-400 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
