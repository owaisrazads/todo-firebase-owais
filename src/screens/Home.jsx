import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore"; 
import { db } from "../config/firebaseConfig";

const Home = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

//   fetch data from firestore

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() });
      });
      setData(fetchedData);
    };

    fetchData();
  }, []);

//   add todo function

  const handleForm = async (e) => {
    e.preventDefault();

    if (text === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Input field Empty!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      return;
    }
// Add Data to firestore

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todoText: text,
        createdAt: new Date()
      });

      console.log("Document successfully written to Firestore");
      setData([...data, { id: docRef.id, todoText: text }]);
      setText('');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };


//   Delete Function

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      const newData = data.filter(item => item.id !== id);
      setData(newData);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <div>
      <div className="flex justify-between bg-gray-300 p-2">
        <p>User Name</p>
        <img src="" alt="user img" />
      </div>

      <div>
        <form className="flex justify-center gap-2 mt-5" onSubmit={handleForm}>
          <input
            type="text"
            className="w-[60%]"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="bg-blue-700 text-white p-2">
            Add
          </button>
        </form>
      </div>

      <div className="mt-5 flex flex-col ">
        {data.map((item) => (
          <div key={item.id} className=" p-2 mt-2 text-center">
            <div className="flex gap-3 items-center">
              <p className="text-lg">{item.todoText}</p>
              <button className="bg-red-600 p-2 rounded-md text-white text-sm" onClick={() => handleDelete(item.id)}>Delete</button>
              {/* Add your edit functionality button here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
