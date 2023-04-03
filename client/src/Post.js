import { format } from "date-fns";

export default function Post({title,summary,cover,content,createdAt,author}){
    return (
        <div className='post'>
        <div className='image'>

          <img src='https://miro.medium.com/v2/resize:fit:1100/format:webp/1*Yc_SRz7rNTVMGU2R3VKmYw.png' alt='blog_image'></img>
        </div>

        <div className='texts'>
          <h2>{title}</h2>
          <p className='info'>
            {/* author?.username is used when we aren't sure that user property exits or not */}
            <a className='author'>{author?.username}</a>
            <time>{format(new Date(createdAt),'MMM do, yyy HH:mm')}</time>
          </p>
          <p className='summary'>
            {summary}
          </p>
        </div>
      </div>
    );
}

// export default Post;