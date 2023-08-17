import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

export default function NewDoc(props) {
  return (
    <div className="new-doc-btn">
      <Link to={`/documents/${uuidv4()}`}>
        {props.children}
      </Link>
    </div>
  );
}
