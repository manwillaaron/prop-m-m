import React, { useState } from "react";
import { connect } from "react-redux";
import { addReceipt } from "../../dux/reducers/expenseDux";
import "./AddExpense.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import { v4 as randomString } from "uuid";
import Swal from "sweetalert2";

function AddExpense(props) {
  let [state, handleChange] = useState({
    store: "",
    amount: "",
    description: "",
    isUploading: false,
    url1: "http://via.placeholder.com/200x200"
  });

  function getSignedRequest([file]) {
    handleChange({
      ...state,
      isUploading: true
    });
    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;
    axios
      .get("/api/signs3", {
        params: {
          "file-name": fileName,
          "file-type": file.type
        }
      })
      .then(response => {
        const { signedRequest, url } = response.data;
        uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function uploadFile(file, signedRequest, url) {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };
    axios
      .put(signedRequest, file, options)
      .then(response => {
        handleChange({ ...state, url1: url, isUploading:true });
      })
      .catch(err => {
        handleChange((state.isUploading = false));
        console.log(err);
      });
    axios
      .post("/api/expense", {
        url
      })
      .then(res => {
        console.log(res.data);
        handleChange({
          ...state,
          amount: res.data,
          isUploading: false,
          url1: url
        });
      })
      .catch(err => {
        Swal.fire(err.response.data);
        handleChange({
          ...state,
          isUploading: false
        });
      });
  }

  function submitReceipt() {
    console.log({ props }, props.match.params.id);
    const { description, store, amount, url } = state;
    if (+amount > 0) {
      axios
        .post(`/api/new/receipt/${props.match.params.propId}`, {
          store,
          amount,
          description,
          url
        })
        .then(res => {
          Swal.fire("Receipt input success");
        });
    } else {
      Swal.fire("Please upload an Image or enter an amount.");
    }
  }

  return (
    <div className="add-expense-form">
      <img
        style={{
          width: 100,
          height: 100,
          position: "relative"
        }}
        src={state.url1}
        alt=""
        width="450px"
      />

      <Dropzone
        id="dropzone"
        onDropAccepted={getSignedRequest}
        accept="image/*"
        multiple={false}
      >
        <div>
          {state.isUploading ? <GridLoader /> : <p>Drop File or Click Here</p>}
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
        value={`$${state.amount}`}
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
