// 必ずしもCSS-in-JSが正しいというわけではない

const style = {
  backgroundColor: "#c1ffff",
  width: "400px",
  height: "30px",
  padding: "8px",
  margin: "8px",
  borderRadius: "8px"
};

export const InputTodo = (props) => {
  const { todoText, onChange, onClick, disabled } = props;

  return (
    <div style={style}>
      <input
        disabled={disabled}
        placeholder="TODOを入力"
        value={todoText}
        onChange={onChange}
      />
      <button disabled={disabled} onClick={onClick}>
        追加
      </button>
    </div>
  );
};

// CSS-in-JS前
// export const InputTodo = (props) => {
//   const { todoText, onChange, onClick } = props;

//   return (
//     <div className="input-area">
//       <input placeholder="TODOを入力" value={todoText} onChange={onChange} />
//       <button onClick={onClick}>追加</button>
//     </div>
//   );
// };
