import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { format } from "path/posix";
import { setFlagsFromString } from "v8";
import styles from "../styles/Home.module.css";

interface FormData {
  title: string;
  content: string;
  id: string;
}

const Home: NextPage = () => {
  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
    id: "",
  });

  return (
    <div>
      <h1 className="mt-4 text-2xl font-bold text-center">Notes</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="p-1 border-2 border-gray-600 rounded"
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="p-1 border-2 border-gray-600 rounded"
        />
        <button type="submit" className="p-1 text-white bg-blue-500 rounded">
          Add +
        </button>
      </form>
    </div>
  );
};

export default Home;
