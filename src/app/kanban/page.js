// Example of fetching boards in a Next.js component
import { useEffect, useState } from "react";

function Boards() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    async function fetchBoards() {
      const response = await fetch("/api/boards");
      const data = await response.json();
      setBoards(data);
    }

    fetchBoards();
  }, []);

  return (
    <div>
      {boards.map((board) => (
        <div key={board._id}>{board.name}</div>
      ))}
    </div>
  );
}

export default Boards;
