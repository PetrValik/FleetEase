import React from 'react';
import { Link } from 'react-router-dom'; // Import Link komponenty pro navigaci na detail entity

const EntityList = ({ entities }) => {
  return (
    <div className="entity-list">
      {/* Mapování přes seznam entit a vytváření odkazů pro každou entitu */}
      {entities.map((entity) => (
        <div className="entity-item" key={entity.id}>
          {/* Odkaz na detailní stránku konkrétní entity */}
          <Link to={`/entity/${entity.id}`}>{entity.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default EntityList;
