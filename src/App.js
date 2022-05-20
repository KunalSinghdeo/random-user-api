import React, { useState, useEffect } from "react";
import Loading from "./Loading";

const url = "https://randomuser.me/api/";

function App() {
  const [loading, setLoading] = useState(true);
  const [randomPerson, setRandomPerson] = useState(null);
  const [email, setEmail] = useState("mailid");
  const [value, setValue] = useState("random person");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);

      const person = data.results[0];
      localStorage.setItem("details", JSON.stringify(person));
      console.log(person);

      const {
        phone,
        email,
        login: { password },
        name: { first, last },
        dob: { age },
        picture: { large: image },
        location: {
          street: { number, name },
        },
      } = person;

      const newPerson = {
        image,
        phone,
        email,
        password,
        age,
        street: `${number} ${name}`,
        name: `${first} ${last}`,
      };

      setRandomPerson(newPerson);
      setEmail(newPerson.email);
      setValue(newPerson.name);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.id;
      setEmail(newValue);
      setValue(randomPerson[newValue]);
    }
  };

  return (
    <main>
      <div>
        <div>
          <img src={randomPerson && randomPerson.image} alt="random user" />
          <p>{value}</p>
          <p>Email: {email}</p>
          <button type="button" onClick={fetchData}>
            {loading ? "loading..." : "refresh"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
