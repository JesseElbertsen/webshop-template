import React from "react";

// openingHours is een object uit je database
const openingHours = {
  maandag: "9:00 - 18:00",
  dinsdag: "9:00 - 18:00",
  woensdag: "9:00 - 18:00",
  donderdag: "9:00 - 18:00",
  vrijdag: "9:00 - 18:00",
  zaterdag: "10:00 - 16:00",
  zondag: "Gesloten",
};

export default function Info() {
  return (
    <div>
      {Object.entries(openingHours).map(([dag, tijd]) => (
        <div
          key={dag}
          className="grid md:grid-cols-2 grid-cols-[1fr_2fr] py-2 mx-auto gap-4 items-center border-b border-gray-300"
        >
          <div className="font-semibold">{dag}:</div>
          <div>{tijd}</div>
        </div>
      ))}
    </div>
  );
}
