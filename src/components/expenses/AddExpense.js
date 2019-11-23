import React, { useState } from "react";
import { connect } from "react-redux";
import { addReceipt } from "../../dux/reducers/expenseDux";
import "./AddExpense.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import { v4 as randomString } from "uuid";

function AddExpense(props) {
  const [state, handleChange] = useState({
    store: "",
    amount: "",
    description: ""
  });
  let [isUploading, toggleUploading] = useState(false);
  const [images, fn] = useState([]);
  let [url1, setPicture] = useState("http://via.placeholder.com/200x200");
  const [value, setValue] = useState("");

 function getSignedRequest ([file]) {
    toggleUploading(!isUploading);
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
    axios
      .get('/api/signs3', {
        params: {
          'file-name': fileName,
          'file-type': file.type,
        },
      })
      .then(response => {
        const { signedRequest, url } = response.data;
        uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

 function uploadFile (file, signedRequest, url) {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };
    axios
      .put(signedRequest, file, options)
      .then(response => {
        toggleUploading(isUploading=false);
        setPicture(url);
      })
      .catch(err => {
        toggleUploading(!isUploading);
        console.log(err);        
      });
  };

  function submitReceipt() {
    console.log(props.match.params.id);
    const { description, store, amount, url } = state;
    if(amount>0){
      axios
      .post(`/api/expense/noimage/${props.match.params.propId}`, {
        store,
        amount,
        description
      })
      .then(res => {
        console.log(res.data);
      });
    }else {
    axios
      .post(`/api/expense/${props.match.params.propId}`, {
        store,
        description,
        url
      })
      .then(res => {
        console.log(res.data);
      });
    }
  }
  return (
    <div className="add-expense-form">
  
        <img
        style={{
          width: 100,
          height: 100,
          position: 'relative'}}
           src={url1} alt="" width="450px" />

        <Dropzone
          id='dropzone'
          onDropAccepted={getSignedRequest}
          accept="image/*"
          multiple={false}
        >
          <div>
            {isUploading ? <GridLoader /> : <p>Drop File or Click Here</p>}
          </div>
        </Dropzone>
     
        <input
          placeholder="store"
          name="store"
          value={state.store}
          onChange={e =>
            handleChange({ ...state, [e.target.name]: e.target.value })
          }
        />
        <input
          placeholder="amount"
          name="amount"
          value={state.amount}
          onChange={e =>
            handleChange({ ...state, [e.target.name]: e.target.value })
          }
        />
        <input
          placeholder="description"
          name="description"
          value={state.description}
          onChange={e =>
            handleChange({ ...state, [e.target.name]: e.target.value })
          }
        />
        <button onClick={() => submitReceipt()}>Add expense</button>
        <button onClick={() => props.toggleForm()}>cancel</button>
      </div>
  );
}


export default withRouter(connect(null, { addReceipt })(AddExpense));
