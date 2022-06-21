import React from "react";
import {useParams, useNavigate} from 'react-router-dom';
import ReactMarkdown from 'react-markdown'

function EditView(prop) {
  const {entryId} = useParams();
  const editMode = (typeof entryId !== "undefined");

  const navigate = useNavigate();

  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if(editMode){
      setLoading(true);
      prop.API.getItem(entryId)
        .then((response) => {
          setPost(prop.API.translateItemDetail(response.data));
          setLoading(false);
        });
    } else {
      setLoading(false);
      setPost({
        title: "",
        body: ""
      });
    }
  }, [entryId, editMode]);

  function editorChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setPost(values => ({...values, [name]: value}))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      title: post.title,
      body: post.body
    };
    setLoading(true);
    if(editMode){
      prop.API.putItem(entryId, data)
        .then((response) => {
          setPost(prop.API.translateItemDetail(response.data));
          setLoading(false);
          navigate(`${prop.API.basePath}/item/${post.id}`);
        });
    } else{
      prop.API.postItem(data)
        .then((response) => {
          setPost(prop.API.translateItemDetail(response.data));
          const post = prop.API.translateItemDetail(response.data)
          setLoading(false);
          navigate(`${prop.API.basePath}/item/${post.id}`);
        });
    }
  }

  if(!post) return 'nopost';

  return (
    <form className="h-100" onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-10">
          <input
            name="title"
            type="text"
            className="form-control"
            id="EntryTitle"
            value={post.title}
            onChange={editorChange}
          />
        </div>
        <div className="col-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {editMode ? 'Update': 'Post'}
          </button>
        </div>
      </div>
      <div className="row mb-3 editor">
        <div className="col-6">
          <textarea
            name="body"
            className="form-control h-100"
            id="EntryBody"
            value={post.body}
            onChange={editorChange}
           />
        </div>
        <div className="col-6 preview">
          <ReactMarkdown
            components={{
              h1: 'h2', h2: 'h3', h3: 'h4', h4: 'h5'
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>
      </div>
    </form>
  );
}

export default EditView;
