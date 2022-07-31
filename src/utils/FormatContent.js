import ReactMarkdown from 'react-markdown'

function FormatContent(prop) {
  return (
    <ReactMarkdown
      components={{
        h1: 'h2', h2: 'h3', h3: 'h4', h4: 'h5'
      }}
    >
      {prop.children}
    </ReactMarkdown>
  );
};
export default FormatContent;
