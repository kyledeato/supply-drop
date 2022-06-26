/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserForm({ mode }) {
<<<<<<< Updated upstream
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log({ mode });
    switch (mode) {
      case "login":
        break;
      case "registration":
        break;
      case "edit":
        axios
          .get("http://localhost:8000/api/auth", {
            withCredentials: true,
          })
          .then((res) => {
            setUser(res.data);
            console.log(res.data);
          })
          .catch((err) => console.log(err));

        break;

      default:
        return;
=======
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        console.log({ mode });
        switch (mode) {
            case "login":
                break;
            case "registration":
                break;
            case "edit":
                axios
                    .get("/api/auth", {
                        withCredentials: true,
                    })
                    .then((res) => {
                        setUser(res.data);
                        console.log(res.data);
                    })
                    .catch((err) => console.log(err));

                break;

            default:
                return;
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        const inputs = e.currentTarget.querySelectorAll("input");
        let url;
        let data = new URLSearchParams();

        inputs.forEach((input) => {
            data.append(input.name, input.value);
        });

        switch (mode) {
            case "login":
                url = "http://localhost:8000/api/user/login";

                axios
                    .post(url, data)
                    .then((res) => {
                        navigate("/");
                    })
                    .catch((err) => {
                        const errResData = err.response.data.errors;
                        let errArr = {};

                        for (const key in errResData) {
                            errArr[key] = errResData[key]["message"];
                        }
                        setErrors(errArr);
                    });
                break;
            case "register":
                url = "/api/user/register";

                axios
                    .post(url, data)
                    .then((res) => {
                        navigate("/");
                    })
                    .catch((err) => {
                        const errResData = err.response.data.errors;
                        let errArr = {};

                        for (const key in errResData) {
                            errArr[key] = errResData[key]["message"];
                        }
                        setErrors(errArr);
                    });
                break;
            case "edit":
                url = `/api/user/${user._id}`;

                axios
                    .put(url, data)
                    .then((res) => {
                        navigate("/");
                    })
                    .catch((err) => {
                        const errResData = err.response.data.errors;
                        let errArr = {};

                        for (const key in errResData) {
                            errArr[key] = errResData[key]["message"];
                        }
                        setErrors(errArr);
                    });

                break;
            default:
                break;
        }
>>>>>>> Stashed changes
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const inputs = e.currentTarget.querySelectorAll("input");
    let url;
    let data = new URLSearchParams();

    inputs.forEach((input) => {
      data.append(input.name, input.value);
    });

    switch (mode) {
      case "register":
        url = "http://localhost:8000/api/user/register";

        axios
          .post(url, data)
          .then((res) => {
            navigate("/");
          })
          .catch((err) => {
            const errResData = err.response.data.errors;
            let errArr = {};

            for (const key in errResData) {
              errArr[key] = errResData[key]["message"];
            }
            setErrors(errArr);
          });
        break;
      case "edit":
        url = `http://localhost:8000/api/user/${user._id}`;

        axios
          .put(url, data)
          .then((res) => {
            navigate("/");
          })
          .catch((err) => {
            const errResData = err.response.data.errors;
            let errArr = {};

            for (const key in errResData) {
              errArr[key] = errResData[key]["message"];
            }
            setErrors(errArr);
          });

        break;
      default:
        break;
    }
  }

  const renderErrorMessage = (name) =>
    errors[name] && <div className="error">{errors[name]}</div>;

  function FormField({ name, label, type, defaultValue }) {
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          type={type || "text"}
          name={name}
          id={name}
          defaultValue={defaultValue || ""}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {(mode === "register" || mode === "edit") && (
        <>
          <FormField
            name={"firstName"}
            label={"First Name"}
            defaultValue={user.firstName || ""}
          />
          {renderErrorMessage("firstName")}
          <FormField
            name={"lastName"}
            label={"Last Name"}
            defaultValue={user.lastName || ""}
          />
          {renderErrorMessage("lastName")}
          <FormField
            name={"username"}
            label={"Username"}
            defaultValue={user.username || ""}
          />
          {renderErrorMessage("username")}
        </>
      )}
      <FormField
        name={"email"}
        label={"Email"}
        defaultValue={user.email || ""}
      />
      {renderErrorMessage("email")}
      <FormField
        name={"password"}
        label={"Password"}
        type={"password"}
        defaultValue={user.password || ""}
      />
      {renderErrorMessage("password")}
      {mode === "register" && (
        <>
          <FormField
            name={"confirmPassword"}
            label={"Password Confirmation"}
            type={"password"}
          />
          {renderErrorMessage("confirmPassword")}
        </>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
