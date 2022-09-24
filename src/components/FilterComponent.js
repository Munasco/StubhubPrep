import { useState } from "react";

export default function FilterComponent({ eventsList }) {
  const [events, setEvents] = useState(eventsList);
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);
  const renderList = (_) => {
    return events?.children.map((genre) =>
      genre?.children?.map((artist) =>
        artist?.events.map((eachEvent) => (
          <div
            key={eachEvent.id}
            style={{ margin: "1rem 0", border: "1px green solid" }}
          >
            <h1 style={{ color: "red" }}>Genre Name: {genre?.name}</h1>
            <h2>Artist Name: {artist?.name}</h2>
            <h3>Event Venue Name: {eachEvent?.venueName}</h3>
            <h3>Event Price: {eachEvent?.price}</h3>
            <h3>Event City: {eachEvent?.city}</h3>
            <h3>Event Date: {eachEvent?.date}</h3>
            <br />
          </div>
        ))
      )
    );
  };
  const filterCity = () => {
    setEvents((events) => {
      return {
        ...events,
        children: events?.children.map((genre) => {
          return {
            ...genre,
            children: genre?.children?.map((artist) => {
              return {
                ...artist,
                events: artist?.events.filter((eachEvent) =>
                  eachEvent?.city.toLowerCase().includes(city.toLowerCase())
                )
              };
            })
          };
        })
      };
    });
  };

  const filterPrice = () => {
    setEvents((events) => {
      return {
        ...eventsList,
        children: eventsList?.children.map((genre) => {
          return {
            ...genre,
            children: genre?.children?.map((artist) => {
              return {
                ...artist,
                events: artist?.events.filter(
                  (eachEvent) => eachEvent.price <= price
                )
              };
            })
          };
        })
      };
    });
  };
  const changeCity = (e) => {
    setCity((prev) => e.target.value);
  };
  const changePrice = (e) => {
    setPrice((prev) => e.target.value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={changeCity}
          value={city}
          placeholder="enter a city to filter results"
        />
        <button type="button" onClick={filterCity}>
          Filter for city only
        </button>
      </div>
      <div>
        <input
          type="number"
          placeholder="enter a price "
          onChange={changePrice}
          value={price}
        />
        <button type="button" onClick={filterPrice}>
          Filter for price only
        </button>
      </div>
      {renderList()}
    </div>
  );
}
