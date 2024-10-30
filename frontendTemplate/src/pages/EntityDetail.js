import React from 'react';
import { useParams } from 'react-router-dom'; // Hook pro přístup k parametrům URL

const EntityDetail = () => {
  // Získání ID entity z URL parametrů
  const { id } = useParams();

  return (
    <div className="entity-detail">
      <h2>Entity Detail - ID: {id}</h2>
      {/* Detailní informace o entitě by zde byly načteny a zobrazeny */}
    </div>
  );
};

export default EntityDetail;
