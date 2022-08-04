import React from "react";
import {Link} from 'react-router-dom';

function ListView(prop) {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    prop.API.getList()
      .then((response) => {
        setPosts(prop.API.translateList(response.data));
      });
  }, []);
  if(!posts) return 'nopost';

  return (
    <div className="container px-4">
      {
        posts.map((v, i) => {
          return (
            <div
              className="row border-top"
              key={i}
            >
              <div className="col-1">{v.id}</div>
              <div className="col-8">
                <Link to={`item/${v.id}`}>
                  {v.title}
                </Link>
              </div>
              <div className="col-3">{v.dateLocale}</div>
            </div>
          );
        })
      }
    </div>
  );
}

export default ListView;
