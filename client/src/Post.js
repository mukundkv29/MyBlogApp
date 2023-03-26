import React from "react";
// import './App.css';

const Post = () =>{
    return (
        <div className='post'>
        <div className='image'>

          <img src='https://miro.medium.com/v2/resize:fit:1100/format:webp/1*Yc_SRz7rNTVMGU2R3VKmYw.png' alt='blog_image'></img>
        </div>

        <div className='texts'>
          <h2>Designing Zenly: Part I</h2>
          <p className='info'>
            <a className='author'>Julien Martin</a>
            <time>2023-03-21 16:45</time>
          </p>
          <p className='summary'>
            I've been wanting to do this for a while. As Zenly came to an end in February 2023, I started writing these articles in September 2022 following the shutdown announcement. It’s my own way to “grieve”, my own way to close the loop and move on.
          </p>
        </div>
      </div>
    );
}

export default Post;