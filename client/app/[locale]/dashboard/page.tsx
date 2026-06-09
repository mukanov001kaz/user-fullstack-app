"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const medalData = [
    { name: "Янв", gold: 5, silver: 8, bronze: 3 },
    { name: "Фев", gold: 7, silver: 6, bronze: 4 },
    { name: "Мар", gold: 10, silver: 9, bronze: 6 },
];

const regionData = [
    { region: "Астана", users: 40 },
    { region: "Алматы", users: 65 },
    { region: "Шымкент", users: 30 },
    { region: "Павлодар", users: 70 },
    { region: "Тараз", users: 120 },
    { region: "Караганда", users: 150 },
];

const users = [
    { name: "Айбек", region: "Астана", age: 15 },
    { name: "Данияр", region: "Алматы", age: 17 },
    { name: "Руслан", region: "Шымкент", age: 14 },
];

export default function Dashboard() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* 🔹 Header */}
            <h1 className="text-2xl font-bold mb-6">TRA_KAZ Dashboard</h1>

            {/* 🔹 KPI */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <Card title="Участники" value="135" />
                <Card title="Медали" value="82" />
                <Card title="Регионы" value="12" />
            </div>

            {/* 🔹 Charts */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Медали */}
                <div className="bg-white p-4 rounded-2xl shadow">
                    <h2 className="mb-4 font-semibold">Медали</h2>

                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={medalData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="gold" />
                            <Line type="monotone" dataKey="silver" />
                            <Line type="monotone" dataKey="bronze" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Регионы */}
                <div className="bg-white p-4 rounded-2xl shadow">
                    <h2 className="mb-4 font-semibold">По регионам</h2>

                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={regionData}>
                            <XAxis dataKey="region" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="users" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 🔹 Таблица */}
            <div className="bg-white p-4 rounded-2xl shadow">
                <h2 className="mb-4 font-semibold">Последние участники</h2>

                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2">Имя</th>
                            <th className="p-2">Регион</th>
                            <th className="p-2">Возраст</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, i) => (
                            <tr key={i} className="border-b">
                                <td className="p-2">{u.name}</td>
                                <td className="p-2">{u.region}</td>
                                <td className="p-2">{u.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Card({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <p className="text-gray-500">{title}</p>
            <h2 className="text-2xl font-bold">{value}</h2>
        </div>
    );
}
