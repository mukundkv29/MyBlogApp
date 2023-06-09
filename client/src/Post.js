import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:4000/" + cover} alt="blog_image"></img>
        </Link>
      </div>

      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          {/* author?.username is used when we aren't sure that user property exits or not */}
          <a className="author">{author?.username}</a>
          <time>{format(new Date(createdAt), "MMM do, yyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}

// export default Post;

// https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.peakpx.com%2Fen%2Fsearch%3Fq%3Dfootball&psig=AOvVaw02rHZrSJ4Eabb1GIJL59_k&ust=1680634304751000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJj1iZ2zjv4CFQAAAAAdAAAAABAD
