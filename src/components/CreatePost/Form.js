import React, { useEffect, useState } from "react";
import GameList from "../../../shared/Data";
import { useSession } from "next-auth/react";
import app from "../../../shared/FirebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import {
    getDownloadURL, getStorage,
    ref, uploadBytes
} from "firebase/storage";
import Toast from "../../components/Toast";
import axios from "axios";

function Form() {
    const [inputs, setInputs] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [file, setFile] = useState();
    const [submit, setSubmit] = useState(false);

    const { data: session } = useSession();
    const db = getFirestore(app);
    const storage = getStorage(app);

    console.log(session, "session");
    //whenever the session changes, we add the user info into the input that will be submitted to be stored in the DB
    useEffect(() => {
        if (session) {
            setInputs((values) => ({ ...values, userName: session.user?.name }));
            setInputs((values) => ({ ...values, userImage: session.user?.image }));
            setInputs((values) => ({ ...values, email: session.user?.email }));
        }
    }, [session]);

    //when the submit button is clicked, call savePost 
    useEffect(() => {
        if (submit == true) {
            savePost();
        }

    }, [submit])

    //when user enters data in the form, we update the inputs state. e.target.name is the name of the input field and e.target.value is the value of the input field 
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    //when the form is submitted, we set the submit state to true
    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowToast(true);
        // const storageRef = ref(storage, 'ninja-player/'+file.name);

        // uploadBytes(storageRef, file).then((snapshot) => {
        //     console.log('Uploaded a blob or file!');
        //   }) ;
        console.log(inputs);

        axios.post(`/api/posts?email=${session?.user.email}`, inputs);
    };

    return (
        <div className="mt-4">
            {showToast ? (
                <div className="absolute top-10 right-10">
                    <Toast
                        msg={"Post Created Successfully"}
                        closeToast={() => setShowToast(false)}
                    />
                </div>
            ) : null}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                    onChange={handleChange}
                    className="w-full mb-4 border-[1px] p-2 rounded-md"
                />
                <textarea
                    name="desc"
                    className="w-full mb-4 
        outline-blue-400 border-[1px] 
        p-2 rounded-md"
                    required
                    onChange={handleChange}
                    placeholder="Write Description here"
                />

                <input
                    type="date"
                    name="date"
                    required
                    onChange={handleChange}
                    className="w-full mb-4 border-[1px] p-2 rounded-md"
                />
                <input
                    type="text"
                    placeholder="Location"
                    name="location"
                    required
                    onChange={handleChange}
                    className="w-full mb-4 border-[1px] p-2 rounded-md"
                />
                <input
                    type="text"
                    placeholder="Zip"
                    name="zip"
                    required
                    onChange={handleChange}
                    className="w-full mb-4 border-[1px] p-2 rounded-md"
                />
                <select
                    name="game"
                    onChange={handleChange}
                    required
                    className="w-full mb-4 border-[1px] p-2 rounded-md"
                >
                    <option disabled defaultValue>
                        Select Game
                    </option>
                    {GameList.map((item) => (
                        <option key={item.id}>{item.name}</option>
                    ))}
                </select>
                {/* <input
          type="file"
          onChange={(e)=>setFile(e.target.files[0])}
          accept="image/gif, image/jpeg, image/png"
          className="mb-5 border-[1px] w-full"
        /> */}
                <button
                    type="submit"
                    className="bg-blue-500 w-full p-1 
rounded-md text-white"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Form;
