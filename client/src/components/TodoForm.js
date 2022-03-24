import { Component } from "react";
import React from "react";
import {
    Card,
    Form,
    Input,
    Button,
    Radio,
    Select,
    DatePicker,
    TimePicker,
  } from 'antd';
import {
    PlusOutlined
  } from '@ant-design/icons';
import moment from 'moment';


const tabListTitle = [
    {
      key: 'todo',
      tab: '任务计划',
    },
    {
      key: 'ddl',
      tab: 'DDL',
    },
];

class TodoForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleTimeHsChange = this.handleTimeHsChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.onTabChange = this.onTabChange.bind(this);
        this.state = {
            activeTabKey: "todo",
            todoFormData: {id: -1, title: null, text: null, date: null, time: null, tags:[]},
            ddlFormData: {id:-1, title: null, date: null, timeHs: null, tags:[]}
        }
    }

    formRef = React.createRef();

    componentWillReceiveProps(nextProps) {
        if(nextProps.todoFormData !== this.state.todoFormData) {
            this.setState({
                todoFormData: nextProps.todoFormData, 
            });
        }
        if(nextProps.ddlFormData !== this.state.ddlFormData) {
            this.setState({
                ddlFormData: nextProps.ddlFormData, 
            });
        }        
        if(nextProps.activeTabKey !== this.state.activeTabKey) {
            this.setState({
                activeTabKey: nextProps.activeTabKey,
            });
        }
    }


    handleTitleChange(e) {
        if(this.state.activeTabKey === "todo") {
            var todoFormData = this.state.todoFormData;
            todoFormData["title"] = e.target.value;
            this.setState({
                todoFormData: todoFormData,
            })
        } else if(this.state.activeTabKey === "ddl") {
            var ddlFormData = this.state.ddlFormData;
            ddlFormData["title"] = e.target.value;
            this.setState({
                ddlFormData: ddlFormData,
            })            
        }
    }

    handleTextChange(e) {
        if(this.state.activeTabKey === "todo") {
            var todoFormData = this.state.todoFormData;
            todoFormData["text"] = e.target.value;
            this.setState({
                todoFormData: todoFormData,
            })
        } else if(this.state.activeTabKey === "ddl") {
            var ddlFormData = this.state.ddlFormData;
            ddlFormData["text"] = e.target.value;
            this.setState({
                ddlFormData: ddlFormData,
            })            
        }
    }

    handleDateChange(date, dateString) {
        if(this.state.activeTabKey === "todo") {
            var todoFormData = this.state.todoFormData;
            todoFormData["date"] = dateString;
            this.setState({
                todoFormData: todoFormData,
            })
        } else if(this.state.activeTabKey === "ddl") {
            var ddlFormData = this.state.ddlFormData;
            ddlFormData["date"] = dateString;
            this.setState({
                ddlFormData: ddlFormData,
            })            
        }
    }


    handleTagsChange(value, options) {
        if(this.state.activeTabKey === "todo") {
            var todoFormData = this.state.todoFormData;
            todoFormData["tags"] = value;
            this.setState({
                todoFormData: todoFormData,
            })
        } else if(this.state.activeTabKey === "ddl") {
            var ddlFormData = this.state.ddlFormData;
            ddlFormData["tags"] = value;
            this.setState({
                ddlFormData: ddlFormData,
            })            
        }
    }

    handleTimeChange(e) {
        var todoFormData = this.state.todoFormData;
        todoFormData["time"] = e.target.value;
        this.setState({
            todoFormData: todoFormData,
        });
    }

    handleTimeHsChange(time, timeString) {
        var ddlFormData = this.state.ddlFormData;
        ddlFormData["timeHs"] = timeString;
        this.setState({
            ddlFormData: ddlFormData,
        });
    }

    handleAdd(e) {
        if(this.state.activeTabKey == "todo") {
            this.props.setTodoFormData(-1);
            this.formRef.current.resetFields();
        }
        else if (this.state.activeTabKey == "ddl") {
            this.props.setDdlFormData(-1);
            this.formRef.current.resetFields();
        }
    }


    handleSubmit() {
        if(this.state.activeTabKey === "todo") {
            this.props.handleSubmit(this.state.todoFormData);
        }
        else if(this.state.activeTabKey === "ddl") {
            this.props.handleSubmitDdl(this.state.ddlFormData);
        }
        this.formRef.current.resetFields();   // 🌟
    }

    onTabChange(key) {
        this.setState({
            activeTabKey: key,
        });
        this.formRef.current.resetFields();   // 🌟
        console.log("tab change");
    }

    render() {    
        const dateFormat = 'YYYY/MM/DD';
        const { TextArea } = Input;
        const activeTabKey = this.state.activeTabKey;
        var initFormData = {};
        if(activeTabKey === "todo") {
            initFormData["id"] = this.state.todoFormData.id;
            initFormData["title"] = this.state.todoFormData.title;
            initFormData["text"] = this.state.todoFormData.text;
            initFormData["date"] = this.state.todoFormData.date;
            initFormData["time"] = this.state.todoFormData.time;
            initFormData["tags"] = this.state.todoFormData.tags;
        }
        else if(activeTabKey === "ddl") {
            initFormData["id"] = this.state.ddlFormData.id;
            initFormData["title"] = this.state.ddlFormData.title;
            initFormData["date"] = this.state.ddlFormData.date;
            initFormData["timeHs"] = this.state.ddlFormData.timeHs;
            initFormData["tags"] = this.state.ddlFormData.tags;
        }

        var datePicker;
        if(initFormData["date"] == null) {
            datePicker = <DatePicker key={initFormData["id"]}
                defaultValue={moment()}
                format={dateFormat} onChange={(date, dateString) => this.handleDateChange(date, dateString)}
            />            
        } else {
            datePicker = <DatePicker key={initFormData["id"]}
                defaultValue={moment(initFormData["date"], dateFormat)} format={dateFormat} onChange={(date, dateString) => this.handleDateChange(date, dateString)}
            />
        }

        var timePicker;
        if(initFormData["timeHs"] == null) {
            timePicker = <TimePicker defaultValue={moment().minute(0)} format={"HH:mm"} onChange={(time, timeString) => this.handleTimeHsChange(time, timeString)} />        
        } else {
            console.log(initFormData["timeHs"].split(':')[0]);
            timePicker = <TimePicker defaultValue={moment(initFormData["timeHs"].split(':').join(''), "hmm")} format={"HH:mm"} onChange={(time, timeString) => this.handleTimeHsChange(time, timeString)} />
        }

        const TabTodoContent = (
            <Form
                ref={this.formRef}
                labelCol={{span: 4,}} wrapperCol={{span: 14,}}
                layout="horizontal"
                size="middle">
                <Form.Item label="标题" name="title">
                    <Input key={initFormData["id"]} defaultValue={initFormData["title"]} onChange={(e) => this.handleTitleChange(e)} />
                </Form.Item>     
                <Form.Item label="描述" name="text">
                <TextArea rows={4} key={initFormData["id"]} defaultValue={initFormData["text"]} onChange={(e) => this.handleTextChange(e)}/>
                </Form.Item>
                <Form.Item label="标签" name="tags">
                    <Select mode='tags' key={initFormData["id"]} defaultValue={initFormData["tags"]} onChange={(e) => this.handleTagsChange(e)}>
                    </Select>
                </Form.Item>      
                <Form.Item label="日期" name="date">
                    {datePicker}
                </Form.Item>                           
                <Form.Item label="时间段" name="time">
                    <Radio.Group key={initFormData["id"]} defaultValue={initFormData["time"]} onChange={this.handleTimeChange}>
                    <Radio.Button value={1}>上午</Radio.Button>
                    <Radio.Button value={2}>下午</Radio.Button>
                    <Radio.Button value={3}>晚上</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <div style={{float:"right"}}>
                    <Button onClick={this.handleSubmit}>确定</Button>
                </div>
            </Form>           
        );

        const TabDdlContent = (
            <Form
                ref={this.formRef}
                labelCol={{span: 4,}} wrapperCol={{span: 14,}}
                layout="horizontal"
                size="middle">
                <Form.Item label="标题" name="title">
                    <Input key={initFormData["id"]} defaultValue={initFormData["title"]} onChange={(e) => this.handleTitleChange(e)} />
                </Form.Item>
                <Form.Item label="标签" name="tags">
                    <Select mode='tags' key={initFormData["id"]} defaultValue={initFormData["tags"]} onChange={(e) => this.handleTagsChange(e)}>
                    </Select>
                </Form.Item>
                <Form.Item label="日期" name="date">
                    {datePicker}
                </Form.Item>                           
                <Form.Item label="时间" name="time">
                    {timePicker}
                </Form.Item>
                <div style={{float:"right"}}>
                    <Button onClick={this.handleSubmit}>确定</Button>
                </div>
            </Form>                
        )
        
        var TabContent;
        if(this.state.activeTabKey == "todo") {
            TabContent = TabTodoContent;
        } else {
            TabContent = TabDdlContent;
        }

        return (
            <div className="todo-form">
            <Card
                style={{ width: '100%' }}
                tabBarExtraContent={<Button onClick={this.handleAdd}><PlusOutlined /></Button>}
                tabList={tabListTitle}
                activeTabKey={this.state.activeTabKey}
                onTabChange={(this.onTabChange)}
            >
                {TabContent}
            </Card>
        </div>            
        );
    }
}

export default TodoForm;