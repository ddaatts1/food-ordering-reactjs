import React, {useState, useRef} from "react";
import validator from "validator";
import './RegisterForm.css'

const SignUp = () => {
    const [avatar, setAvatar] = useState(null);

    const aboutRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const emailRef = useRef(null);
    const filepickerRef = useRef(null);
    const fullnameRef = useRef(null);
    const passwordRef = useRef(null);

    const signup = async () => {
        const {about, fullname, email, password, confirmPassword} = getInputs();
        if (
            isSignupValid({
                about,
                fullname,
                email,
                password,
                confirmPassword,
            })
        ) {
            alert("You account was created successfully");
        }
    };

    const getInputs = () => {
        const about = aboutRef.current.value;
        const fullname = fullnameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        return {about, fullname, email, password, confirmPassword};
    };

    const isSignupValid = ({
                               about,
                               fullname,
                               email,
                               password,
                               confirmPassword,
                           }) => {
        if (!avatar) {
            alert("Please upload your avatar");
            return false;
        }
        if (validator.isEmpty(fullname)) {
            alert("Please input your fullname");
            return false;
        }
        if (!validator.isEmail(email)) {
            alert("Please input your email");
            return false;
        }
        if (
            validator.isEmpty(password) ||
            !validator.isLength(password, {min: 6})
        ) {
            alert(
                "Please input your password. You password must have at least 6 characters"
            );
            return false;
        }
        if (validator.isEmpty(confirmPassword)) {
            alert("Please input your confirm password");
            return false;
        }
        if (password !== confirmPassword) {
            alert("Confirm password and password must be the same");
            return false;
        }
        if (validator.isEmpty(about)) {
            alert("Please input your description");
            return false;
        }
        return true;
    };

    const uploadAvatar = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setAvatar(readerEvent.target.result);
        };
    };

    return (
        <div className="signup">
            <div className="signup__content">
                <div className="signup__container">
                    <div className="signup__title">Sign Up</div>
                </div>
                <div className="signup__subtitle"></div>
                <div className="signup__form">
                    {avatar && (
                        <div
                            className="signup__user-avatar"
                            onClick={() => filepickerRef.current.click()}
                        >
                            <img src={avatar} alt="avatar"/>
                        </div>
                    )}
                    {!avatar && (
                        <div
                            onClick={() => filepickerRef.current.click()}
                            className="signup__upload-container"
                        >
                            Choose File
                        </div>
                    )}
                    <input
                        className="signup__upload-avatar"
                        hidden
                        onChange={uploadAvatar}
                        ref={filepickerRef}
                        type="file"
                    />
                    <input type="text" placeholder="Fullname" ref={fullnameRef}/>
                    <input type="text" placeholder="Email" ref={emailRef}/>
                    <input type="password" placeholder="Password" ref={passwordRef}/>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        ref={confirmPasswordRef}
                    />
                    <textarea
                        className="signup__about"
                        placeholder="Describe yourself here..."
                        ref={aboutRef}
                    ></textarea>
                    <button className="signup__btn" onClick={signup}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;