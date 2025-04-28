"use client";

import { useEffect, useState } from "react";
import { Table, Input } from "antd";
import Image from "next/image";

export default function Home() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState(""); // 🌟 State สำหรับเก็บค่าค้นหา
  const [filteredData, setFilteredData] = useState([]); // 🌟 เก็บข้อมูลที่ผ่านการกรอง

  useEffect(() => {
    fetch("/api")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
        setFilteredData(result); // 🌟 เซ็ตข้อมูลเริ่มต้นให้ filteredData
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const titles = Object.keys(data[0] || {}).filter((title) => title.toLowerCase() !== "id");

  // 🌟 กรองข้อมูลตามค่าที่พิมพ์
  useEffect(() => {
    const filtered = data.filter((item) =>
      titles.some((title) => item[title]?.toString().toLowerCase().includes(searchText.toLowerCase()))
    );
    setFilteredData(filtered);
  }, [searchText, data]);

  const information = filteredData.map((item, index) => ({
    key: index + 1,
    ...titles.reduce((acc, title) => {
      acc[title] = item[title];
      return acc;
    }, {}),
  }));

  const columns = titles.map((title) => ({
    title: title.charAt(0).toUpperCase() + title.slice(1),
    dataIndex: title,
    key: title,
    ...(title.toUpperCase() === "USERNAME" && {
      fixed: "left",
      width: 150,
    }),
  }));

  return (
    <div>
      <nav className="w-full h-[75px] relative" style={{ backgroundColor: "rgba(45, 62, 146, 1)" }}>
        <Image alt="loading" src="/logo.png" className="absolute top-[23px] left-[23px]" width={55} height={55} />
      </nav>

      <div className="bg-[rgb(149,201,65)] font-bold flex items-center justify-center w-[200px] h-[45px] ml-[30px] mt-[35px] rounded-[10px]">
        <div className="text-2xl text-white">Information</div>
      </div>

      {/* 🌟 ช่องค้นหา */}
      <div className="p-[30px] pt-[10px]">
        <Input
          placeholder="🔍 ค้นหา..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className=" w-[300px] "
        />
        <Table
          className="custom-table mt-[5px]"
          dataSource={information}
          columns={columns}
          pagination={{ pageSize: 50, showSizeChanger: false }}
          scroll={{ x: 9000, y: "60vh" }}
        />
      </div>
    </div>
  );
}
