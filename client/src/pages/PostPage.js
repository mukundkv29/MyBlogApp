import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostPage() {
  // const params = useParams();
  const [postInfo, setPostInfo] = useState(null);
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
      <div>
      <img src={`http://localhost:4000/${postInfo.cover}`} alt=""/>
      </div>
      <h1>{postInfo.title}</h1>
    </div>
  );
}
