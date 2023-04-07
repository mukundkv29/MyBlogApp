import { format} from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  
  const { id } = useParams();
  useEffect(() => {
    // console.log(params);
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo)
      });
    });
  }, []);

  if (!postInfo) return "";

  return (
    // <div>PostPage</div>
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{format(new Date(postInfo.createdAt), "MMM do, yyy HH:mm")}</time>
      <div className="author">By {postInfo.author.username}</div>
      {userInfo.id===postInfo.author._id && (
        <div className="edit-row">
          <a className="edit-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
          </svg>

            Edit</a>
        </div>
      )}
      <div className="image">

      <img src={`http://localhost:4000/${postInfo.cover}`} alt=""/>
      </div>
      <div dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
    </div>
  );
}
