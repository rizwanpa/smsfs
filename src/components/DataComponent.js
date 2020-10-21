import React, { Component } from "react";
import { Table, DatePicker } from "antd";

class DataComponent extends Component {
  state = {
    start_date: "",
    end_date: "",
    columns: [
      {
        title: "City",
        dataIndex: "city",
        key: "city"
      },
      {
        title: "Start date",
        dataIndex: "start_date",
        key: "start_date",
        render: dateUnix => {
          let date = new Date(dateUnix * 1000);
          let options = {
            year: "numeric",
            month: "2-digit",
            day: "numeric"
          };
          return date.toLocaleString("en", options);
        }
      },
      {
        title: "End Date",
        dataIndex: "end_date",
        key: "end_date",
        render: dateUnix => {
          let date = new Date(dateUnix * 1000);
          let options = {
            year: "numeric",
            month: "2-digit",
            day: "numeric"
          };
          
          return date.toLocaleString("en", options);
        }
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status"
      },
      {
        title: "Color",
        dataIndex: "color",
        key: "color",
        render: (color) => {          
          return {
            props: {
              style: { background: color },
            },
            children: <div>{color}</div>,
          } 
        }
      }
    ],
    data: []
  };

  componentDidMount() {
    this.fetchData();
  }
  onChange(date, dateString, key) {
    console.log(date, dateString);
    let dateUnix = date !== null ? date.unix() : "";
    if (key == "start_date") {
      this.setState({ start_date: dateUnix }, () => this.fetchData());
    }
    if (key == "end_date") {
      this.setState({ end_date: dateUnix }, () => this.fetchData());
    }
  }
  fetchData = () => {
    fetch(
      `http://localhost:3030/getData?start_date=${this.state.start_date}&end_date=${this.state.end_date}`
    ).then(response => {
      response.json().then(data => {
        data = data.map(Obj => {
          return {
            key: Obj.id,
            ...Obj
          };
        });
        console.log("data---->data---->", data);
        this.setState({ data });
      });
    });
  };
  render() {
    console.log("render-->", this.state);
    return (
      <div className="container">
        <div className="date-picker">
          <div className="paddingR">
            <DatePicker
              format="MM/DD/YYYY"
              placeholder="Start date"
              onChange={(date, dateString) =>
                this.onChange(date, dateString, "start_date")
              }
            />
          </div>
          <div>
            <DatePicker
              format="MM/DD/YYYY"
              placeholder="End date"
              onChange={(date, dateString) =>
                this.onChange(date, dateString, "end_date")
              }
            />
          </div>
        </div>
        <Table columns={this.state.columns} dataSource={this.state.data} />
      </div>
    );
  }
}

export default DataComponent;
