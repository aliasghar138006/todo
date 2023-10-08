import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import ProfileEdit from "../modules/ProfileEdit";
import ProfileData from "../modules/ProfileData";

function ProfilePage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    console.log(data);
    setData(data.data);
  };

  const submitHandler = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, lastName, password }),
    });

    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      toast.success("Success Send!");
    } else toast.error("Error Occured");
    fetchData();
  };
  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>
      {!data.name ? (
        <>
          <ProfileEdit
            value={name}
            title="Name:"
            onChange={(e) => setName(e.target.value)}
          />
          <ProfileEdit
            value={lastName}
            title="lastName:"
            onChange={(e) => setLastName(e.target.value)}
          />
          <ProfileEdit
            value={password}
            title="Password:"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={submitHandler}>Submit</button>
        </>
      ) : (
        <>
          <ProfileData data={data} />
          <button onClick={() => setData({})}>Edit</button>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
