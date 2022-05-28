const Search = ({ text, handler }) => {
  return <input type="text" onChange={handler} value={text} />;
};

export default Search;
