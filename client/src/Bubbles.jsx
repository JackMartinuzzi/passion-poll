import React, { useState } from 'react';
import Vertex from './Vertex.jsx';

function Bubbles({ nodes }) {
  const [] = useState('');
  return (
    <div className="bubbles">
      {nodes.map((node, index) => (
        <Vertex key={index} node={node} />
      ))}
    </div>
  );
}

export default Bubbles;
