import React from "react";

interface CardProps {
  letter: string;
}

const Card: React.FC<CardProps> = ({ letter }) => {
  return (
    <div className="card m-1">
      <div className="card-body border-5 m-1 p-3">
        <h5 className="card-title">{letter}</h5>
      </div>
    </div>
  );
};

export default Card;
