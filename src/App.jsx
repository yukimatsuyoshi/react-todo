import { useState } from "react";
import "./styles.css";

import { InputTodo } from "./components/InputTodo";
import { InprogressTodos } from "./components/InprogressTodos";
import { DoneTodos } from "./components/DoneTodos";

// memo:
//  map等の繰り返しを利用してレンダリングする際は、一番親のelementでkeyを指定する必要がある
//  タグのイベントで指定する関数に引数を渡したい場合は{}の中にそのまま書くのではなく、新たに関数を作る必要がる
//  コンポーネント化した際のpropsで渡した関数が呼び出されると、親コンポーネント側の関数が実行される
export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [inprogressTodos, setInprogressTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...inprogressTodos, todoText];
    setInprogressTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...inprogressTodos];
    newTodos.splice(index, 1); //第一引数にindexを指定、第二引数に個数を指定
    setInprogressTodos(newTodos);
  };

  const onClickDone = (index) => {
    const newInprogressTodos = [...inprogressTodos];
    newInprogressTodos.splice(index, 1);

    const newDoneTodos = [...doneTodos, inprogressTodos[index]];

    setInprogressTodos(newInprogressTodos);
    setDoneTodos(newDoneTodos);
  };

  const onClickBack = (index) => {
    const newDoneTodos = [...doneTodos];
    newDoneTodos.splice(index, 1);

    const newInprogressTodos = [...inprogressTodos, doneTodos[index]];

    setDoneTodos(newDoneTodos);
    setInprogressTodos(newInprogressTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={inprogressTodos.length >= 5}
      />
      {inprogressTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるtodoは5個までです。</p>
      )}
      <InprogressTodos
        todos={inprogressTodos}
        onClickDone={onClickDone}
        onClickDelete={onClickDelete}
      />
      <DoneTodos todos={doneTodos} onClickBack={onClickBack} />
    </>
  );
};

// コンポーネント化なし
// export const App = () => {
//   const [todoText, setTodoText] = useState("");
//   const [inprogressTodos, setInprogressTodos] = useState([]);
//   const [doneTodos, setDoneTodos] = useState([]);

//   const onChangeTodoText = (event) => setTodoText(event.target.value);

//   const onClickAdd = () => {
//     if (todoText === "") return;
//     const newTodos = [...inprogressTodos, todoText];
//     setInprogressTodos(newTodos);
//     setTodoText("");
//   };

//   const onClickDelete = (index) => {
//     const newTodos = [...inprogressTodos];
//     newTodos.splice(index, 1); //第一引数にindexを指定、第二引数に個数を指定
//     setInprogressTodos(newTodos);
//   };

//   const onClickDone = (index) => {
//     const newInprogressTodos = [...inprogressTodos];
//     newInprogressTodos.splice(index, 1);

//     const newDoneTodos = [...doneTodos, inprogressTodos[index]];

//     setInprogressTodos(newInprogressTodos);
//     setDoneTodos(newDoneTodos);
//   };

//   const onClickBack = (index) => {
//     const newDoneTodos = [...doneTodos];
//     newDoneTodos.splice(index, 1);

//     const newInprogressTodos = [...inprogressTodos, doneTodos[index]];

//     setDoneTodos(newDoneTodos);
//     setInprogressTodos(newInprogressTodos);
//   };

//   return (
//     <>
//       <div className="input-area">
//         <input
//           placeholder="TODOを入力"
//           value={todoText}
//           onChange={onChangeTodoText}
//         />
//         <button onClick={onClickAdd}>追加</button>
//       </div>
//       <div className="inprogress-area">
//         <p className="title">未完了のTODO</p>
//         <ul>
//           {inprogressTodos.map((todo, index) => {
//             return (
//               <li key={todo}>
//                 <div className="list-row">
//                   <p>{todo}</p>
//                   <button onClick={() => onClickDone(index)}>完了</button>
//                   <button onClick={() => onClickDelete(index)}>削除</button>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//       <div className="done-area">
//         <p className="title">完了のTODO</p>
//         <ul>
//           {doneTodos.map((todo, index) => {
//             return (
//               <li key={todo}>
//                 <div className="list-row">
//                   <p>{todo}</p>
//                   <button onClick={() => onClickBack(index)}>戻す</button>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </>
//   );
// };
