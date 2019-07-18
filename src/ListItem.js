import React from "react";

export const ListItem = (props) => {
    return <li key={props.item.id} className="list-group-item">
        <button className="tn btn-primary btn-info btn-sm mx-5" onClick={props.editTodo} >U</button>
        {props.item.name}
        <button className="tn btn-primary btn-danger btn-sm mx-5" onClick={props.deleteTodo} >X</button>
    </li>;
}