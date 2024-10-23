import { useParams } from "react-router-dom";
import { testUsers } from "../../db";

function Characters() {
  const { name, book: bookTitle } = useParams();
  const author = testUsers.find((user) => user.name === name);
  const book = author?.books.find((b) => b.title === bookTitle);

  return (
    <div>
      <h2>characters</h2>
      <ul>
        {book?.characters.map((characters, index) => (
          <li key={index}>{characters}</li>
        ))}
      </ul>
    </div>
  );
}

export default Characters;
