จากที่ได้รับมอยหมายให้ทำแอปพลิเคชัน Salad Maker! ซึ่งสามารถทำได้โดยดังนี้

1. หน้าส่วนผสม:
○ ดึงและแสดงส่วนผสมจาก REST API โดยจัดหมวดหมู่เป็นผัก ผลไม้ ท็อปปิ้ง โปรตีน และน้ำสลัด
○ อนุญาตให้ผู้ใช้เลือกส่วนผสมและสร้างสูตรอาหารใหม่
○ ปุ่มส่งเพื่อ "โพสต์" สูตรอาหารใหม่ไปยัง REST API

2. หน้าสูตรอาหาร:
○ ดึงและแสดงรายการสูตรอาหารที่สร้างจาก REST API
○ ปุ่มลบ เพื่อลบสูตรอาหารโดยใช้คำขอ "DELETE" ไปยัง REST API
○ ปุ่มแก้ไข เพื่อไปที่หน้าแก้ไขสูตรอาหาร

3. หน้าแก้ไขสูตรอาหาร:
○ ในส่วนนี้ยังทำไม่ได้ค่ะ สามารถดูรายละเอียดได้ว่ามาอะไรบ้าง เเต่ลบหรือแก้ไขยังไม่ได้ค่ะ

ส่วนนี้เป็นการอธิบายในการทำงานว่าสามารถทำอะไรไปได้เเล้วบ้าง เเละในส่วนถัดไปเป็นการบอกการตั้งค่าเบื้องต้นที่ใช้ในการ Run Project เพื่อตรวจสอบถวามถูกต้องต่อไปค่ะ 

## Getting Started Rest API

โดยใช้ Json Server ในการสร้าง API เพื่อทำการ GET POST DELETE

this is a [Json server](https://www.npmjs.com/package/json-server) 

Install to project:

```bash
npm install json-server
```

First, run the API server:

```bash
npx json-server --watch data/db.json --port 4000
```
## Getting Started Rest Library

1.[MaterialUI & Icon](https://mui.com/material-ui/getting-started/installation/)

2. [lucide & Icon](https://lucide.dev/guide/installation)

3. [Tailwindcss](https://tailwindcss.com/docs/installation)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
