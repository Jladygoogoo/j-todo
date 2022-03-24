import React from "react";
import { Component } from "react";
import { Row, Col } from "antd";
import axios from 'axios';
import moment from 'moment';
import TodoForm from "../components/TodoForm";
import TodoPanel from "../components/TodoPanel";
import DdlPanel from "../components/DdlPanel";

function compareDatetime(a, b) {
    if(a.date==null && b.date==null) {
        return a.id - b.id;
    }
    else if(a.date==null) {
        return 1;
    }
    else if(b.date==null) {
        return -1;
    }
    else {
        return (new Date(a.date)-new Date(b.date))*10 + a.time-b.time;
    }
}

class TodoView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            ddlList: [],
            activeTabKey: "todo",
            todoFormData: {id:-1, title: null, text: null, date: null, time: null, tags:[], },
            todoFormDataOri: {id: -1, title: null, text: null, date: null, time: null, tags:[], },
            ddlFormData: {id:-1, title: null, date: null, timeHs: null, tags:[], },
            ddlFormDataOri: {id:-1, title: null, date: null, timeHs: null, tags:[], },
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:3001/api/get")
            .then(res => {
                var todoList = [];
                for(let i=0;i<res.data.length;++i) {
                    var todo_task = res.data[i];
                    todo_task.tags = todo_task.tags.split(" ");
                    todo_task.activeTabKey = "todo";
                    todoList.push(todo_task);
                }
                this.setState({
                    todoList: todoList,
                })
            });
        axios.get("http://localhost:3001/api/get_ddl")
            .then(res => {
                var ddlList = [];
                for(let i=0;i<res.data.length;++i) {
                    var ddl = res.data[i];
                    ddl.tags = ddl.tags.split(" ");
                    ddl.activeTabKey = "ddl";
                    ddlList.push(ddl);
                }
                this.setState({
                    ddlList: ddlList,
                })
            })            
    }

    sortTodo(todoList) {
        let sortedTodoList = todoList.sort((a,b) => compareDatetime(a,b));
        return sortedTodoList;
    }

    sortDdl(ddlList) {
        let sortedDdlList = ddlList.sort((a,b) => (new Date(a.datetime) - new Date(b.datetime)));
        return sortedDdlList;
    }

    setTodoFormData(id) {
        if(id==-1) {
            this.setState({
                todoFormData: this.state.todoFormDataOri,
                activeTabKey: "todo",
            });
        } else {
            const todoList = this.state.todoList;
            for(let i=0;i<todoList.length;++i) {
                if(todoList[i].id==id) {
                    this.setState({
                        todoFormData: todoList[i],
                        activeTabKey: "todo",
                    })
                }
            }
        }
    }

    setDdlFormData(id) {
        if(id==-1) {
            this.setState({
                ddlFormData: this.state.ddlFormDataOri,
                activeTabKey: "ddl",
            });
        } else {
            const ddlList = this.state.ddlList;
            for(let i=0;i<ddlList.length;++i) {
                if(ddlList[i].id==id) {
                    this.setState({
                        ddlFormData: ddlList[i],
                        activeTabKey: "ddl",
                    })
                }
            }
        }
    }

    convertDdl2Todo(id) {
        // 复制数据
        var todoData = {};
        const ddlList = this.state.ddlList;
        for(let i=0;i<ddlList.length;++i) {
            if(ddlList[i].id==id) {
                todoData["title"] = ddlList[i]["title"];
                todoData["tags"] = ddlList[i]["tags"];
                todoData["date"] = moment().format("YYYY/MM/DD");
                todoData["time"] = 1;
            }
        }
        console.log("todoData");
        console.log(todoData);
        // 插入数据库   
        axios.post("http://localhost:3001/api/insert", todoData)
            .then(res => {
                console.log(res);
                todoData.id = res.id;
            });
        let newTodoList = this.state.todoList;
        newTodoList.push(todoData);
        this.setState({
            todoList: newTodoList,
            todoFormData: todoData,
        });
        this.setState({
            activeTabKey: "todo",
        })
    }

    handleSubmit(data) {
        if(data.id == -1) { // 新创建的任务
            axios.post("http://localhost:3001/api/insert", data)
                .then(res => {
                    console.log(res);
                    data.id = res.id;
                });
            let newTodoList = this.state.todoList;
            newTodoList.push(data);
            this.setState({
                todoList: newTodoList,
                todoFormData: this.state.todoFormDataOri
            });
        } else { // 更新已有任务
            axios.post("http://localhost:3001/api/update", data)
                .then(res => {
                    console.log(res);
                });
            const targetId = data.id;
            let newTodoList = this.state.todoList;
            for (let index = 0; index < newTodoList.length; index++) {
                let element = newTodoList[index];
                if (element.id==targetId) {
                    newTodoList[index] = data;
                }
            }
            this.setState({
                todoList: newTodoList,
                todoFormData: this.state.todoFormDataOri
            });
        }      
    }

    handleSubmitDdl(data) {
        if(data.id == -1) { // 新创建的任务
            axios.post("http://localhost:3001/api/insert_ddl", data)
                .then(res => {
                    console.log(res);
                    data.id = res.id;
                });
            let newDdlList = this.state.ddlList;
            newDdlList.push(data);
            this.setState({
                ddlList: newDdlList,
                ddlFormData: this.state.ddlFormDataOri,
            });
        } else { // 更新已有任务
            axios.post("http://localhost:3001/api/update_ddl", data)
                .then(res => {
                    console.log(res);
                });
            const targetId = data.id;
            let newDdlList = this.state.ddlList;
            for (let index = 0; index < newDdlList.length; index++) {
                let element = newDdlList[index];
                if (element.id==targetId) {
                    newDdlList[index] = data;
                }
            }
            this.setState({
                ddlList: newDdlList,
                ddlFormData: this.state.ddlFormDataOri
            });
        }      
    }


    handleDelete(targetId) {
        axios.post("http://localhost:3001/api/delete", {"id": targetId})
            .then(res => {
                console.log(res);
            })
        let newTodoList = this.state.todoList;
        let index;
        for (index = 0; index < newTodoList.length; index++) {
            let element = newTodoList[index];
            if (element.id==targetId) {
                break;
            }
        }
        newTodoList.splice(index, 1);
        this.setState({
            todoList: newTodoList
        });
    }

    handleDeleteDdl(targetId) {
        axios.post("http://localhost:3001/api/delete_ddl", {"id": targetId})
            .then(res => {
                console.log(res);
            })
        let newDdlList = this.state.ddlList;
        let index;
        for (index = 0; index < newDdlList.length; index++) {
            let element = newDdlList[index];
            if (element.id==targetId) {
                break;
            }
        }
        newDdlList.splice(index, 1);
        this.setState({
            ddlList: newDdlList
        });
    }


    handleFinish(targetId) {
        axios.post("http://localhost:3001/api/setIsFinished", {"id": targetId})
            .then(res => {
                console.log(res);
            })
        let newTodoList = this.state.todoList;
        let index;
        for (index = 0; index < newTodoList.length; index++) {
            let element = newTodoList[index];
            if (element.id==targetId) {
                break;
            }
        }
        newTodoList.splice(index, 1);
        this.setState({
            todoList: newTodoList
        });
    }

    
    render() {
        const todoList = this.state.todoList;
        const ddlList = this.state.ddlList;
        const sortedTodoList = this.sortTodo(todoList);
        const sortedDdlList= this.sortDdl(ddlList);
        const todoFormData = this.state.todoFormData;
        const ddlFormData = this.state.ddlFormData;

        console.log("todoFormData")
        console.log(todoFormData);

        return (
            <div className="todo-view">
                <Row>
                    <Col span={8}>
                        <TodoPanel todoList={sortedTodoList} 
                                setTodoFormData={(id)=>this.setTodoFormData(id)}
                                handleDelete={(id)=>this.handleDelete(id)}
                                handleFinish={(id) => this.handleFinish(id)} />
                    </Col>
                    <Col span={8}>
                        <DdlPanel ddlList={sortedDdlList}
                                setDdlFormData={(id)=>this.setDdlFormData(id)} 
                                handleDelete={(id)=>this.handleDeleteDdl(id)}
                                convertDdl2Todo={(id)=>this.convertDdl2Todo(id)} />
                    </Col>
                    <Col span={8}>
                        < TodoForm activeTabKey={this.state.activeTabKey}
                                    todoFormData={todoFormData} 
                                    ddlFormData={ddlFormData}
                                    setTodoFormData={(id)=>this.setTodoFormData(id)}
                                    setDdlFormData={(id)=>this.setDdlFormData(id)}
                                    handleSubmit={(data)=>this.handleSubmit(data)}
                                    handleSubmitDdl={(data)=>this.handleSubmitDdl(data)} />
                    </Col>                    
                </Row>
            </div>
        );            
    }
}


export default TodoView;