import React from 'react';
import AirSnippets from '../services/AirSnippets';

export default function AddSnippet () {

  const onAddSnippet = (e) => {
    e.preventDefault();

    let snippet = Array.from(e.target.elements).reduce((a, el) => {
      if (el.value.length > 0) a[el.name] = el.value.trim();
      return a
    }, {});

    AirSnippets.createSnippet(snippet)
      .then(r => { });
  }

  return (<div className="content py-3 mb-5">

    <h2 className="text-muted"><i className="fa fa-plus"></i> Add snippet</h2>

    <form onSubmit={onAddSnippet}>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" className="form-control" id="title" name="title" required />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea className="form-control" id="description" name="description" rows="5"></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="code">code</label>
        <textarea className="form-control" id="code" name="code" rows="5"></textarea>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="image">image link</label>
            <input type="text" className="form-control" id="image" name="image" required />
          </div>
        </div>

        <div className="col">
          <div className="form-group">
            <label htmlFor="external_link">External link</label>
            <input type="text" className="form-control" id="external_link" name="external_link" required />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="tags">tags</label>
            <input type="text" className="form-control" id="tags" name="tags" required />
          </div>
        </div>

        <div className="col">
          <div className="form-group">
            <label htmlFor="language">language</label>
            <input type="text" className="form-control" id="language" name="language" required />
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary"><i className="fa fa-plus"></i> add</button>
    </form>
  </div>);
}