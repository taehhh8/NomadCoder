import { useParams } from "react-router-dom";
import { testUsers } from "../../db";

function Chapters() {
  const { name, book: bookTitle } = useParams();
  const author = testUsers.find((user) => user.name === name);
  const book = author?.books.find((b) => b.title === bookTitle);

  return (
    <div>
      <h2>Chapters </h2>
      <ul>
        {book?.chapters.map((chapter, index) => (
          <li key={index}>{chapter}</li>
        ))}
      </ul>
    </div>
  );
}

export default Chapters;
