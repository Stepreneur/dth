"use client"
import React, { useEffect } from 'react'

const Page = () => {
  useEffect(() => {
   window.location.href = 'data';
  }, []); // [] = ทำแค่ตอนเข้าหน้า

  return (
    <div>page</div>
  )
}

export default Page
