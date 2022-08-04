import React from "react";
import {useParams, Link} from 'react-router-dom';
import FormatContent from "../utils/FormatContent";

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
          {post.dateLocale}
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
          <FormatContent>
            {post.body}
          </FormatContent>
        </div>
      </div>
    </div>
  );
}

export default ItemView;
