import { Calendar, Badge } from 'antd';
import { Component } from 'react';

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  console.log("dateCellRender");
  console.log(value.date());
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

const CalendarView = () => (
    <div className='calendar-view'>
        <Calendar className='calendar-card' dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    </div>
    );


// class CalendarView extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             todoList: [],
//         }
//     }

//     componentDidMount() {
//         axios.get("http://localhost:3001/api/get")
//             .then(res => {
//                 var todoList = [];
//                 for(let i=0;i<res.data.length;++i) {
//                     var todo_task = res.data[i];
//                     if (todo_task.date != null) { // 只显示有日期的任务
//                         todoList.push(todo_task);
//                     }
//                 }
//                 var todoListByDate=[];
//                 this.setState({
//                     todoList: todoList,
//                 })
//             })  
//     }

//     dateCellRender() {

//     }

//     render() {
//         return (
//             <Calendar className='calendar-card' dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
//         );
//     }

// }

export default CalendarView;