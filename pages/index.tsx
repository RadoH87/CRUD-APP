import type { GetServerSideProps } from "next";
import { prisma } from "../lib/prisma";
import { useState } from "react";
import { useRouter } from "next/router";

interface Notes {
  notes: {
    id: string;
    title: string;
    content: string;
  }[];
}

interface FormData {
  title: string;
  content: string;
  id: string;
}

const Home = ({ notes }: Notes) => {
  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
    id: "",
  });

  //refreshData function
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function create(data: FormData) {
    try {
      await fetch("http://localhost:3000/api/create", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        setForm({ title: "", content: "", id: "" });
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data: FormData) => {
    try {
      await create(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="mt-4 text-2xl font-bold text-center">Notes</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
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
      <div className="w-auto min-w[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {notes.map((note) => (
            <li key={note.id} className="p-2 border-b border-gray-600">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="font-bold">{note.title}</h3>
                  <p className="text-sm">{note.content}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma.note.findMany({
    select: {
      title: true,
      id: true,
      content: true,
    },
  });
  return {
    props: {
      notes,
    },
  };
};
