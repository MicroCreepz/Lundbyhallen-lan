"use client"

import { useRef } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const Home = () => {
  const form = useRef();

  const submitPeople = (e) => {
    e.preventDefault();
    const name = form.current[0]?.value;
    const lastname = form.current[1]?.value;
    const email = form.current[2]?.value;
    const guaridan = form.current[3]?.value;
    const age = form.current[4]?.value;

    const storageRef = ref(storage, `people/${name.name}`);

    uploadBytes(storageRef).then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then(
          (downloadUrl) => {
            savePeople({
              name,
              lastname,
              email,
              guaridan,
              age,
            });
          },
          (error) => {
            console.log(error);
            savePeople({
              name,
              lastname,
              email,
              guaridan,
              age,
            });
          }
        );
      },
      (error) => {
        console.log(error);
        savePeople({
          name,
          lastname,
          email,
          guaridan,
          age,
        });
      }
    );
  };

  const savePeople = async (people) => {
    try {
      const collectionRef = collection(db, 'people');
      await addDoc(collectionRef, people);
      window.location.reload(false);
      alert('Du har registrerat dig');
    } catch (error) {
      alert('Failed to add portfolio');
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black relative overflow-hidden">
      <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-gradient-to-br from-pink-500 to-gray-900 opacity-75">
      <div className="max-w-md mx-auto p-6 border rounded-lg border-pink-600 bg-gray-900 relative z-20 shadow-lg top-20">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-white text-shadow-md">
        Registrering för Lundbyhallen LAN, av <br/>LBS Borås och Borås Stad
        </h1>
        <form ref={form} onSubmit={submitPeople}>
          <div className="mb-4">
            <label className="block mb-1 text-white">Namn</label>
            <input
              type="text"
              name="firstName"
              className="w-full border rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-white">Efternamn</label>
            <input
              type="text"
              name="lastName"
              className="w-full border rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-white">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-white">anhörig telefon</label>
            <input
              type="tel"
              name="anhörig telefon"
              className="w-full border rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-white">Ålder (vårdnadshavare ska med under 12)</label>
            <input
              type="number"
              name="Ålder"
              className="w-full border rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              min={1}
              required
            />
          </div>
          <button
            type="submit"
            className="btn"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="absolute left-20 w-auto bg-gray-800 text-white p-6 top-40 md:mt-0 md:ml-8 rounded-lg">
        <h2 className="text-5xl font-bold mb-4">Grundlig Information</h2>
        <ul>
          <li className="mb-4 text-xl">Datum: 1a April</li>
          <li className="mb-4 text-xl">Pris: 50kr per person</li>
          <li className="mb-4 text-xl">Plats: Lundbyhallen (Armbågavägen 7) </li>
          <li className='mb-4 text-xl'>Åldrar: Alla (12 och under med anhörig)</li>
        </ul>
      </div>
      <div className="absolute right-20 top-20 flex flex-col items-end">
        <img src="data:image/png;base64,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" alt="Image 1" className="mb-4" style={{ width: '300px', height: 'auto' }} />
        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIRERIREhEYEhEYGBESGBEYGBEYGBgYGBocGRkYHRgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0QC40NTEBDAwMBgYGEAYGEDEdFh0xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIALEBHAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQcBBAYIAwL/xABKEAABAwIDAwcJAwkECwAAAAABAAIDBBEFEiEGBzETIkFRVGFxFBUWMnOBkZOxNELSIzM1UmJyobLhF4LBwiQlNkNjhJKio7PR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AK2REQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARL96XQES/el0BEv3pfvQES/el+9ARL96X70BEuOtL96AiX70v3oCJdEBERAREQEREBERAREQEREBERAREQEREBERB6V9F6HssfwT0Xoeyx/BTKIIb0Xoeyx/BPReh7LH8FMoghfReh7JH8Fn0Xoeyx/BTKIIb0Xoeyx/BY9FqHssfwU0iCG9FqHssfwT0Xoeyx/BTKIIb0Xoeyx/BPReh7LH8FMoghvRah7LH8E9F6HssfwUyiCrd6+D01PRMfDCyNxlY0uaLG1joqkV175vsEftmfQqlEBZRYQEWUQYRZRAWLLKwgLKIgIiICwsogIiIMLKIgWRYWUHql7g1pceABJ92q4t29DDBfnyaX/3buhdjVfm5P3X/AEK8sv4u8X/UoPUWG1rKmGOeMkse0PaSLGx7ltKC2I/RtH7Jn0U6g53aDbKjw+RsVQ54e5ucZWOcLXtxCiv7UcM/Xk+W5cZvn+2wexP8y43B8Eqa1z2U0fKOYA5wu0WBNhxQXM3efhZIHKPHeY32C6jCsVgq4xLTytlZwzNPA9RHEHxXnvFdla6kj5WencyO4aXXa4Anhe3BbWwONPo6+EtceTleyGRl9HNebBxHW0kG/j1oPRBK5HF94eG0riwz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" alt="Image 2" style={{ width: '300px', height: 'auto' }} />
      </div>
      </div>
    </div>
  );
};

export default Home;
