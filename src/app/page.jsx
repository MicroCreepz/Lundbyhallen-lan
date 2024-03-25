"use client"

import { useRef, useState } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, getDocs } from 'firebase/firestore';


const Home = () => {
  const form = useRef();
  const [age, setAge] = useState('');
  const [phoneNumberLabel, setPhoneNumberLabel] = useState('Telefon');
  const [submitted, setSubmitted] = useState(false); // State to track form submission
  

  const handleAgeChange = (e) => {
    const newAge = parseInt(e.target.value);
    setAge(newAge);

    if (newAge < 18) {
      setPhoneNumberLabel('Telefon till anhörig');
    } else {
      setPhoneNumberLabel('Telefon');
    }
  };

  const submitPeople = async (e) => {
    e.preventDefault();
    const name = form.current[0]?.value;
    const lastname = form.current[1]?.value;
    const email = form.current[2]?.value;
    const guaridan = form.current[3]?.value;
    const age = form.current[4]?.value;

    const querySnapshot = await getDocs(collection(db, 'people'));
    const existingPeople = querySnapshot.docs.map(doc => doc.data());
    const isEmailAlreadyRegistered = existingPeople.some(person => person.email === email);

    const storageRef = ref(storage, `people/${name.name}`);

   // if (isEmailAlreadyRegistered) {
   //   alert('Denna mailen används redan, använd en ny');
    //  return; // Exit the function if the email is already registered
    //}

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
      setSubmitted(true); // Set submitted to true after successful form submission
      // Clear form fields if needed
      form.current.reset();
    } catch (error) {
      alert('Failed to register');
      console.log(error);
    }
  };



  

  return (
    <div className="py-12 bg-black/50">
      {submitted && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-black">Tack för att du registrera dig!</h2>
            <p className='text-black'>1:a April (09:00 - 21:00)</p>
          </div>
        </div>
      )}
      <div class="fixed inset-0 bg-gradient-to-br from-pink-500 to-gray-900 opacity-75"/>
      <div>
        <div class=" md:flex max-w-5xl mx-auto mb-4 border relative z-20 bg-gray-900 text-white p-6 rounded-lg ">
          <h2 class="mr-10 md:text-4xl text-5xl font-bold mb-4 mt-[60px]">Grundlig Information</h2>
          <ul>
            <li class="mb-4 text-xl"><a className='font-bold'>Datum:</a> 1:a April (09:00 - 21:00)</li>
            <li class="mb-4 text-xl"><a className='font-bold'>Pris:</a> 50kr p.p (betalas vid dörren)</li>
            <li class="mb-4 text-xl"><a className='font-bold'>Plats:</a> Lundbyhallen (<a className='underline text-blue-500' href='https://maps.app.goo.gl/3ztYZgztjs149SMz5?g_st=ic' target="_blank" >Armbågavägen 7</a>)</li>
            <li class="mb-4 text-xl"><a className='font-bold'>Åldrar:</a> Alla (12 och under med anhörig)</li>
            <li class="mb-4 text-xl"><a className='font-bold'>OBS:</a> Ta med din egna utrustning</li>
          </ul>
        </div>
      <div className=" md:flex max-w-5xl mx-auto p-6 border rounded-lg border-pink-600 bg-gray-900 relative z-20 top-20">
        <h1 className="mr-8 text-4xl font-extrabold mb-8 text-center text-white text-shadow-md">
        LBS LANbyhallen i samarbete med   
        <img src="/pictures/Boras.png" alt="Image 2" class="w-[500px] max-w-5xl mx-auto mb-4 relative text-white p-6"/>
        </h1>
        <form ref={form} onSubmit={submitPeople}>
          <div className="mb-4">
            <label className="block mb-1 text-white">Namn</label>
            <input
              type="text"
              name="firstName"
              className="w-full  border rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
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
            <label className="block mb-1 text-white">Ålder (anhörig ska med under 12år)</label>
            <input
              type="number"
              name="Ålder"
              className="w-full border rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              min={1}
              required
              value={age}
              onChange={handleAgeChange}
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
          <div className="mb-4" id="phoneNumberSection">
            <label className="block mb-1 text-white">{phoneNumberLabel}</label>
            <input
              type="tel"
              name="anhörig telefon"
              className="w-full border rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
              />
            </div>
            <button
              type="submit"
              className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              Registrera
            </button>
          </form>
        </div>
        </div>
         
        <div className="flex-wrap justify-center flex max-w-md mx-auto mt-20 relative p-6">
          <img src="/pictures/lbs.png" alt="Image 1" class="max-w-md mx-auto relative text-white p-6" />
          <a href="">LBS Systemutveckling Sy21</a>
        </div>
      </div>
    );
  };
  
  export default Home;
  
