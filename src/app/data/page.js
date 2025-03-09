"use client"

import { useEffect, useState } from "react";
import { Table } from "antd";

export default function Home() {
  const [data, setData] = useState([]);

  // pages/index.js
  useEffect(() => {
    fetch('/api')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        setData(result);  // เก็บข้อมูลใน state
        console.log(result);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const titles = Object.keys(data[0] || {}).filter(title => title.toLowerCase() !== 'id');
  console.log(titles);

  // กรองข้อมูลและรวมเป็นสตริง
  const information = data.map((item, index) => {
    return {
      key: index + 1,  // กำหนด key สำหรับแต่ละแถว
      ...titles.reduce((acc, title) => {
        acc[title] = item[title];  // นำข้อมูลแต่ละคีย์ใน titles มาจัดเก็บ
        return acc;
      }, {}),
    };
  });

  console.log("Information:", information);

  const columns = titles.map(title => ({
    title:  title.charAt(0).toUpperCase() + title.slice(1),
    dataIndex: title,
    key: title,
    ...(title.toUpperCase() === 'USERNAME' && {
      fixed: 'left',
      width: 150,
      
    })
  }));

  
  const rowClassName = () => {
    return 'white-row'; // กำหนดให้แถวทั้งหมดมีคลาส 'white-row'
  };

  return (
    <div className="p-[30px] bg-rgb(217, 247, 255)" >
      <Table   className="custom-table" dataSource={information} columns={columns} pagination={{
        pageSize: 50,showSizeChanger: false}} scroll={{ x: 9000, y: '70vh' }} />
    </div>
  );
}
