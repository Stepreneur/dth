"use client";

import { useEffect, useState } from "react";
import { Table, Input, Badge, Spin, Empty, Card, Statistic } from "antd";
import Image from "next/image";

export default function Home() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState(""); // 🌟 State สำหรับเก็บค่าค้นหา
  const [filteredData, setFilteredData] = useState([]); // 🌟 เก็บข้อมูลที่ผ่านการกรอง
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  const titles = Object.keys(data[0] || {}).filter((title) => title.toLowerCase() !== "id");

  // 🌟 กรองข้อมูลตามค่าที่พิมพ์
  useEffect(() => {
    setTableLoading(true);
    const timer = setTimeout(() => {
      const filtered = data.filter((item) =>
        titles.some((title) => item[title]?.toString().toLowerCase().includes(searchText.toLowerCase()))
      );
      setFilteredData(filtered);
      setTableLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchText, data]);

  const information = filteredData.map((item, index) => ({
    key: index + 1,
    ...titles.reduce((acc, title) => {
      acc[title] = item[title];
      return acc;
    }, {}),
  }));

  // เพิ่มสีสันให้กับ columns และการจัดการแต่ละคอลัมน์
  const columns = titles.map((title) => {
    // กำหนดความกว้างเริ่มต้นสำหรับแต่ละคอลัมน์ตามขนาดของชื่อคอลัมน์
    const baseWidth = Math.max(150, (title.length * 12) + 40);
    
    // สร้างคอลัมน์พิเศษสำหรับ status หรือคอลัมน์ที่ต้องการเพิ่มลูกเล่น
    if (title.toLowerCase().includes("status")) {
      return {
        title: (
          <div className="font-bold whitespace-normal">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </div>
        ),
        dataIndex: title,
        key: title,
        render: (text) => {
          let color = "green";
          if (text?.toString().toLowerCase().includes("pending")) color = "gold";
          if (text?.toString().toLowerCase().includes("error") || 
              text?.toString().toLowerCase().includes("fail")) color = "red";
          if (text?.toString().toLowerCase().includes("process")) color = "blue";
          
          return <Badge status={color} text={text} />;
        },
        width: Math.max(150, baseWidth)
      };
    }
    
    // ทำให้ Username ติดซ้ายเสมอและมี style พิเศษ
    if (title.toLowerCase() === "username") {
      return {
        title: (
          <div className="font-bold text-blue-600 whitespace-normal">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </div>
        ),
        dataIndex: title,
        key: title,
        fixed: "left",
        width: 180,
        render: (text) => (
          <div className="font-medium text-blue-700">{text}</div>
        )
      };
    }
    
    // หากเป็นคอลัมน์ชื่อหรือรายละเอียด ให้ความกว้างมากขึ้น
    if (title.toLowerCase().includes("name") || 
        title.toLowerCase().includes("description") || 
        title.toLowerCase().includes("detail")) {
      return {
        title: (
          <div className="font-bold whitespace-normal">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </div>
        ),
        dataIndex: title,
        key: title,
        width: Math.max(200, baseWidth)
      };
    }

    // สำหรับคอลัมน์เกี่ยวกับเงิน
    if (title.toLowerCase().includes("price") || 
        title.toLowerCase().includes("amount") || 
        title.toLowerCase().includes("cost")) {
      return {
        title: (
          <div className="font-bold whitespace-normal">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </div>
        ),
        dataIndex: title,
        key: title,
        width: Math.max(150, baseWidth),
        render: (text) => {
          const value = parseFloat(text);
          if (!isNaN(value)) {
            return (
              <div className={value >= 0 ? "text-green-600" : "text-red-600"}>
                {value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </div>
            );
          }
          return text;
        }
      };
    }
    
    // สำหรับคอลัมน์วันที่
    if (title.toLowerCase().includes("date") || 
        title.toLowerCase().includes("time")) {
      return {
        title: (
          <div className="font-bold whitespace-normal">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </div>
        ),
        dataIndex: title,
        key: title,
        width: Math.max(170, baseWidth)
      };
    }
    
    // Default for other columns
    return {
      title: (
        <div className="font-bold whitespace-normal">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </div>
      ),
      dataIndex: title,
      key: title,
      width: baseWidth
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern NavBar with Gradient */}
      <nav className="w-full h-[75px] relative bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg">
        <div className="container mx-auto flex items-center h-full">
          <Image alt="logo" src="/logo.png" className="ml-6" width={55} height={55} />
          <h1 className="text-white text-xl font-bold ml-4">ระบบจัดการข้อมูล</h1>
          
          <div className="ml-auto mr-6">
            <div className="bg-white rounded-full px-4 py-2 text-blue-800 font-medium shadow-md">
              Admin Dashboard
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Head section with stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <Statistic 
              title="จำนวนข้อมูลทั้งหมด" 
              value={data.length} 
              prefix={<div className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></div>}
            />
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <Statistic 
              title="ผลการค้นหา" 
              value={filteredData.length} 
              prefix={<div className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></div>}
            />
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <Statistic 
              title="อัตราส่วนการกรอง" 
              value={data.length ? Math.round((filteredData.length / data.length) * 100) : 0} 
              suffix="%" 
              prefix={<div className="inline-block w-3 h-3 rounded-full bg-purple-500 mr-2"></div>}
            />
          </Card>
        </div>

        {/* Title and Search */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div className="bg-gradient-to-r from-green-500 to-green-400 font-bold flex items-center justify-center px-6 py-3 rounded-lg shadow-md">
            <div className="text-2xl text-white">ข้อมูลทั้งหมด</div>
          </div>
          
          <div className="mt-4 md:mt-0 relative">
            <Input
              placeholder="🔍 ค้นหาข้อมูล..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-[300px] rounded-full py-2 pl-4 pr-10 border-2 border-blue-200 focus:border-blue-500 shadow-sm"
              suffix={searchText && (
                <span 
                  className="cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchText("")}
                >
                  ✕
                </span>
              )}
            />
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-md p-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spin size="large" tip="กำลังโหลดข้อมูล..." />
            </div>
          ) : information.length > 0 ? (
            <Table
              className="custom-table"
              dataSource={information}
              columns={columns}
              pagination={{ 
                pageSize: 10, 
                showSizeChanger: true, 
                pageSizeOptions: ['10', '20', '50'],
                showTotal: (total) => `รวมทั้งหมด ${total} รายการ` 
              }}
              scroll={{ x: "max-content", y: "60vh" }}
              loading={tableLoading}
              rowClassName={(record, index) => index % 2 === 0 ? 'bg-gray-50' : ''}
              bordered
              size="middle"
              tableLayout="fixed"
              summary={() => (
                <Table.Summary fixed="bottom">
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={titles.length}>
                      <div className="text-right font-medium">
                        แสดงข้อมูล {filteredData.length} จาก {data.length} รายการ
                      </div>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          ) : (
            <Empty 
              description="ไม่พบข้อมูลที่ค้นหา" 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} ระบบจัดการข้อมูล | ออกแบบและพัฒนาโดยทีมงาน
        </div>
      </div>
    </div>
  );
}