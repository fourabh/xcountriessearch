import React, { useEffect, useState } from "react";

const CountryCard = ({ flag, name }) => {
  return (
    <div
      className="countryCard"
      style={{
        border: "1px solid #dfd3d3",
        borderRadius: "8px",
        height: "150px",
        width: "150px",
        padding: "4px",
        margin: "4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <img src={flag} alt={name} height="100px" width="100px" />
      <h2>{name}</h2>
    </div>
  );
};

const Countries = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
    
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = data.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <input
          type="text"
          style={{ width: "60vw", marginLeft: "15rem", height: "4vh" }}
          placeholder="Search For Countries..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "8px",
          padding: "8px",
          marginLeft: "4vw",
        }}
      >
        {filteredCountries.map((card) => (
          <CountryCard
            key={card.cca3} 
            flag={card.flags.png}
            name={card.name.common}
          />
        ))}
      </div>
    </>
  );
};

export default Countries;
