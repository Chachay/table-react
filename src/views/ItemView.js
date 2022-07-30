import React from "react";
import {useParams, Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown'

function ItemView(prop) {
  let { entryId } = useParams();
  const [post, setPost] = React.useState([]);

  React.useEffect(() => {
    prop.API.getItem(entryId)
      .then((response) => {
        setPost(prop.API.translateItemDetail(response.data));
      });
  }, [entryId]);
  if(!post) return 'nopost';

  return (
    <div className="p-4">
      <div className="row">
        <div
          className="col-8"
        >
          {post.author}
        </div>
      </div>
      <div className="row">
        <div
          className="col-8 gray"
        >
          {post.date}
        </div>
        <div
          className="col-1"
        >
          <Link to={`/edit/${entryId}`}>
            Edit
          </Link>
        </div>
      </div>
      <div className="row">
        <div
          className="col-12"
        >
          <h1 className="h2">{post.title}</h1>
        </div>
        <div
          className="col-12"
        >
          <ReactMarkdown
            components={{
              h1: 'h2', h2: 'h3', h3: 'h4', h4: 'h5'
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default ItemView;
