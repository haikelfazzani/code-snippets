import React, { useState } from 'react';

export default function Dropdown ({ title, data, onSelect }) {

  const [isDropOpen, setIsDropOpen] = useState(false);

  return (
    <div className="dropdown mr-1">
      <button
        type="button"
        className="btn btn-dark bg-main dropdown-toggle border-0"
        onClick={() => { setIsDropOpen(!isDropOpen) }}><i className="fa fa-tags"></i> {title}
      </button>

      <div className="dropdown-menu" style={{ display: isDropOpen ? 'block' : 'none' }}>
        {data.map((d, i) =>
          <span className="dropdown-item" key={'dta' + i} onClick={() => { onSelect(d) }}>
            <span className="w-100 badge badge-dark font-weight-normal">{d}</span>
          </span>)}
      </div>
    </div>
  );
}